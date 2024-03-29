<template>
    <div>
        <a-row :gutter="32" class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Crear Formato</h1>
            </a-col>
            <a-col :span="24">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-home' }" class="breadcrumb-path">
                            Formatos
                        </router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <strong class="breadcrumb-path-active" v-if="!$route.params.id">
                            Crear Formato
                        </strong>
                        <strong class="breadcrumb-path-active" v-else>
                            Actualizar Formato
                        </strong>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
        </a-row>
        <div
            class="collapse-content"
            style="background-color: white;
            margin: 30px 30px;"
        >
            <a-row v-show="spin">
                <div style="text-align: center; margin-top: 20px;">
                    <a-spin tip="Cargando..." size="large" />
                </div>
            </a-row>
            <a-row class="steps" v-show="!spin">
                <span class="breadcrumb-header" style="font-weight: 400;">
                    {{ format.name }}
                </span>
                <span style="font-size: 16px;">{{ format.description }}</span>
            </a-row>
            <a-divider />
            <a-row :gutter="16" v-show="!spin">
                <a-col
                    :xxl="4"
                    :xl="6"
                    :lg="8"
                    :md="12"
                    :sm="24"
                    v-for="(step, index) in view.steps"
                    :key="index"
                >
                    <div
                        class="step-form step-form-done"
                        v-show="lastStep >= index && index !== currentStep"
                        @click="
                            view.activeSection = step.id;
                            setStep(index);
                        "
                    >
                        <span>{{ index + 1 }}. {{ step.label }}</span>
                    </div>

                    <div class="step-form step-form-current" v-show="currentStep === index">
                        <span>{{ index + 1 }}. {{ step.label }}</span>
                    </div>

                    <div class="step-form step-form-not-done" v-show="lastStep < index">
                        <span>{{ index + 1 }}. {{ step.label }}</span>
                    </div>
                </a-col>
            </a-row>
            <a-row v-show="!spin">
                <a-col :sm="24" :md="12" style="padding-top: 10px;">
                    <a-button
                        type="dashed"
                        class="add-button"
                        style="width: 48%; min-width: 200px;"
                        @click="
                            resetModalValues();
                            view.sectionModal.show = true;
                        "
                        v-show="lastStep !== 0 || format.id"
                    >
                        <a-icon type="plus" /> Agregar Sección
                    </a-button>
                </a-col>
                <a-col :sm="24" :md="12" style="padding-top: 10px; text-align: right;">
                    <a-popconfirm
                        title="Está seguro de eliminar la sección?"
                        @confirm="deleteSection(currentStep)"
                        okText="SI"
                        cancelText="No"
                    >
                        <a-button
                            style="color: #fb4646; width: 48%; min-width: 200px;"
                            v-show="currentStep !== 0"
                        >
                            <a-icon :type="view.loadingDelete ? 'loading' : 'delete'" /> Eliminar
                            Sección
                        </a-button>
                    </a-popconfirm>
                </a-col>
            </a-row>
            <a-row v-show="!spin">
                <form-name
                    v-for="(_, index) in view.formNames"
                    :key="index"
                    v-show="currentStep === 0"
                    :showContinueButton="dinamicSteps.length !== 0"
                    :formatfetched="formatfetched"
                />
                <form-generic
                    v-for="(step, index) in dinamicSteps"
                    :key="step.id"
                    v-model="step.label"
                    :sectionPercent="step.percent"
                    :sectionId="step.id"
                    :subsectionsFetched="step.section.childSections"
                    :showFinishButton="index === dinamicSteps.length - 1"
                    v-show="index + 1 == currentStep"
                />
            </a-row>
        </div>
        <a-modal title="Agregar Nueva Sección" v-model="view.sectionModal.show">
            <a-input
                v-model="view.sectionModal.value"
                placeholder="Nombre de la sección"
                addonBefore="Nombre"
                @keyup.enter.native="addSection"
            />
            <a-input
                v-model="view.sectionModal.percent"
                type="number"
                style="margin-top: 20px;"
                addonBefore="Porcentaje"
                addonAfter="%"
                placeholder="0 a 100"
                min="1"
                max="100"
                @keyup.enter.native="addSection"
            />
            <template slot="footer">
                <a-row>
                    <a-col :span="12" style="text-align: left;">
                        <a-button key="back" @click="resetModalValues">
                            Cancelar
                        </a-button>
                    </a-col>
                    <a-col :span="12" style="text-align: right;">
                        <a-button
                            key="submit"
                            class="btn-green"
                            @click="addSection"
                            :loading="view.sectionModal.loading"
                        >
                            Agregar
                        </a-button>
                    </a-col>
                </a-row>
            </template>
        </a-modal>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import formName from "@/components/admin/formats/formName.vue";
