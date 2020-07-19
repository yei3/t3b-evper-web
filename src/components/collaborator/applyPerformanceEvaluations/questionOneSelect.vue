<template>
    <a-col :span="24" :class="answerStatus">
        <a-col class="pre-formatted" :sm="24" :md="16" :lg="18">
            {{ `${index}. ${questionText}` }}
        </a-col>
        <a-col :sm="24" :md="8" :lg="6">
            <a-form
                @submit="handleForm"
                :autoFormCreate="
                    (form) => {
                        this.form = form;
                    }
                "
            >
                <a-form-item
                    fieldDecoratorId="q1"
                    :fieldDecoratorOptions="{
                        initialValue: value,
                        rules: [
                            {
                                required: true,
                                message: 'Selecciona una respuesta',
                            },
                        ],
                    }"
                >
                    <a-select
                        placeholder="Selecciona una respuesta"
                        v-model="value"
                        @select="save"
                        :disabled="onlyLecture"
                    >
                        <a-select-option
                            v-for="(option, index) in selectOptions"
                            :key="index"
                            :value="option.value"
                        >
                            {{ option.label }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-form>
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
    </a-col>
</template>

<script>
import { mapMutations } from "vuex";
import errorHandler from "@/views/errorHandler";
import client3B from "@/api/client3B";

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
            value: undefined,
            configurable: true,
            selectOptions: [
                {
                    value: "-70",
                    label: "Insatisfactorio (<70%)",
                },
                {
                    value: "71-99",
                    label: "Cumple requerimiento (71% a 99%)",
                },
                {
                    value: "+100",
                    label: "Excede requerimiento (100%)",
                },
            ],
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
        save(optionSelected) {
            setTimeout(() => {
                if (this.onlyLecture) return;
                this.edited = true;
                this.form.validateFields((error) => {
                    if (error || optionSelected === "undefined") return;
                    this.update(optionSelected);
                });
            }, 200);
        },
        async update(optionSelected) {
            this.loading = true;
            const response = await client3B.evaluation.answer
                .update({
                    id: this.answer.id,
                    evaluationQuestionId: this.questionId,
                    text: optionSelected,
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
<style scoped>
.pre-formatted {
    white-space: pre-line;
}
div >>> .ant-form-item-label {
    text-align: left;
}

div >>> .ant-form-item-required {
    font-size: 15px;
    white-space: initial;
}
</style>
