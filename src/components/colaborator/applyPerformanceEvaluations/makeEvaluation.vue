<template>
    <div class="collapse">
        <a-row class="collapse-title">
            <a-col :span="12">
                Realizar auto-evaluación
            </a-col>
            <a-col :span="12" style="text-align: right;">
                <a>
                    <a-icon type="down" @click="collapsed = !collapsed" v-show="!collapsed"/>
                </a>
                <a>
                    <a-icon type="up" @click="collapsed = !collapsed" v-show="collapsed"/>
                </a>
            </a-col>
        </a-row>
        <transition name="fade">
            <div class="collapse-content" v-show="!collapsed">
                <a-row class="steps">
                    <h1>{{data.evaluationTitle}}</h1>
                </a-row>
                <a-row>
                    <a-col :span="6"
                        class="step"
                        v-for="step in data.steps"
                        :key="step.number"
                    >
                        <span>
                            {{step.number}}. {{step.label}}
                        </span>
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
                <a-row>
                    <a-col :span="24" style="text-align: right;">
                        <a-button @click="previousStep">
                            Anterior
                        </a-button>
                        <a-button type="primary" @click="nextStep">
                            Siguiente
                        </a-button>
                    </a-col>
                </a-row>
            </div>
        </transition>
    </div>
</template>

<script>
import formIntroduction from '@/components/colaborator/applyPerformanceEvaluations/formIntroduction.vue';
import formObjetives from '@/components/colaborator/applyPerformanceEvaluations/formObjetives.vue';
import formCompetences from '@/components/colaborator/applyPerformanceEvaluations/formCompetences.vue';
import formStrengths from '@/components/colaborator/applyPerformanceEvaluations/formStrengths.vue';
import formImprovementAreas from '@/components/colaborator/applyPerformanceEvaluations/formImprovementAreas.vue';
import formDevelopmentPlan from '@/components/colaborator/applyPerformanceEvaluations/formDevelopmentPlan.vue';
import formNextObjetives from '@/components/colaborator/applyPerformanceEvaluations/formNextObjetives.vue';

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
        },
        previousStep() {
            if (this.data.currentStep > 1) {
                this.data.currentStep -= 1;
            }
        },
    },
};
</script>

<style scoped>

</style>
