<template>
    <div>
        <a-row :gutter="32"  class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Crear Evaluación</h1>
            </a-col>
            <a-col :span="24">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-home' }"
                            class="breadcrumb-path"
                        >
                            Home Administrador
                        </router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <strong class="breadcrumb-path">Evaluaciones</strong>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <strong class="breadcrumb-path-active"
                            v-if="!$route.params.id"
                        >
                            Crear Evaluación
                        </strong>
                        <strong class="breadcrumb-path-active" v-else>
                            Actualizar Evaluación
                        </strong>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
        </a-row>
        <div class="collapse-content"
            style="background-color: white;
            margin: 30px 30px;"
        >
            <a-row class="steps">
                <span class="breadcrumb-header" style="font-weight: 400;">
                    {{evaluation.name}}
                </span>
                <span style="font-size: 16px;">{{evaluation.description}}</span>
            </a-row>
            <a-divider />
            <a-row :gutter="16">
                <a-col :span="6"
                    v-for="(step, index) in view.steps"
                    :key="index"
                >
                    <div class="step-form step-form-done"
                        v-show="lastStep >= index &&
                                index !== currentStep"
                        @click="view.activeSection = step.id; setStep(index);"
                    >
                        <span>{{index + 1}}. {{step.label}}</span>
                    </div>

                    <div class="step-form step-form-current"
                        v-show="currentStep === index"
                    >
                        <span>{{index + 1}}. {{step.label}}</span>
                    </div>

                    <div class="step-form step-form-not-done"
                        v-show="lastStep < index"
                    >
                        <span>{{index + 1}}. {{step.label}}</span>
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col :sm="24" :md="12"
                    style="padding-top: 10px;"
                >
                    <a-button
                        type='dashed'
                        class="add-button"
                        style="width: 48%;"
                        @click="view.sectionModal.show=true"
                        v-show="currentStep !== 0 || evaluation.id"
                    >
                        <a-icon type='plus' /> Agregar Sección
                    </a-button>
                </a-col>
                <a-col :sm="24" :md="12"
                    style="padding-top: 10px; text-align: right;"
                >
                    <a-button
                        style="color: #fb4646; width: 48%;"
                        @click="deleteSection(currentStep)"
                        v-show="currentStep !== 0"
                    >
                        <a-icon type="delete" /> Borrar Sección
                    </a-button>
                </a-col>
            </a-row>
            <a-row >
                <form-name
                    v-show="currentStep === 0"
                    :showContinueButton="dinamicSteps.length !== 0"
                />
                <form-generic v-for="(step, index) in dinamicSteps" :key="step.id"
                    v-model="step.label"
                    :showFinishButton="index === (dinamicSteps.length - 1)"
                    v-show="(index + 1) == currentStep"
                />
            </a-row>
        </div>
        <a-modal
            title="Agregar Nueva Sección"
            v-model="view.sectionModal.show"
        >
            <a-input
                v-model="view.sectionModal.value"
                @keyup.enter.native="addSection"
            />
            <template slot="footer">
                <a-button key="back" @click="cancelAddSection">Cancelar</a-button>
                <a-button key="submit" class="btn-green" @click="addSection">
                    Agregar
                </a-button>
            </template>
        </a-modal>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import formName from '@/components/admin/createEvaluation/formName.vue';
import formGeneric from '@/components/admin/createEvaluation/formGeneric.vue';
import client3B from '@/api/client3B';
import errorHandler from '@/views/errorHandler';
import { error } from 'util';

export default {
    components: {
        formName,
        formGeneric,
    },
    created() {
        this.fetchData();
    },
    watch: {
        $route: 'fetchData',
    },
    data() {
        return {
            view: {
                activeSection: 0,
                sectionModal: {
                    show: false,
                    error: null,
                    value: '',
                },
                stepsUUID: 2,
                steps: [
                    {
                        id: 0,
                        label: 'Nombre de la evaluación',
                        name: 'name',
                    },
                ],
            },
        };
    },
    methods: {
        ...mapActions({
            nextStep: 'nextStep',
            previousStep: 'previousStep',
            setStep: 'setStep',
            setLastStep: 'setLastStep',
        }),
        addSection() {
            const step = {
                id: this.view.stepsUUID,
                label: this.view.sectionModal.value,
                name: this.view.sectionModal.value.replace(/ /g, ''),
            };
            this.view.steps.push(step);
            this.view.stepsUUID += 1;
            this.cancelAddSection();
            this.setStep(this.view.steps.length - 1);
            this.setLastStep(this.view.steps.length - 1);
        },
        cancelAddSection() {
            this.view.sectionModal.show = false;
            this.view.sectionModal.value = '';
        },
        deleteSection(sectionStep) {
            let step = -1;
            this.view.steps = this.view.steps.filter(() => {
                step += 1;
                return sectionStep !== step;
            });
            this.setStep(this.view.steps.length - 1);
            this.view.activeSection = this.view.steps[this.view.steps.length - 1].id;
        },
        async fetchData() {
            if (!this.$route.params.id) return;
            const response = await client3B.evaluation.get(this.$route.params.id)
                .catch(error => errorHandler(error));
            if (!response) return;

            const evaluaction = response.data.result;
            this.evaluationId = evaluaction.id;
            console.log(evaluaction);
            evaluaction.sections.forEach((section) => {
                this.view.steps.push({
                    id: this.view.stepsUUID,
                    label: section.name,
                    name: section.name,
                });
                this.view.stepsUUID += 1;
            });

            this.setLastStep(this.view.steps.length - 1);
        },
    },
    computed: {
        ...mapGetters({
            currentStep: 'currentStep',
            lastStep: 'lastStep',
            evaluation: 'evaluation',
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
  transition: all .3s;
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
