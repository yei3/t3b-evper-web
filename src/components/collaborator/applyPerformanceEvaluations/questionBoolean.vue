<template>
    <a-col :span="24"
        style="padding: 5px 15px 5px 15px; margin-bottom: 0px;"
        :class="answerStatus"
    >
        <a-row>
            <a-col :xxl="8" :xl="16" :lg="12" :md="12" :sm="24">
                <h3>{{index}}. {{questionText}}</h3>
            </a-col>
            <a-col :xxl="8" :xl="8" :lg="12" :md="12" :sm="24">
                <span style="font-size: 14px; font-weight: 600" v-show="value">
                    SI
                </span>
                <span style="font-size: 14px; font-weight: 600" v-show="!value">
                    NO
                </span>
                <a-switch v-model="value" @change='save' :disabled="loading"/>
                <a-icon
                    v-show="loading"
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
        answerId: {
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
                this.save({ showMessage: false });
            }
        },
        save(options) {
            this.loading = true;
            if (this.answer.id) {
                this.update(options);
            } else {
                this.create(options);
            }
        },
        async create({ showMessage = true }) {
            const response = await client3B.evaluation.answer.create({
                evaluationQuestionId: this.questionId,
                text: String(this.value),
            }).catch(error => errorHandler(this, error));
            this.loading = false;
            if (!response) return;
            this.answer.id = response.data.result.id;
            if (showMessage) {
                this.$message.success('Evaluación guardada correctamente');
            }
        },
        async update({ showMessage = true }) {
            const response = await client3B.evaluation.answer.update({
                id: this.answer.id,
                evaluationQuestionId: this.questionId,
                text: String(this.value),
            }).catch(error => errorHandler(this, error));
            if (!response) this.value = !this.value;
            this.loading = false;
            if (showMessage) {
                this.$message.success('Evaluación guardada correctamente');
            }
        },
    },
    computed: {
        answerStatus() {
            if (this.loading) {
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
