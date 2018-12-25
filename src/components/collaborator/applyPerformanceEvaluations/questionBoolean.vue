<template>
    <a-col :span="24"
        style="padding: 5px 15px 5px 15px; margin-bottom: 0px;"
        :class="answerStatus"
    >
        <a-row>
            <a-col :xxl="8" :xl="16" :lg="10" :md="12" :sm="24">
                <span class="question-label">{{index}}. {{questionText}}</span>
            </a-col>
            <a-col :xxl="16" :xl="8" :lg="14" :md="12" :sm="24">
                <span style="font-size: 14px; font-weight: 600" v-show="value">
                    SI
                </span>
                <span style="font-size: 14px; font-weight: 600" v-show="!value">
                    NO
                </span>
                <a-switch v-model="value" :disabled="loading" @change="edited = true"/>
            </a-col>
            <a-col :span="24" style="margin-top: 15px;">
                <a-textarea placeholder="Comentarios adicionales..."
                    :autosize="{ minRows: 2 }"
                    :disabled="onlyLecture"
                    @change="edited = true"
                />
            </a-col>
            <a-col :sm="24" :md="24" style="text-align: center; margin-top: 20px;">
                <a  class="link-delete-question form-icon"
                    style="padding-left: 2%;"
                    :disabled="loading"
                    @click="save"
                >
                    <a-icon class='dynamic-delete-button form-icon' type="check" /> Guardar Respuesta
                </a>
                <a-icon v-show="loading"
                    class='dynamic-delete-button form-icon'
                    type="loading"
                    style="padding-left: 2%;"
                />
            </a-col>
        </a-row>
    </a-col>
</template>

<script >
import errorHandler from '@/views/errorHandler';
import client3B from '@/api/client3B';

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
        questionText: {
            type: String,
            required: true,
        },
        questionId: {
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
        };
    },
    methods: {
        handleForm(e) {
            e.prevent();
        },
        parseAnswer() {
            if (this.answer.text) {
                this.value = this.answer.text === 'true';
            } else {
                this.edited = true;
            }
        },
        save(options) {
            this.loading = true;
            this.update(options);
        },
        async update({ showMessage = true }) {
            const response = await client3B.evaluation.answer.update({
                id: this.answer.id,
                evaluationQuestionId: this.questionId,
                text: String(this.value),
            }).catch(error => errorHandler(this, error));
            this.loading = false;
            if (!response) return;
            this.edited = false;
            if (showMessage) {
                this.$message.success('Evaluación guardada correctamente');
            }
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
