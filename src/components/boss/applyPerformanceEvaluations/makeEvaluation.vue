<template>
    <div class="collapse">
        <a-row class="collapse-title">
            <a-col :span="12">
                Realizar auto-evaluación
            </a-col>
            <a-col :span="12" style="text-align: right;">
                <a>
                    <a-icon
                        class="dropdown-icon"
                        type="down"
                        @click="collapsed = !collapsed"
                        v-show="collapsed"
                    />
                </a>
                <a>
                    <a-icon
                        class="dropdown-icon"
                        type="up"
                        @click="collapsed = !collapsed"
                        v-show="!collapsed"
                    />
                </a>
            </a-col>
        </a-row>
        <div class="collapse-content" v-show="!collapsed">
            <a-row class="steps">
                <h1 class="breadcrumb-header">{{data.evaluationTitle}}</h1>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="6"
                    v-for="step in data.steps"
                    :key="step.number"
                >
                    <div class="step-form step-form-done"
                        v-show="data.lastStep >= step.number &&
                                step.number !== data.currentStep"
                        @click="data.currentStep = step.number"
                    >
                        <span>{{step.number}}. {{step.label}}</span>
                    </div>

                    <div class="step-form step-form-current"
                        v-show="data.currentStep === step.number"
                    >
                        <span>{{step.number}}. {{step.label}}</span>
                    </div>

                    <div class="step-form step-form-not-done"
                        v-show="data.lastStep < step.number"
                    >
                        <span>{{step.number}}. {{step.label}}</span>
                    </div>
                </a-col>
            </a-row>
            <a-row >
                <form-introduction v-show="data.currentStep == 1" />
                <form-objetives v-show="data.currentStep == 2" />
                <form-competences v-show="data.currentStep == 3" />
                <form-strengths v-show="data.currentStep == 4"/>
                <form-improvement-areas v-show="data.currentStep == 5" />
                <form-development-plan v-show="data.currentStep == 6" />
                <form-next-objetives v-show="data.currentStep == 7" />
            </a-row>
            <a-row style="margin-bottom: 20px;">
                <a-col :span="24" style="text-align: right;">
                    <a-button @click="previousStep" :disabled="data.currentStep === 1"
                        class="btn-green"
                        style="margin-right: 15px;"
                    >
                        Anterior
                    </a-button>
                    <a-button @click="nextStep"
                        class="btn-green"
                        v-show="data.currentStep < 7"
                    >
                        Siguiente
                    </a-button>
                    <a-button @click="nextStep"
                        class="btn-green"
                        v-show="data.currentStep === 7"
                    >
                        Finalizar
                    </a-button>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import formIntroduction from '@/components/collaborator/applyPerformanceEvaluations/formIntroduction.vue';
import formObjetives from '@/components/collaborator/applyPerformanceEvaluations/formObjetives.vue';
import formCompetences from '@/components/collaborator/applyPerformanceEvaluations/formCompetences.vue';
import formStrengths from '@/components/collaborator/applyPerformanceEvaluations/formStrengths.vue';
import formImprovementAreas from '@/components/collaborator/applyPerformanceEvaluations/formImprovementAreas.vue';
import formDevelopmentPlan from '@/components/collaborator/applyPerformanceEvaluations/formDevelopmentPlan.vue';
import formNextObjetives from '@/components/collaborator/applyPerformanceEvaluations/formNextObjetives.vue';

export default {
    components: {
        formIntroduction,
        formObjetives,
        formCompetences,
        formStrengths,
        formImprovementAreas,
        formDevelopmentPlan,
        formNextObjetives,
    },

    data() {
        return {
            collapsed: false,
            data: {
                currentStep: 1,
                lastStep: 1,
                evaluationTitle: 'Periodo 2018-2',
                steps: [
                    {
                        number: 1,
                        label: 'Intro',
                        name: 'intro',
                    },
                    {
                        number: 2,
                        label: 'Objectivos',
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
                        name: 'development plan',
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
        nextStep() {
            if (this.data.currentStep < 7) {
                this.data.currentStep += 1;
            }
            this.data.lastStep = Math.max(this.data.currentStep, this.data.lastStep);
        },
        previousStep() {
            if (this.data.currentStep > 1) {
                this.data.currentStep -= 1;
            }
            this.data.lastStep = Math.max(this.data.currentStep, this.data.lastStep);
        },
    },
};
</script>

<style scoped>

</style>
