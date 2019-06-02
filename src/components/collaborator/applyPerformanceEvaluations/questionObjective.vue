<template>
    <a-col :span="24" style="padding: 5px 15px 0px 15px; margin-bottom: 0px;" :class="answerStatus">
        <a-col :span="24">
            <h4>{{ `${index}. ${questionText}` }}</h4>
        </a-col>
        <a-form
            @submit="handleForm"
            :autoFormCreate="
                (form) => {
                    this.form = form;
                }
            "
        >
            <a-form-item
                fieldDecoratorId="e1"
                label="Valor esperado"
                :labelCol="{ xxl: 5, xl: 8, lg: 10, md: 24, sm: 24 }"
                :wrapperCol="{ xxl: 19, xl: 14, lg: 14, md: 24, sm: 24 }"
                :fieldDecoratorOptions="{
                    initialValue: expected,
                    rules: [
                        {
                            required: true,
                            message: 'Selecciona una respuesta',
                        },
                    ],
                }"
            >
                <a-input
                    v-model="expectedValue"
                    style="width: 200px;"
                    @keyup="edited = true"
                    @keypress.enter.prevent="save"
                    :disabled="onlyLecture"
                >
                    <a-icon class="input-save" @click="save" slot="addonAfter" type="save" />
                </a-input>
            </a-form-item>
            <a-form-item
                fieldDecoratorId="q1"
                label="Valor real"
                :labelCol="{ xxl: 5, xl: 8, lg: 10, md: 24, sm: 24 }"
                :wrapperCol="{ xxl: 19, xl: 14, lg: 14, md: 24, sm: 24 }"
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
                <a-input
                    v-model="value"
                    style="width: 200px;"
                    @keyup="edited = true"
                    @keypress.enter.prevent="save"
                    :disabled="onlyLecture"
                >
                    <a-icon class="input-save" @click="save" slot="addonAfter" type="save" />
                </a-input>
            </a-form-item>
            <a-form-item
                fieldDecoratorId="o1"
                label="Observaciones"
                :labelCol="{ xxl: 5, xl: 8, lg: 10, md: 24, sm: 24 }"
                :wrapperCol="{ xxl: 19, xl: 14, lg: 14, md: 24, sm: 24 }"
                :fieldDecoratorOptions="{
                    initialValue: observations,
                    rules: [
                        {
                            required: false,
                            message: 'Observaciones',
                        },
                    ],
                }"
            >
                <a-textarea
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    v-model="observations"
                    placeholder="Observaciones..."
                    @keyup="edited = true"
                    @keypress.enter.prevent="save"
                    :disabled="onlyLecture"
                />
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
        expected: {
            type: [String, Number],
            required: true,
        },
        answer: {
            type: Object,
            required: true,
        },
        templateQuestion: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            edited: false,
            loading: false,
            expectedValue: null,
            value: 0,
            observations: "",
            numeric: false,
            configurable: true,
        };
    },
    mounted() {
        this.parseAnswer();
    },
    methods: {
        ...mapMutations(["evaluationSetQuestionsAsAnswered"]),
        handleForm(e) {
            e.prevent();
        },
        parseAnswer() {
            this.expectedValue = this.expected;
            if (!Number.isNaN(Number(this.expected))) {
                this.numeric = true;
                this.value = this.answer.real || 0;
            } else {
                this.value = this.answer.text || "";
            }
            if (this.questionStatus === 1) {
                this.edited = true;
            }
            this.observations = this.answer.observations || "";
        },
        save() {
            if (this.onlyLecture) return;
            this.form.validateFields((error) => {
                if (error) return;
                if (this.numeric && Number.isNaN(Number(this.value))) {
                    errorHandler(this, "Se espera un valor numérico");
                    return;
                }
                this.update();
            });
        },
        async update() {
            this.loading = true;
            const response = await client3B.evaluation.answer
                .update(
                    {
                        id: this.answer.id,
                        evaluationQuestionId: this.questionId,
                        text: this.numeric ? null : this.value,
                        real: this.numeric ? this.value : 0,
                        isActive: true,
                        evaluationMeasuredQuestion: {
                            status: 2,
                        },
                        observations: this.observations,
                    },
                    { measured: true },
                )
                .catch((error) => errorHandler(this, error));
            this.loading = false;
            if (!response) return;
            this.edited = false;
            this.evaluationSetQuestionsAsAnswered(this.questionId);
            this.$message.success("Evaluación guardada correctamente");
            await this.updateExpectedValue();
        },
        async updateExpectedValue() {
            const templateQuestion = JSON.parse(JSON.stringify(this.templateQuestion));
            if (this.numeric) {
                templateQuestion.expected = this.expectedValue;
            } else {
                templateQuestion.expectedText = this.expectedValue;
            }

            await client3B.question
                .update(templateQuestion, { objective: true })
                .catch((error) => errorHandler(this, error));
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
div >>> .ant-form-item-label {
    text-align: left;
}

div >>> .ant-form-item-required {
    font-size: 15px;
}

div >>> .ant-form-item {
    margin-bottom: 5px;
}

.input-save {
    color: green;
}

.input-save:hover {
    color: #005f00;
    cursor: pointer;
}
</style>
