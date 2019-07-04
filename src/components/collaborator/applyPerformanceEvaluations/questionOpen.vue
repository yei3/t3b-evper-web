<template>
    <a-col :span="24" style="padding: 5px 15px 5px 15px; margin-bottom: 0px;" :class="answerStatus">
        <span class="question-label">{{ index }}. {{ questionText }}</span>
        <a-form
            @submit="handleForm"
            :autoFormCreate="
                (form) => {
                    this.form = form;
                }
            "
        >
            <a-form-item
                style="margin-bottom: 0px;"
                fieldDecoratorId="q1"
                :wrapperCol="{ xxl: 24, xl: 24, lg: 24, md: 24, sm: 24 }"
                :fieldDecoratorOptions="{
                    initialValue: value,
                    rules: [
                        {
                            required: true,
                            message: 'Ingresa tu respuesta',
                        },
                    ],
                }"
            >
                <a-tooltip placement="top" title="Recuerda dar clic en el disquete para guardar tus comentarios.">
                    <a-input
                        placeholder="Respuesta"
                        v-model="value"
                        :disabled="onlyLecture"
                        @keyup="edited = true"
                        @keypress.enter.prevent="save"
                    >
                        <a-icon class="input-save" @click="save" slot="addonAfter" type="save" v-if="!onlyLecture" />
                    </a-input>
                </a-tooltip>
            </a-form-item>
        </a-form>
        <a-col :sm="24" :md="24" style="text-align: center; margin-top: 5px;">
            <a-icon
                v-show="loading"
                class="dynamic-delete-button form-icon"
                type="loading"
                style="padding-left: 30px;"
            />
            <span v-show="loading"> Guardardando Respuesta </span>
        </a-col>
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
    data() {
        return {
            edited: false,
            loading: false,
            value: "",
            configurable: true,
        };
    },
    mounted() {
        this.parseAnswer();
        this.setStatus();
    },
    methods: {
        ...mapMutations(["evaluationSetQuestionsAsAnswered", "evaluationAddQuestionStatus"]),
        handleForm(e) {
            e.prevent();
        },
        parseAnswer() {
            if (this.answer.text) {
                this.value = this.answer.text;
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
            if (this.onlyLecture) return;
            this.form.validateFields((error) => {
                if (error) return;
                this.update();
            });
        },
        async update() {
            this.loading = true;
            const response = await client3B.evaluation.answer
                .update({
                    id: this.answer.id,
                    evaluationQuestionId: this.questionId,
                    text: this.value,
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
.input-save {
    color: green;
}
.input-save:hover {
    color: #005f00;
    cursor: pointer;
}
</style>
