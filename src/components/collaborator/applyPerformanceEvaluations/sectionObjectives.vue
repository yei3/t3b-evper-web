<template>
    <a-col class="form-autoevaluation">
        <a-row class="form-tittle">
            <a-col :span="24">
                <h1>{{section.name}}</h1>
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
import moment from 'moment';
import questionGoal from '@/components/collaborator/applyPerformanceEvaluations/questionGoal.vue';
import errorHandler from '@/views/errorHandler';
import client3B from '@/api/client3B';

let questionUUID = 0;

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
        }
    },
};
</script>

<style src="@/assets/styles/evaluationForm.css" scoped></style>
