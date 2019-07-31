<template>
    <div>
        <a-row :gutter="32" class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Evaluaciones de Desempeño</h1>
            </a-col>
            <a-col :span="24">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link class="breadcrumb-path" :to="{ name: 'collaborator-home' }">
                            Home
                        </router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <strong class="breadcrumb-path-active">
                            Realizar <span v-show="isAutoEvaluation">auto-</span>evaluación
                        </strong>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
        </a-row>
        <a-row class="main-content" style="margin-top: 30px;">
            <a-col :span="24" style="padding-bottom: 30px;">
                <div class="collapse" v-show="spin" style="text-align: center; padding: 50px;">
                    <a-spin tip="Cargando..." size="large" />
                </div>
                <div class="collapse" v-show="!spin">
                    <a-row class="collapse-title">
                        <a-col :sm="24" :md="12">
                            <h1>{{ evaluationName }}</h1>
                        </a-col>
                        <a-col :sm="12" :md="6" style="text-align: right;">
                            <h3 v-show="!isAutoEvaluation">{{ evaluatedName }}</h3>
                        </a-col>
                        <a-col :sm="12" :md="6" style="text-align: right; padding-right: 31px; padding-top: 5px;">
                            <a-button
                                class="btn-blue"
                                @click="finishEvaluation"
                                :loading="loading"
                                v-show="!onlyLecture"
                            >
                                <a-icon type="file-text" />
                                Finalizar Evaluación
                            </a-button>
                            <a-button class="btn-blue" @click="printEvaluation" :loading="loading" v-show="onlyLecture">
                                <a-icon type="printer" />
                                Imprimir Evaluación
                            </a-button>
                        </a-col>
                    </a-row>
                    <div class="collapse-content" v-show="!collapsed">
                        <a-row :gutter="16">
                            <a-col
                                :xxl="4"
                                :xl="6"
                                :lg="8"
                                :md="12"
                                :sm="24"
                                v-for="(step, index) in viewSteps"
                                :key="step.id"
                            >
                                <div
                                    class="step-form step-form-done"
                                    v-show="data.lastStep >= index && index !== data.currentStep"
                                    @click="data.currentStep = index"
                                >
                                    <span>{{ index + 1 }}. {{ capitalize(step.label) }}</span>
                                </div>

                                <div class="step-form step-form-current" v-show="data.currentStep === index">
                                    <span>{{ index + 1 }}. {{ capitalize(step.label) }}</span>
                                </div>

                                <div class="step-form step-form-not-done" v-show="data.lastStep < index">
                                    <span>{{ index + 1 }}. {{ capitalize(step.label) }}</span>
                                </div>
                            </a-col>
                        </a-row>
                        <a-row>
                            <form-introduction v-show="data.currentStep == 0" :instructions="evaluationInstructions" />
                            <div v-for="(section, index) in evaluationSections" :key="section.id">
                                <evaluation-section-objectives
                                    v-if="isSectionObjetives(section)"
                                    v-show="index + 1 == data.currentStep"
                                    :evaluationId="evaluation.id"
                                    :section="section"
                                    :questions="getQuestions()"
                                    :onlyLecture="onlyLecture"
                                />
                                <evaluation-section-next-objectives
                                    v-if="isSectionNextObjetives(section)"
                                    v-show="index + 1 == data.currentStep"
                                    :evaluationId="evaluation.id"
                                    :section="section"
                                    :questions="notEvaluableQuestions(section.childSections[0].id)"
                                    :onlyLecture="false"
                                />
                                <evaluation-section
                                    v-if="isGenericSection(section)"
                                    v-show="index + 1 == data.currentStep"
                                    :section="section"
                                    :questions="getQuestions()"
                                    :onlyLecture="onlyLecture"
                                />
                            </div>
                        </a-row>
                        <a-row style="margin-bottom: 20px;">
                            <a-col :span="24" style="text-align: right;">
                                <a-button
                                    @click="previousStep"
                                    :disabled="data.currentStep === 0"
                                    class="btn-green"
                                    style="margin-right: 15px;"
                                >
                                    Anterior
                                </a-button>
                                <a-button
                                    @click="nextStep"
                                    class="btn-green"
                                    v-show="data.currentStep !== viewSteps.length - 1"
                                >
                                    Siguiente
                                </a-button>
                            </a-col>
                        </a-row>
                    </div>
                    <div v-show="isClosed" style="margin-left: 30px;padding-bottom:30px;">
                        <h3>Comentario de cierre:</h3>
                        <strong>{{ closingComment }}</strong>
                    </div>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import client3B from "@/api/client3B";
import errorHandler from "@/views/errorHandler";
import formIntroduction from "@/components/collaborator/applyPerformanceEvaluations/formIntroduction.vue";
import evaluationSection from "@/components/collaborator/applyPerformanceEvaluations/section.vue";
import evaluationSectionNextObjectives from "@/components/collaborator/applyPerformanceEvaluations/sectionNextObjectives.vue";
import evaluationSectionObjectives from "@/components/collaborator/applyPerformanceEvaluations/sectionObjectives.vue";
import { mapActions, mapGetters } from "vuex";

const SECTION_PROX_OBJETIVES_NAME = "Próximos objetivos";
const SECTION_OBJETIVES_NAME = "Objetivos";

