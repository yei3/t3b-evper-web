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
            <div class="collapse-content">
                <a-row class="steps">
                    <h1 class="breadcrumb-header">{{evaluation.name}}</h1>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="6"
                        v-for="step in view.steps"
                        :key="step.number"
                    >
                        <div class="step-form step-form-done"
                            v-show="lastStep >= step.number &&
                                    step.number !== currentStep"
                            @click="setStep(step.number)"
                        >
                            <span>{{step.number + 1}}. {{step.label}}</span>
                        </div>

                        <div class="step-form step-form-current"
                            v-show="currentStep === step.number"
                        >
                            <span>{{step.number + 1}}. {{step.label}}</span>
                        </div>

                        <div class="step-form step-form-not-done"
                            v-show="lastStep < step.number"
                        >
                            <span>{{step.number + 1}}. {{step.label}}</span>
                        </div>
                    </a-col>
                </a-row>
                <a-row >
                    <form-name v-show="currentStep == 0"/>
                    <form-introduction v-show="currentStep == 1"/>
                    <form-objectives v-show="currentStep == 2"/>
                    <form-competences v-show="currentStep == 3"/>
                </a-row>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import formName from '@/components/admin/createEvaluation/formName.vue';
import formIntroduction from '@/components/admin/createEvaluation/formIntroduction.vue';
import formObjectives from '@/components/admin/createEvaluation/formObjectives.vue';
import formCompetences from '@/components/admin/createEvaluation/formCompetences.vue';

export default {
    components: {
        formName,
        formIntroduction,
        formObjectives,
        formCompetences,
    },
    data() {
        return {
            view: {
                steps: [
                    {
                        number: 0,
                        label: 'Nombre de la evaluación',
                        name: 'name',
                    },
                    {
                        number: 1,
                        label: 'Intro',
                        name: 'intro',
                    },
                    {
                        number: 2,
                        label: 'Objetivos',
                        name: 'objectives',
                    },
                    {
                        number: 3,
                        label: 'Competencias',
                        name: 'competence',
                    },
                    {
                        number: 4,
                        label: 'Fortalezas',
                        name: 'strengths',
                    },
                    {
                        number: 5,
                        label: 'Áreas de mejora',
                        name: 'improvement-areas',
                    },
                    {
                        number: 6,
                        label: 'Plan Desarrollo',
                        name: 'development-plan',
                    },
                    {
                        number: 7,
                        label: 'Próx. Objectivos',
                        name: 'next-objectives',
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
        }),
    },
    computed: {
        ...mapGetters({
            currentStep: 'currentStep',
            lastStep: 'lastStep',
            evaluation: 'evaluation',
        }),
    },
};
</script>

<style scoped>

</style>
