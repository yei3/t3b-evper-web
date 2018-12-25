<template>
    <a-col :span="24"
        style="padding: 5px 15px 5px 15px; margin-bottom: 0px;"
        :class="answerStatus"
    >
        <h3>{{index}}. {{questionText}}</h3>
        <a-form @submit="handleForm" :autoFormCreate="(form)=>{this.form = form}">
            <a-form-item style="margin: 10px 0px;"
                fieldDecoratorId="q1"
                :wrapperCol="{ xxl: 24, xl: 24, lg: 24, md: 24, sm: 24 }"
                :fieldDecoratorOptions="{
                    initialValue: value,
                    rules: [
                        {
                            required: true,
                            message: 'Ingresa tu respuesta'
                        }
                    ]
                }"
            >
                <a-input placeholder="Respuesta"
                    v-model="value"
                    :disabled="onlyLecture"
                    @change="edited = true"
                />
            </a-form-item>

            <a-form-item style="margin: 50px 0px 0 0px;"
                fieldDecoratorId="comment"
                :wrapperCol="{ xxl: 24, xl: 24, lg: 24, md: 24, sm: 24 }"
                :fieldDecoratorOptions="{
                    rules: [
                        {
                            required: false,
                            message: 'Comentarios adicionales'
                        }
                    ]
                }"
            >
                <a-textarea placeholder="Comentarios adicionales..."
                    :autosize="{ minRows: 2 }"
                    :disabled="onlyLecture"
                    @change="edited = true"
                />
            </a-form-item>
        </a-form>
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
            value: '',
        };
    },
    methods: {
        handleForm(e) {
            e.prevent();
        },
        parseAnswer() {
            if (this.answer.text) {
                this.value = this.answer.text;
            } else {
                this.edited = true;
            }
        },
        save() {
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
                text: this.value,
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
