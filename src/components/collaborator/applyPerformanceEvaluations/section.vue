<template>
    <a-col class="form-autoevaluation">
        <a-row class="form-tittle">
            <a-col :span="24">
                <h1>{{ section.name }}</h1>
            </a-col>
            <a-col :span="24">
                <a-row
                    class="form-section"
                    v-for="subsection in section.childSections"
                    :key="subsection.id"
                >
                    <a-col :span="24" class="form-section-tittle" v-show="subsection.displayName">
                        <h2 style="margin: 20px 0px 0px 0px; font-size: 20px;">
                            {{ subsection.name }}
                        </h2>
                    </a-col>
                    <a-col :span="24">
                        <a-row
                            v-for="(qstTemplate, index) in getSubsectionQuestions(subsection)"
                            :key="qstTemplate.id"
                            style="padding: 10px 16px;"
                        >
                            <question-open
                                v-if="qstTemplate.questionType == 0"
                                :index="index + 1"
                                :onlyLecture="onlyLecture"
                                :questionText="qstTemplate.text"
                                :questionId="getQuestionId(qstTemplate.id)"
                                :questionStatus="getQuestionStatus(qstTemplate.id)"
                                :answer="getAnswer(qstTemplate.id, qstTemplate.questionType)"
                            />
                            <question-open-multiple
                                v-if="qstTemplate.questionType == 1"
                                :index="index + 1"
                                :onlyLecture="onlyLecture"
                                :questionText="qstTemplate.text"
                                :questionId="getQuestionId(qstTemplate.id)"
                                :questionStatus="getQuestionStatus(qstTemplate.id)"
                                :answer="getAnswer(qstTemplate.id, qstTemplate.questionType)"
                            />
                            <question-one-select
                                v-if="qstTemplate.questionType == 2"
                                :index="index + 1"
                                :onlyLecture="onlyLecture"
                                :questionText="qstTemplate.text"
                                :questionId="getQuestionId(qstTemplate.id)"
                                :questionStatus="getQuestionStatus(qstTemplate.id)"
                                :answer="getAnswer(qstTemplate.id, qstTemplate.questionType)"
                            />
                            <question-objective
                                v-if="qstTemplate.questionType == 3"
                                :index="index + 1"
                                :onlyLecture="onlyLecture"
                                :questionText="qstTemplate.text"
                                :questionId="getQuestionId(qstTemplate.id)"
                                :questionStatus="getQuestionStatus(qstTemplate.id)"
                                :expected="qstTemplate.expectedText || qstTemplate.expected"
                                :answer="getAnswer(qstTemplate.id, qstTemplate.questionType)"
                                :templateQuestion="qstTemplate"
                            />
                            <question-boolean
                                v-if="qstTemplate.questionType == 4"
                                :index="index + 1"
                                :onlyLecture="onlyLecture"
                                :questionText="qstTemplate.text"
                                :questionId="getQuestionId(qstTemplate.id)"
                                :questionStatus="getQuestionStatus(qstTemplate.id)"
                                :answer="getAnswer(qstTemplate.id, qstTemplate.questionType)"
                            />
                            <question-action
                                v-if="qstTemplate.questionType == 5"
                                :index="index + 1"
                                :onlyLecture="onlyLecture"
                                :questionText="qstTemplate.text"
                                :questionId="getQuestionId(qstTemplate.id)"
                                :questionStatus="getQuestionStatus(qstTemplate.id)"
                                :answer="getAnswer(qstTemplate.id, qstTemplate.questionType)"
                            />
                            <question-remark
                                v-if="qstTemplate.questionType == 6"
                                :index="index + 1"
                                :onlyLecture="onlyLecture"
                                :questionText="qstTemplate.text"
                                :questionId="getQuestionId(qstTemplate.id)"
                                :questionStatus="getQuestionStatus(qstTemplate.id)"
                                :answer="getAnswer(qstTemplate.id, qstTemplate.questionType)"
                            />
                        </a-row>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </a-col>
</template>

<script>
import questionOpen from "@/components/collaborator/applyPerformanceEvaluations/questionOpen.vue";
import questionAction from "@/components/collaborator/applyPerformanceEvaluations/questionAction.vue"; // eslint-disable-line
import questionRemark from "@/components/collaborator/applyPerformanceEvaluations/questionRemark.vue"; // eslint-disable-line
import questionBoolean from "@/components/collaborator/applyPerformanceEvaluations/questionBoolean.vue"; // eslint-disable-line
import questionOneSelect from "@/components/collaborator/applyPerformanceEvaluations/questionOneSelect.vue"; // eslint-disable-line
import questionObjective from "@/components/collaborator/applyPerformanceEvaluations/questionObjective.vue"; // eslint-disable-line
import questionOpenMultiple from "@/components/collaborator/applyPerformanceEvaluations/questionOpenMultiple.vue"; // eslint-disable-line

export default {
    props: {
        section: {
            type: Object,
            required: true,
        },
        questions: {
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
        questionAction,
        questionRemark,
        questionBoolean,
        questionOneSelect,
        questionObjective,
        questionOpenMultiple,
    },
    methods: {
        getQuestionStatus(questionId) {
            const answer = this.questions.find((qst) => qst.evaluationQuestionId === questionId);
            return answer.status;
        },
        getQuestionId(questionId) {
            const answer = this.questions.find((qst) => qst.evaluationQuestionId === questionId);
            return answer.id;
        },
        getAnswer(questionId, questionType) {
            const answer = this.questions.find((qst) => qst.evaluationQuestionId === questionId);
            if (questionType === 3) {
                return answer.measuredAnswer;
            }
            return answer.unmeasuredAnswer;
        },
        getSubsectionQuestions(subsection) {
            return [...subsection.unmeasuredQuestions, ...subsection.measuredQuestions];
        },
    },
};
</script>

<style scoped></style>
