<template>
    <a-col class="form-autoevaluation">
        <a-row class="form-tittle">
            <a-col :span="24" style="padding-bottom: 20px;">
                <h1>{{capitalize(section.name)}}</h1>
            </a-col>
            <a-col :span="24">
                <div v-for="(objective, index) in objectives" :key="index">
                    <question-goal
                        :index="index"
                        :objective="objective"
                        :onlyLecture="onlyLecture"
                    />
                </div>
            </a-col>
        </a-row>
    </a-col>
</template>

<script>
import questionGoal from '@/components/collaborator/applyPerformanceEvaluations/questionGoal.vue';
import errorHandler from '@/views/errorHandler';
import client3B from '@/api/client3B';

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
    },
    components: {
        questionGoal,
    },
    data() {
        return {
            objectives: [],
        };
    },
    created() {
        this.init();
    },
    methods: {
        async init() {
            await this.fetchObjectives();
        },
        async fetchObjectives() {
            const response = await client3B.question.getObjetivesNotEvaluable(this.evaluationId)
                .catch(error => errorHandler(error));
            this.objectives = response.data.result;
        },
        capitalize(str) {
            return str.replace(/^\w/, c => c.toUpperCase());
        },
    },
};
</script>

<style src="@/assets/styles/evaluationForm.css" scoped></style>
