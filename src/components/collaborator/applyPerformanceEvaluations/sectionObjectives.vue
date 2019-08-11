<template>
    <a-col class="form-autoevaluation">
        <a-row class="form-tittle">
            <a-col :span="24" style="padding-bottom: 20px;" v-if="section.displayName">
                <h1>{{ capitalize(section.name) }}</h1>
            </a-col>
            <a-col :spab="24" v-for="childSection in section.childSections" :key="childSection.id">
                <a-row>
                    <a-col :span="24" style="padding-bottom: 20px;" v-if="childSection.displayName">
                        <h2>{{ capitalize(childSection.name) }}</h2>
                    </a-col>
                    <a-col :span="24">
                        <a-row :gutter="16" style="margin-bottom: 20px;">
                            <a-col :md="4" :lg="2">
                                <strong>Estatus</strong>
                            </a-col>
                            <a-col :md="6" :lg="8">
                                <strong>Objetivo</strong>
                            </a-col>
                            <a-col :md="6" :lg="8">
                                <strong>Entregable</strong>
                            </a-col>
                            <a-col :md="6" :lg="4">
                                <strong>Fecha Fin</strong>
                            </a-col>
                            <a-col :md="2" :lg="2">
                                <strong>Acciones</strong>
                            </a-col>
                        </a-row>
                        <div
                            v-for="(objective, index) in getObjectives(childSection.id)"
                            :key="index"
                        >
                            <question-goal
                                :index="index"
                                :objective="objective"
                                :onlyLecture="onlyLecture"
                            />
                        </div>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </a-col>
</template>

<script>
import questionGoal from "@/components/collaborator/applyPerformanceEvaluations/questionGoal.vue";

export default {
    props: {
        evaluationId: {
            type: Number,
            required: true,
        },
        onlyLecture: {
            type: Boolean,
            default: false,
        },
        section: {
            type: Object,
            required: true,
        },
        questions: {
            type: Array,
            required: true,
        },
    },
    components: {
        questionGoal,
    },
    data() {
        return {
            objectives: [],
        };
    },
    created() {},
    methods: {
        getObjectives(sectionid) {
            return this.questions.filter((answer) => answer.sectionId === sectionid);
        },
        capitalize(str) {
            return str.replace(/^\w/, (c) => c.toUpperCase());
        },
    },
};
</script>

<style src="@/assets/styles/evaluationForm.css" scoped></style>
