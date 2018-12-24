<template>
    <a-col class="form-autoevaluation">
        <a-row class="form-tittle">
            <a-col :span="24">
                <h1>{{section.name}}</h1>
            </a-col>
            <a-col :span="24">
                <a-row
                    class="form-section"
                    v-for="subsection in section.childSections"
                    :key="subsection.id"
                >
                    <a-col :span="24" class="form-section-tittle" v-show="subsection.displayName">
                        <h2 style="margin-bottom:  0px;">{{subsection.name}}</h2>
                    </a-col>
                    <a-col :span="24">
                        <a-row
                            v-for="(question, index) in subsection.unmeasuredQuestions"
                            :key="question.id"
                            style="padding: 10px 16px;"
                        >
                            <questionOpenMultiple
                                v-if="question.questionType == 1"
                                :index="index + 1"
                                :questionText="question.text"
                                :questionId="question.id"
                                :answerId="getAnswerId(question.id)"
                                :answer="getAnswerValue(question.id, question.questionType)"
                            />
                        </a-row>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </a-col>
</template>

<script>
import questionOpenMultiple from '@/components/collaborator/applyPerformanceEvaluations/questionOpenMultiple.vue';

export default {
    props: {
        section: {
            type: Object,
            required: true,
        },
        answers: {
            type: Array,
            required: true,
        },
        onlyLecture: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        questionOpenMultiple,
    },
    methods: {
        getAnswerId(questionId) {
            const answer = this.answers.find(qst =>
                qst.evaluationQuestionId === questionId);
            return answer.id;
        },
        getAnswerValue(questionId, questionType) {
            const answer = this.answers.find(qst =>
                qst.evaluationQuestionId === questionId);
            if (questionType === 3) {
                return answer.measuredAnswer || {};
            }
            return answer.unmeasuredAnswer || {};
        },
    },
};

</script>

<style scoped>

</style>
