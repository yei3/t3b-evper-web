<template>
    <a-col :span="24"
        style="padding: 5px 15px 5px 15px; margin-bottom: 0px;"
        :class="answerStatus"
    >
        <a-row>
            <a-form @submit="e => e.preventDefault()"
                :autoFormCreate="(form)=>{question.form = form}"
            >
                <a-form-item
                    :fieldDecoratorId="`qa${question.key}`"
                    style="margin: 10px 0px;"
                    label='Descripción:'
                    :labelCol="{ xxl: 5, xl: 8, lg: 10, md: 24, sm: 24 }"
                    :wrapperCol="{ xxl: 19, xl: 16, lg: 14, md: 24, sm: 24 }"
                    :fieldDecoratorOptions="{
                        initialValue: question.text,
                        rules: [
                            {
                                required: true,
                                message: 'Ingresa la descripción de la Acción'
                            }
                        ]
                    }"
                >
                    <a-input v-model="question.text"
                        placeholder="Descripción de la Acción"
                        @change="question.edited = true"
                    />
                </a-form-item>
                <a-form-item
                    :fieldDecoratorId="`qc${question.key}`"
                    style="margin: 10px 0px;"
                    label='Fecha de Compromiso'
                    :labelCol="{ xxl: 5, xl: 8, lg: 10, md: 24, sm: 24 }"
                    :wrapperCol="{ xxl: 19, xl: 16, lg: 14, md: 24, sm: 24 }"
                    :fieldDecoratorOptions="{
                        initialValue: moment(question.deliverDate, 'YYYY/MM/DD'),
                        rules: [
                            {
                                required: true,
                                message: 'Ingresa la fecha de entrega'
                            }
                        ]
                    }"
                >
                    <a-date-picker
                        :defaultValue="moment(question.deliverDate, 'YYYY/MM/DD')"
                        :format="'YYYY/MM/DD'"
                        placeholder="Fecha de Entrega"
                        @change="(moment, _) => {
                            question.deliverDate = moment;
                            question.edited = true;
                        }"
                    />
                </a-form-item>
                <a-form-item
                    :fieldDecoratorId="`qb${question.key}`"
                    style="margin: 10px 0px;"
                    label='Responsable'
                    :labelCol="{ xxl: 5, xl: 8, lg: 10, md: 24, sm: 24 }"
                    :wrapperCol="{ xxl: 19, xl: 16, lg: 14, md: 24, sm: 24 }"
                    :fieldDecoratorOptions="{
                        initialValue: question.deriverable,
                        rules: [
                            {
                                required: true,
                                message: 'Ingresa el nombre del responsable'
                            }
                        ]
                    }"
                >
                    <a-input v-model="question.deriverable"
                        placeholder="Entregable del Objetivo"
                        @change="question.edited = true"
                    />
                </a-form-item>
            </a-form>
        </a-row>
        <a-row>
            <a-col :md="24" style="text-align: center;">
                <a-button
                    type='dashed'
                    @click="addQuestion"
                    class="add-button"
                    style="min-width: 200px; width: 300px; margin: 0px;"
                >
                    <a-icon type='plus' /> Agregar Objetivo
                </a-button>
            </a-col>
        </a-row>
    </a-col>
</template>

<script >
import errorHandler from '@/views/errorHandler';
import client3B from '@/api/client3B';
import { mapMutations } from 'vuex';

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
        ...mapMutations([
            'evaluationSetQuestionsAsAnswered',
        ]),
        handleForm(e) {
            e.prevent();
        },
        parseAnswer() {
            if (this.answer.text) {
                this.value = this.answer.text === 'true';
            }
            if (this.questionStatus === 1) {
                this.edited = true;
            }
        },
        save() {
            this.edited = true;
            this.loading = true;
            if (this.onlyLecture) return;
            this.update();
        },
        async update() {
            const response = await client3B.evaluation.answer.update({
                id: this.answer.id,
                evaluationQuestionId: this.questionId,
                text: String(this.value),
                evaluationUnmeasuredQuestion: {
                    status: 2,
                },
            }).catch(error => errorHandler(this, error));
            this.loading = false;
            if (!response) return;
            this.edited = false;
            this.evaluationSetQuestionsAsAnswered(this.questionId);
            this.$message.success('Evaluación guardada correctamente');
        },
    },
    computed: {
        answerStatus() {
            if (this.edited) {
                return 'question-row orange-bar';
            }
            return 'question-row green-bar';
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