function normalizeStr(str) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase();
}

export default {
    props: {
        onlyLecture: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        formIntroduction,
        evaluationSection,
        evaluationSectionNextObjectives,
        evaluationSectionObjectives,
    },
    data() {
        return {
            spin: false,
            loading: false,
            collapsed: false,
            evaluation: null,
            isAutoEvaluation: true,
            isClosed: false,
            closingComment: "",
            evaluatedName: "",
            data: {
                currentStep: 0,
                lastStep: 0,
            },
        };
    },
    async created() {
        await this.fetchEvaluation();
        this.evaluationClearQuestions();
    },
    methods: {
        ...mapActions(["evaluationClearQuestions"]),
        async fetchEvaluation() {
            this.spin = true;
            const response = await client3B.evaluation.get(this.$route.params.id).catch((error) => {
                this.spin = false;
                errorHandler(this, error);
            });
            if (!response) return;
            this.spin = false;

            this.evaluation = response.data.result;
            if (this.evaluation == null) {
                this.isAutoEvaluation = false;
            } else {
                if (this.evaluation.status == 4) {
                    this.isClosed = true;
                    this.closingComment = this.evaluation.closingComment;
                }
                this.isAutoEvaluation = this.evaluation.template.isAutoEvaluation;
                this.evaluatedName = `${this.evaluation.user.name}  ${this.evaluation.user.surname}`;
            }

            // Sort sections
            const sectNextObj = this.evaluation.template.sections.find((sect) => this.isSectionNextObjetives(sect));
            this.evaluation.template.sections = this.evaluation.template.sections.filter(
                (sect) => !this.isSectionNextObjetives(sect),
            );

            const sectObj = this.evaluation.template.sections.find((sect) => this.isSectionObjetives(sect));
            this.evaluation.template.sections = this.evaluation.template.sections.filter(
                (sect) => !this.isSectionObjetives(sect),
            );

            if (sectObj) {
                this.evaluation.template.sections.splice(0, 0, sectObj);
            }
            if (sectNextObj) {
                this.evaluation.template.sections.splice(this.evaluation.template.sections.length, 0, sectNextObj);
            }

            this.data.lastStep = this.evaluationSections.length;
        },
        getQuestions() {
            if (!this.evaluation) return [];
            return this.evaluation.questions;
        },
        nextStep() {
            if (this.data.currentStep < this.viewSteps.length) {
                this.data.currentStep += 1;
            }
            this.data.lastStep = Math.max(this.data.currentStep, this.data.lastStep);
        },
        previousStep() {
            if (this.data.currentStep > 0) {
                this.data.currentStep -= 1;
            }
            this.data.lastStep = Math.max(this.data.currentStep, this.data.lastStep);
        },
        async finishEvaluation() {
            if (!this.evaluationIsComplete) {
                errorHandler(this, "Lo sentimos pero aún te quedan preguntas por responder");
                return;
            }
            this.loading = true;
            await client3B.evaluation.revision
                .finish(this.$route.params.id)
                .catch((error) => errorHandler(this, error));
            this.loading = false;
            this.$message.success("La evaluación ha sido finalizada correctamente");
            this.$router.push({ name: "home" });
        },
        printEvaluation() {
            const { id } = this.$route.params;
            this.$router.push({ name: "print-assessment", params: { id } });
        },
        isSectionNextObjetives(section) {
            if (!this.evaluation.template.includePastObjectives) return false;
            return normalizeStr(section.name) === normalizeStr(SECTION_PROX_OBJETIVES_NAME);
        },
        isSectionObjetives(section) {
            if (!this.evaluation.template.includePastObjectives) return false;
            return normalizeStr(section.name) === normalizeStr(SECTION_OBJETIVES_NAME);
        },
        isGenericSection(section) {
            return !this.isSectionNextObjetives(section) && !this.isSectionObjetives(section);
        },
        capitalize(str) {
            return str.replace(/^\w/, (c) => c.toUpperCase());
        },
        notEvaluableQuestions(subsectionId) {
            if (!this.evaluation) return [];
            return this.evaluation.questions.filter(
                (qst) => qst.notEvaluableAnswer !== null && qst.sectionId === subsectionId,
            );
        },
    },
    computed: {
        ...mapGetters({
            questionsStatuses: "questions",
            evaluationIsComplete: "evaluationIsComplete",
        }),
        viewSteps() {
            const steps = [
                {
                    id: null,
                    label: "Introducción",
                    name: "intro",
                },
            ];
            if (!this.evaluation) return "";

            this.evaluation.template.sections.forEach((section) => {
                if (section.parentId !== null) return;
                steps.push({
                    id: section.id,
                    label: section.name,
                    name: section.name,
                });
            });

            return steps;
        },
        evaluationSections() {
            if (!this.evaluation) return [];
            return this.evaluation.template.sections.filter((section) => section.parentId === null);
        },
        evaluationName() {
            if (!this.evaluation) return "";
            return this.evaluation.name;
        },
        evaluationInstructions() {
            if (!this.evaluation) return "";
            return this.evaluation.template.instructions;
        },
    },
};
</script>

<style scoped>
.dropdown-icon {
    color: #aaa;
}
</style>
