<template>
    <a-col :span="24" style="padding: 5px 15px 5px 15px; margin-bottom: 0px;" :class="answerStatus">
        <a-row>
            <a-col :xxl="9" :xl="9" :lg="7" :md="24" :sm="24">
                <span class="question-label">{{ index }}. {{ questionText }}:</span>
            </a-col>
            <a-col :xxl="15" :xl="15" :lg="17" :md="24" :sm="24">
                <span style="font-size: 14px; font-weight: 600" v-show="value">
                    SI
                </span>
                <span style="font-size: 14px; font-weight: 600" v-show="!value">
                    NO
                </span>
                <a-switch v-model="value" :disabled="loading || onlyLecture" @change="save" />
            </a-col>
            <a-col :sm="24" :md="24" style="text-align: center; margin-top: 5px;">
                <a-icon
                    v-show="loading"
                    class="dynamic-delete-button form-icon"
                    type="loading"
                    style="padding-left: 30px;"
                />
                <span v-show="loading"> Guardardando Respuesta </span>
            </a-col>
        </a-row>
    </a-col>
</template>

<script>
import errorHandler from "@/views/errorHandler";
import client3B from "@/api/client3B";
import { mapMutations } from "vuex";

export default {
    props: {
        onlyLecture: {
            type: Boolean,
            default: false,
        },
        index: {
            type: Number,
            required: true,
        },
        questionId: {
            type: Number,
            required: true,
        },
        questionText: {
            type: String,
            required: true,
        },
        questionStatus: {
            type: Number,
            required: true,
        },
        answer: {
            type: Object,
            required: true,
        },
    },
    mounted() {
        this.parseAnswer();
        this.setStatus();
    },
    data() {
        return {
            edited: false,
            loading: false,
            value: false,
            configurable: true,
        };
    },
    methods: {
        ...mapMutations(["evaluationSetQuestionsAsAnswered", "evaluationAddQuestionStatus"]),
        handleForm(e) {
            e.prevent();
        },
        parseAnswer() {
            if (this.answer.text) {
                this.value = this.answer.text === "true";
            }
            if (this.questionStatus === 1) {
                this.edited = true;
            }
        },
        setStatus() {
            this.evaluationAddQuestionStatus({
                id: this.questionId,
                answered: this.questionStatus !== 1,
            });
        },
        save() {
            this.edited = true;
            this.loading = true;
            if (this.onlyLecture) return;
            this.update();
        },
        async update() {
            const response = await client3B.evaluation.answer
                .update({
                    id: this.answer.id,
                    evaluationQuestionId: this.questionId,
                    text: String(this.value),
                    evaluationUnmeasuredQuestion: {
                        status: 2,
                    },
                })
                .catch((error) => errorHandler(this, error));
            this.loading = false;
            if (!response) return;
            this.edited = false;
            this.evaluationSetQuestionsAsAnswered(this.questionId);
            this.$message.success("Evaluación guardada correctamente");
        },
    },
    computed: {
        answerStatus() {
            if (this.edited) {
                return "question-row orange-bar";
            }
            return "question-row green-bar";
        },
    },
};
</script>

<style src="@/assets/styles/evaluationForm.css" scoped></style>
<style>
.input-delete {
    color: red;
}
.input-delete:hover {
    color: #db0000;
    cursor: pointer;
}
</style>
