<template>
    <a-col :span="24"
        style="padding: 5px 15px 0px 15px; margin-bottom: 0px;"
        :class="answerStatus"
    >
        <a-col :span="12">
            <h3>{{`${index}. ${questionText}`}}</h3>
        </a-col>
        <a-form @submit="handleForm" :autoFormCreate="(form)=>{this.form = form}">
            <a-form-item
                fieldDecoratorId="e1"
                style="text-align: left; margin-bottom: 0px;"
                label='Esperado'
                :labelCol="{ xxl: 8, xl: 16, lg: 10, md: 12, sm: 24 }"
                :wrapperCol="{ xxl: 16, xl: 8, lg: 14, md: 12, sm: 24 }"
                :fieldDecoratorOptions="{
                    initialValue: expectedValue,
                    rules: [
                        {
                            required: true,
                            message: 'Selecciona una respuesta'
                        }
                    ]
                }"
            >
                <a-input placeholder="Selecciona una respuesta"
                    v-model="expectedValue"
                />
            </a-form-item>
        </a-form>
        <a-col :sm="24" :md="24" style="text-align: center; margin-top: 5px;" v-show="loading">
            <a-icon class='dynamic-delete-button form-icon'
                type="loading"
                style="padding-left: 2%;"
            /> Guardardando Respuesta
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
        expected: {
            type: [String, Number],
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
            expectedValue: null,
            value: null,
        };
    },
    mounted() {
        this.parseAnswer();
    },
    methods: {
        handleForm(e) {
            e.prevent();
        },
        parseAnswer() {
            if (this.answer.text == 0 && this.answer.real === 0) {
                this.edited = true;
            } if(this.answer.text == null) {
                this.value = this.answer.real;
            } else {
                this.value = this.answer.text;
            }
        },
        save(optionSelected) {
            console.log('saved');
            this.form.validateFields((error) => {
                if (error) return;
                this.update(optionSelected);
            });
        },
        async update(optionSelected) {
            return;
            this.loading = true;
            const response = await client3B.evaluation.answer.update({
                id: this.answer.id,
                evaluationQuestionId: this.questionId,
                text: optionSelected,
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
<style scoped>
div >>> .ant-form-item-label {
    text-align: left;
}

div >>> .ant-form-item-required {
    font-size: 15px;
}
</style>
