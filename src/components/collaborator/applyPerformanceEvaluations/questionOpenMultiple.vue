<template>
    <a-col :span="24"
        style="padding: 5px 15px 5px 15px; margin-bottom: 0px;"
        :class="answerStatus"
    >
        <h3>{{index}}. {{questionText}}</h3>
        <a-form @submit="handleForm" :autoFormCreate="(form)=>{this.form = form}">
            <div v-for="(text, index) in answersText" :key="index">
                <a-form-item

                    :fieldDecoratorId="'q-' + index"
                    style="margin: 10px 0px;"
                    :wrapperCol="{ xxl: 24, xl: 24, lg: 24, md: 24, sm: 24 }"
                    :fieldDecoratorOptions="{
                        initialValue: text,
                        rules: [
                            {
                                required: true,
                                message: 'Ingresa tu respuesta'
                            }
                        ]
                    }"
                >
                    <a-textarea placeholder="Respuesta"
                        autosize
                        :disabled="onlyLecture"
                        @change="edited = true"
                    />
                </a-form-item>

                <a-col :sm="24" :md="24" style="text-align: right; margin-top: 0px;">
                    <a  class="link-delete-question form-icon"
                        :disabled="loading"
                        @click="removeAnswer(index)"
                    >
                        <a-icon class='dynamic-delete-button form-icon' type="delete" />Eliminar
                    </a>
                </a-col>
            </div>

            <a-form-item
                fieldDecoratorId="comment"
                style="margin: 50px 0px 0 0px;"
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
            <a-icon
                v-show="loading"
                class='dynamic-delete-button form-icon'
                type="loading"
                style="padding-left: 2%;"
            />
        </a-col>
    </a-col>
</template>

<script >
import errorHandler from '@/views/errorHandler';

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
            edited: false,
            answersText: [],
        };
    },
    methods: {
        handleForm(e) {
            e.prevent();
        },
        parseAnswer() {
            if (this.answer.text) {
                console.log(this.answer.text);
                this.answersText = JSON.parse(this.answer.text);
            } else {
                this.answersText = [''];
            }
        },
        addAnswer() {
            this.edited = true;
            this.answersText.push('');
        },
        removeAnswer(index) {
            this.edited = true;
            this.answersText.splice(index, 1);
        },
        save() {
            this.form.validateFields((error, values) => {
                console.log(error, values);
                if (error) {
                    errorHandler(this, error);
                } else {
                    console.log(values);
                }
            });
        },
        create() {

        },
        update() {

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
