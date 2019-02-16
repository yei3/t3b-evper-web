<template>
    <a-col :span="24"
        style="padding: 5px 15px 5px 15px; margin-bottom: 0px;"
        :class="answerStatus"
    >
        <span class="question-label">{{index}}. {{questionText}}</span>
        <a-form @submit="e => e.preventDefault()" :autoFormCreate="(form)=>{this.form = form}">
            <a-form-item
                fieldDecoratorId="q1"
                style="margin: 10px 0px;"
                label='Descripción:'
                :labelCol="{ xxl: 5, xl: 8, lg: 10, md: 24, sm: 24 }"
                :wrapperCol="{ xxl: 19, xl: 16, lg: 14, md: 24, sm: 24 }"
                :fieldDecoratorOptions="{
                    initialValue: answer.action,
                    rules: [
                        {
                            required: true,
                            message: 'Ingresa la descripción de la Acción'
                        }
                    ]
                }"
            >
                <a-tooltip placement="top"
                    title="Recuerda salvar tus comentarios presionando enter al terminar
                            o dando clic en el botón de la derecha."
                >
                    <a-input v-model="ans.action"
                        placeholder="Descripción de la Acción"
                        :disabled="onlyLecture"
                        @keyup="edited = true"
                        @keypress.enter.prevent="save"
                    >
                        <a-icon class="input-save"
                            @click="save"
                            slot="addonAfter"
                            type="save"
                            v-if="!onlyLecture"
                        />
                    </a-input>
                </a-tooltip>
            </a-form-item>
            <a-form-item
                fieldDecoratorId="q2"
                style="margin: 10px 0px;"
                label='Fecha de Compromiso'
                :labelCol="{ xxl: 5, xl: 8, lg: 10, md: 24, sm: 24 }"
                :wrapperCol="{ xxl: 19, xl: 16, lg: 14, md: 24, sm: 24 }"
                :fieldDecoratorOptions="{
                    initialValue: moment(ans.deliverDate, 'YYYY/MM/DD'),
                    rules: [
                        {
                            required: true,
                            message: 'Ingresa la fecha de entrega'
                        }
                    ]
                }"
            >
                <a-date-picker
                    :defaultValue="moment(ans.deliverDate, 'YYYY/MM/DD')"
                    :format="'YYYY/MM/DD'"
                    placeholder="Fecha de Entrega"
                    @change="(moment, _) => {
                        ans.deliverDate = moment;
                        ans.edited = true;
                        save();
                    }"
                />
            </a-form-item>
            <a-form-item
                fieldDecoratorId="q3"
                style="margin: 10px 0px;"
                label='Responsable'
                :labelCol="{ xxl: 5, xl: 8, lg: 10, md: 24, sm: 24 }"
                :wrapperCol="{ xxl: 19, xl: 16, lg: 14, md: 24, sm: 24 }"
                :fieldDecoratorOptions="{
                    initialValue: answer.text,
                    rules: [
                        {
                            required: true,
                            message: 'Ingresa el nombre del responsable'
                        }
                    ]
                }"
            >
                <a-tooltip placement="top"
                    title="Recuerda salvar tus comentarios presionando enter al terminar
                            o dando clic en el botón de la derecha."
                >
                    <a-input v-model="ans.person"
                        placeholder="Nombre del responsable"
                        @keyup="edited = true"
                        @keypress.enter.prevent="save"
                    >
                        <a-icon class="input-save"
                            @click="save"
                            slot="addonAfter"
                            type="save"
                            v-if="!onlyLecture"
                        />
                    </a-input>
                </a-tooltip>
            </a-form-item>
        </a-form>
        <a-col :sm="24" :md="24" style="text-align: center; margin-top: 5px;">
            <a-icon v-show="loading"
                class='dynamic-delete-button form-icon'
                type="loading"
                style="padding-left: 30px;"
            /> <span v-show="loading"> Guardardando Respuesta </span>
        </a-col>
    </a-col>
</template>

<script >
import moment from 'moment';

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
    created() {
        this.parseAnswer();
    },
    data() {
        return {
            edited: false,
            loading: false,
            ans: {
                action: '',
                person: '',
                deliverDate: new Date(),
            },
            configurable: true,
        };
    },
    methods: {
        moment,
        ...mapMutations([
            'evaluationSetQuestionsAsAnswered',
        ]),
        handleForm(e) {
            e.prevent();
        },
        parseAnswer() {
            if (this.answer.text) {
                this.ans.action = this.answer.action;
                this.ans.text = this.answer.text;
                this.ans.deliverDate = new Date();
            }
            if (this.questionStatus === 1) {
                this.edited = true;
            }
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
            const response = await client3B.evaluation.answer.update({
                id: this.answer.id,
                evaluationQuestionId: this.questionId,
                action: this.ans.action,
                text: String(this.ans.person),
                commitmentDate: new Date(this.ans.deliverDate._d).toISOString(),
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
