<template>
    <a-col :span="24"
        style="padding: 5px 15px 5px 15px; margin-bottom: 0px;"
        :class="answerStatus"
    >
        <span class="question-label">{{index}}. {{questionText}}</span>
        <a-form @submit="handleForm" :autoFormCreate="(form)=>{this.form = form}">
            <div v-for="(text, index) in answersText" :key="index">
                <a-form-item style="margin: 10px 0px;"
                    :fieldDecoratorId="version + '-q-' + index"
                    :wrapperCol="{ xxl: 24, xl: 24, lg: 24, md: 24, sm: 24 }"
                    :fieldDecoratorOptions="{
                        initialValue: answersText[index],
                        rules: [
                            {
                                required: true,
                                message: 'Ingresa tu respuesta'
                            }
                        ]
                    }"
                >
                    <a-input placeholder="Respuesta"
                        v-model="answersText[index]"
                        :disabled="onlyLecture"
                        @keyup="edited=true"
                        @keypress.enter.prevent="save"
                    >
                        <a-icon class="input-delete"
                            @click="removeAnswer(index)"
                            slot="addonAfter"
                            type="delete"
                            v-if="!onlyLecture"
                        />
                    </a-input>
                </a-form-item>
            </div>
        </a-form>
        <a-col :sm="24" :md="24" style="text-align: center; margin-top: 0px;" v-if="!onlyLecture">
            <a  class="link-delete-question form-icon"
                :disabled="loading"
                @click="addAnswer"
            >
                <a-icon class='dynamic-delete-button form-icon' type="plus" /> Agregar campo
            </a>
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
            version: 1,
            loading: false,
            edited: false,
            answersText: [''],
        };
    },
    methods: {
        handleForm(e) {
            e.prevent();
        },
        parseAnswer() {
            if (this.answer.text) {
                this.answersText = JSON.parse(this.answer.text);
            }
            if (this.questionStatus === 1) {
                this.edited = true;
            }
        },
        addAnswer() {
            this.edited = true;
            this.answersText.push('');
        },
        removeAnswer(index) {
            this.answersText.splice(index, 1);
            this.version += 1;
            if (this.answersText.length === 0) {
                setTimeout(() => {
                    this.answersText = [''];
                }, 200);
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
            const text = JSON.stringify(this.answersText);
            const response = await client3B.evaluation.answer.update({
                id: this.answer.id,
                evaluationQuestionId: this.questionId,
                text,
                evaluationUnmeasuredQuestion: {
                    status: 2,
                },
            }).catch(error => errorHandler(this, error));
            this.loading = false;
            if (!response) return;
            this.edited = false;
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
