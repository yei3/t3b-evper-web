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
                        <strong class="breadcrumb-path-active">Crear Evaluación</strong>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
        </a-row>
        <transition name="fade">
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
                        >
                            <a-icon type='plus' /> Agregar Sección
                        </a-button>
                    </a-col>
                    <a-col :sm="24" :md="12"
                        style="padding-top: 10px; text-align: right;"
                    >
                        <a-button
                            style="color: #fb4646; width: 48%;"
                            @click="deleteSection(view.activeSection)"
                            v-show="view.activeSection != 0 && view.activeSection != 1"
                        >
                            <a-icon type="delete" /> Borrar Sección
                        </a-button>
                    </a-col>
                </a-row>
                <a-row >
                    <form-name v-show="currentStep === 0"/>
                    <form-introduction v-show="currentStep === 1"/>
                    <form-generic v-for="(step, index) in dinamicSteps" :key="step.id"
                        :sectionTitle="step.label"
                        v-show="(index + 2) == currentStep"
                    />
                </a-row>
                <a-row>
                    <a-col :span="24">

                    </a-col>
                </a-row>
            </div>
        </transition>
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
import formIntroduction from '@/components/admin/createEvaluation/formIntroduction.vue';
import formGeneric from '@/components/admin/createEvaluation/formGeneric.vue';

export default {
    components: {
        formName,
        formIntroduction,
        formGeneric,
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
                    {
                        id: 1,
                        label: 'Intro',
                        name: 'intro',
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
        },
        cancelAddSection() {
            this.view.sectionModal.show = false;
            this.view.sectionModal.value = '';
        },
        deleteSection(sectionId) {
            this.view.steps = this.view.steps.filter(section => section.id !== sectionId);
        },
    },
    computed: {
        ...mapGetters({
            currentStep: 'currentStep',
            lastStep: 'lastStep',
            evaluation: 'evaluation',
        }),
        dinamicSteps() {
            return this.view.steps.slice(2);
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