import formGeneric from "@/components/admin/formats/formGeneric.vue";
import client3B from "@/api/client3B";
import errorHandler from "@/views/errorHandler";

export default {
    components: {
        formName,
        formGeneric,
    },
    created() {
        this.fetchData();
    },
    watch: {
        $route: "fetchData",
    },
    data() {
        return {
            spin: false,
            formatfetched: {},
            view: {
                formNames: [],
                loadingDelete: false,
                activeSection: 0,
                sectionModal: {
                    show: false,
                    error: null,
                    value: "",
                    percent: 0,
                    loading: false,
                },
                stepsUUID: 2,
                steps: [
                    {
                        id: 0,
                        label: "Nombre del Formato",
                        name: "name",
                    },
                ],
            },
        };
    },
    methods: {
        ...mapActions({
            nextStep: "nextStep",
            previousStep: "previousStep",
            setStep: "setStep",
            setLastStep: "setLastStep",
            updateFormatForm: "updateFormatForm",
        }),
        async addSection() {
            this.view.sectionModal.loading = true;
            const response = await client3B.section
                .create({
                    name: this.view.sectionModal.value,
                    evaluationTemplateId: this.format.id,
                    displayName: true,
                    value: this.view.sectionModal.percent,
                })
                .catch((error) => errorHandler(this, error));
            if (!response) {
                this.view.sectionModal.loading = false;
                return;
            }

            const section = response.data.result;
            const step = {
                id: section.id,
                label: this.view.sectionModal.value,
                name: this.view.sectionModal.value.replace(/ /g, ""),
                percent: Number(this.view.sectionModal.percent),
                section: { childSections: [] },
            };
            this.view.steps.push(step);
            this.view.stepsUUID += 1;
            this.resetModalValues();
            this.setLastStep(this.view.steps.length - 1);
            this.view.sectionModal.loading = false;
            this.$message.success("Evaluación guardada correctamente");
        },
        resetModalValues() {
            this.view.sectionModal.show = false;
            this.view.sectionModal.value = "";
            this.view.sectionModal.percent = 0;
        },
        async deleteSection(sectionStep) {
            this.view.loadingDelete = true;
            let section = null;
            let step = -1;
            const leftSteps = this.view.steps.filter((sect) => {
                step += 1;
                if (sectionStep === step) {
                    section = sect;
                }
                return sectionStep !== step;
            });
            const response = await client3B.section
                .delete({
                    id: section.id,
                })
                .catch((error) => errorHandler(this, error));
            if (!response) {
                this.view.loadingDelete = false;
                return;
            }
            this.view.steps = leftSteps;
            this.setStep(this.view.steps.length - 1);
            this.view.activeSection = this.view.steps[this.view.steps.length - 1].id;
            this.view.loadingDelete = false;
            this.$message.success("Evaluación guardada correctamente");
        },
        async fetchData() {
            this.spin = true;
            if (!this.$route.params.id) {
                this.view.formNames.push(1);
                this.spin = false;
                return;
            }
            const response = await client3B.format
                .get(this.$route.params.id)
                .catch((error) => errorHandler(this, error));
            if (!response) {
                this.spin = false;
                return;
            }

            const format = response.data.result;
            this.formatfetched = format;
            this.formatId = format.id;
            this.updateFormatForm({
                id: format.id,
                name: format.name,
                description: format.description,
                instructions: format.instructions,
            });
            format.sections.forEach((section) => {
                this.view.steps.push({
                    id: section.id,
                    label: section.name,
                    name: section.name,
                    percent: section.value,
                    section,
                });
                this.view.stepsUUID += 1;
            });
            this.view.formNames.push(1);
            this.setLastStep(this.view.steps.length - 1);
            this.spin = false;
        },
    },
    computed: {
        ...mapGetters({
            currentStep: "currentStep",
            lastStep: "lastStep",
            format: "format",
        }),
        dinamicSteps() {
            return this.view.steps.slice(1);
        },
    },
};
</script>

<style scoped>
.dynamic-delete-button {
    cursor: pointer;
    position: relative;
    top: 4px;
    font-size: 24px;
    color: #999;
    transition: all 0.3s;
}
.dynamic-delete-button:hover {
    color: #777;
}
.add-button {
    width: 90%;
}
.add-button:hover {
    border-style: dashed;
}
</style>
