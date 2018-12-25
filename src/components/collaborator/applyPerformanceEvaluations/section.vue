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
                            v-for="(question, index) in getSubsectionQuestions(subsection)"
                            :key="question.id"
                            style="padding: 10px 16px;"
                        >
                            <question-open
                                v-if="question.questionType == 0"
                                :index="index + 1"
                                :questionText="question.text"
                                :questionId="getQuestionId(question.id)"
                                :answer="getAnswerValue(question.id, question.questionType)"
                            />
                            <question-open-multiple
                                v-if="question.questionType == 1"
                                :index="index + 1"
                                :questionText="question.text"
                                :questionId="getQuestionId(question.id)"
                                :answer="getAnswerValue(question.id, question.questionType)"
                            />
                            <question-one-select
                                v-if="question.questionType == 2"
                                :index="index + 1"
                                :questionText="question.text"
                                :questionId="getQuestionId(question.id)"
                                :answer="getAnswerValue(question.id, question.questionType)"
                            />
                            <question-objective
                                v-if="question.questionType == 3"
                                :index="index + 1"
                                :questionText="question.text"
                                :questionId="getQuestionId(question.id)"
                                :expected="question.expected"
                                :answer="getAnswerValue(question.id, question.questionType)"
                            />
                            <question-boolean
                                v-if="question.questionType == 4"
                                :index="index + 1"
                                :questionText="question.text"
                                :questionId="getQuestionId(question.id)"
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
import questionOpen from '@/components/collaborator/applyPerformanceEvaluations/questionOpen.vue';
import questionOpenMultiple from '@/components/collaborator/applyPerformanceEvaluations/questionOpenMultiple.vue';
import questionOneSelect from '@/components/collaborator/applyPerformanceEvaluations/questionOneSelect.vue';
import questionBoolean from '@/components/collaborator/applyPerformanceEvaluations/questionBoolean.vue';
import questionObjective from '@/components/collaborator/applyPerformanceEvaluations/questionObjective.vue';

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
        questionOpen,
        questionOpenMultiple,
        questionOneSelect,
        questionBoolean,
        questionObjective,
    },
    methods: {
        getQuestionId(questionId) {
            console.log(questionId);
            const answer = this.answers.find(qst =>
                qst.evaluationQuestionId === questionId);
            console.log('answer', JSON.parse(JSON.stringify(answer)));
            return answer.id;
        },
        getAnswerValue(questionId, questionType) {
            console.log(questionId, questionType);
            const answer = this.answers.find(qst =>
                qst.evaluationQuestionId === questionId);
            console.log('answer', JSON.parse(JSON.stringify(answer)));
            if (questionType === 3) {
                return answer.measuredAnswer;
            }
            return answer.unmeasuredAnswer;
        },
        getSubsectionQuestions(subsection) {
            return [...subsection.unmeasuredQuestions, ...subsection.measuredQuestions];
        }
    },
};

</script>

<style scoped>

</style>
