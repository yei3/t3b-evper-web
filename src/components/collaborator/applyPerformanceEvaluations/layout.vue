<template>
    <div>
        <a-row :gutter="32" class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Evaluaciones de Desempeño</h1>
            </a-col>
            <a-col :span="24">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link
                            class="breadcrumb-path"
                            :to="{ name: 'collaborator-home' }"
                        >
                            Home Colaborador
                        </router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <strong class="breadcrumb-path-active">Realizar auto-evaluación</strong>
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
                        <a-col :span="12">
                            <h1>{{evaluationName}}</h1>
                        </a-col>
                    </a-row>
                    <div class="collapse-content" v-show="!collapsed">
                        <a-row :gutter="16">
                            <a-col :xxl="4" :xl="6" :lg="8" :md="12" :sm="24"
                                v-for="(step, index) in viewSteps"
                                :key="step.id"
                            >
                                <div class="step-form step-form-done"
                                    v-show="data.lastStep >= index &&
                                            index !== data.currentStep"
                                    @click="data.currentStep = index"
                                >
                                    <span>{{index + 1}}. {{step.label}}</span>
                                </div>

                                <div class="step-form step-form-current"
                                    v-show="data.currentStep === index"
                                >
                                    <span>{{index + 1}}. {{step.label}}</span>
                                </div>

                                <div class="step-form step-form-not-done"
                                    v-show="data.lastStep < index"
                                >
                                    <span>{{index + 1}}. {{step.label}}</span>
                                </div>
                            </a-col>
                        </a-row>
                        <a-row >
                            <form-introduction
                                v-show="data.currentStep == 0"
                                :instructions="evaluationInstructions"
                            />
                            <evaluation-section
                                v-for="(section, index) in evaluationSections"
                                :key="section.id"
                                :section="section"
                                :questions="getQuestions()"
                                v-show="(index + 1) == data.currentStep"
                            />
                        </a-row>
                        <a-row style="margin-bottom: 20px;">
                            <a-col :span="24" style="text-align: right;">
                                <a-button @click="previousStep" :disabled="data.currentStep === 0"
                                    class="btn-green"
                                    style="margin-right: 15px;"
                                >
                                    Anterior
                                </a-button>
                                <a-button @click="nextStep"
                                    class="btn-green"
                                    v-show="data.currentStep !== viewSteps.length - 1"
                                >
                                    Siguiente
                                </a-button>
                                <a-button @click="nextStep"
                                    class="btn-green"
                                    v-show="data.currentStep === viewSteps.length - 1"
                                >
                                    Finalizar
                                </a-button>
                            </a-col>
                        </a-row>
                    </div>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import client3B from '@/api/client3B';
import errorHandler from '@/views/errorHandler';
import formIntroduction from '@/components/collaborator/applyPerformanceEvaluations/formIntroduction.vue';
import evaluationSection from '@/components/collaborator/applyPerformanceEvaluations/section.vue';


export default {
    components: {
        formIntroduction,
        evaluationSection,
    },
    data() {
        return {
            spin: false,
            collapsed: false,
            evaluation: null,
            data: {
                currentStep: 0,
                lastStep: 0,
            },
        };
    },
    created() {
        this.fetchEvaluation();
    },
    methods: {
        async fetchEvaluation() {
            this.spin = true;
            const response = await client3B.evaluation.get(this.$route.params.id)
                .catch((error) => {
                    this.spin = false;
                    errorHandler(this, error)
                });
            if (!response) return;
            this.spin = false;
            this.evaluation = response.data.result;
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
    },
    computed: {
        viewSteps() {
            const steps = [
                {
                    id: null,
                    label: 'Introducción',
                    name: 'intro',
                },
            ];
            if (!this.evaluation) return '';

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
            return this.evaluation.template.sections.filter(section => section.parentId === null);
        },
        evaluationName() {
            if (!this.evaluation) return '';
            return this.evaluation.name;
        },
        evaluationInstructions() {
            if (!this.evaluation) return '';
            return this.evaluation.template.instructions;
        },
    },
};
</script>

<style>
.dropdown-icon {
    color: #aaa;
}
</style>
