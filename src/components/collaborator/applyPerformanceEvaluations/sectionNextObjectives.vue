<template>
    <a-col class="form-autoevaluation">
        <a-row class="form-tittle">
            <a-col :span="24">
                <h1>{{section.name}}</h1>
            </a-col>
            <a-col :span="24">
                <a-row
                    class="form-section"
                    v-for="subsection in section.childSections"
                    :key="subsection.id"
                >
                    <a-col :span="24" class="form-section-tittle" v-show="subsection.displayName">
                        <h2 style="margin: 20px 0px 0px 0px; font-size: 20px;">
                            {{subsection.name}}
                        </h2>
                    </a-col>
                    <a-col :span="24">
                        <a-row v-for="(question, index) in questions$"
                            :key="question.id"
                            style="padding: 10px 16px;"
                            :class="question.edited ?
                                'question-row orange-bar' : 'question-row green-bar'"
                        >
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
                                                message: 'Ingresa la descripción del objetivo'
                                            }
                                        ]
                                    }"
                                >
                                    <a-input v-model="question.text"
                                        placeholder="Descripción del Objetivo"
                                        @change="question.edited = true"
                                    />
                                </a-form-item>
                                <a-form-item
                                    :fieldDecoratorId="`qb${question.key}`"
                                    style="margin: 10px 0px;"
                                    label='Entregable'
                                    :labelCol="{ xxl: 5, xl: 8, lg: 10, md: 24, sm: 24 }"
                                    :wrapperCol="{ xxl: 19, xl: 16, lg: 14, md: 24, sm: 24 }"
                                    :fieldDecoratorOptions="{
                                        initialValue: question.answerType,
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Ingresa el entregable del Objetivo'
                                            }
                                        ]
                                    }"
                                >
                                    <a-input v-model="question.deriverable"
                                        placeholder="Entregable del Objetivo"
                                        @change="question.edited = true"
                                    />
                                </a-form-item>
                                <a-form-item
                                    :fieldDecoratorId="`qc${question.key}`"
                                    style="margin: 10px 0px;"
                                    label='Fecha de Entrega'
                                    :labelCol="{ xxl: 5, xl: 8, lg: 10, md: 24, sm: 24 }"
                                    :wrapperCol="{ xxl: 19, xl: 16, lg: 14, md: 24, sm: 24 }"
                                    :fieldDecoratorOptions="{
                                        initialValue: question.expectedValue,
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Ingresa una fecha'
                                            }
                                        ]
                                    }"
                                >
                                    <a-date-picker
                                        placeholder="Fecha de Entrega"
                                    />
                                </a-form-item>
                            </a-form>
                            <a-col :sm="24" :md="24" style="text-align: center; margin-top: 10px;">
                                <a @click="deleteQuestion(question.id, index)"
                                    class="link-delete-question form-icon"
                                    style="padding-right: 2%; padding-left: 4%;"
                                    :disabled="question.loading"
                                >
                                    <a-icon
                                        class='dynamic-delete-button form-icon'
                                        type="delete"
                                    /> Eliminar
                                </a>
                                <a @click="save(question)"
                                    class="link-delete-question form-icon"
                                    style="padding-left: 2%;"
                                    :disabled="question.loading"
                                >
                                    <a-icon
                                        class='dynamic-delete-button form-icon'
                                        type="check"
                                    /> Guardar
                                </a>
                                <a-icon
                                    v-show="question.loading"
                                    class='dynamic-delete-button form-icon'
                                    type="loading"
                                    style="padding-left: 2%;"
                                />
                            </a-col>
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
                </a-row>
            </a-col>
        </a-row>
    </a-col>
</template>

<script>
import questionGoal from '@/components/collaborator/applyPerformanceEvaluations/questionGoal.vue';
import errorHandler from '@/views/errorHandler';
import client3B from '@/api/client3B';

let questionUUID = 0;

export default {
    props: {
        section: {
            type: Object,
            required: true,
        },
        questions: {
            type: Array,
            required: true,
        },
        onlyLecture: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        questionGoal,
    },
    data() {
        return {
            questions$: [],
            subsectionId: null,
        };
    },
    mounted() {
        this.init();
        console.log(JSON.stringify(this.section));
    },
    methods: {
        init() {
            this.questions$ = this.questions;
            if (this.questions$.length === 0) {
                this.addQuestion();
            }
            this.subsectionId = this.section.childSections[0].id;
        },
        addQuestion() {
            questionUUID += 1;
            this.questions$.push({
                id: null,
                key: questionUUID,
                text: '',
                deliverDate: undefined,
                deriverable: '',
                edited: true,
                form: null,
                loading: false,
            });
        },
        async save(_question) {
            const question = _question;
            let validForm = true;
            question.loading = true
            question.form.validateFields((error) => {
                if (error) {
                    question.loading = false;
                    validForm = false;
                }
            });

            if (!validForm) return;

            let response = null;
            if (question.id) {
                response = await updateQuestion(question);
            } else {
                response = await createQuestion(question);
            }

            if (response) {
                question.id = response.data.result.id;
                question.edited = false;
            }
            question.loading = false;
            this.$message.success('Evaluación guardada correctamente');
        },
        async createQuestion(question) {
            const response = await client3B.question.create({
                sectionId: this.subsectionId,
                text: question.text,
                // entregable
                // fecha
            }, {
                goal: true
            }).catch(error => errorHandler(this, error));

            return response;
        },
        async updateQuestion(question) {
            const response = await client3B.question.update({
                id: question.id,
                sectionId: this.subsectionId,
                text: question.text,
                // entregable
                // fecha
            }, {
                goal: true
            }).catch(error => errorHandler(this, error));

            return response;
        },
        async deleteQuestion(question, index) {
            const response = await client3B.question.delete({
                id: question.id,
            }, {
                goal: true
            }).catch(error => errorHandler(this, error));
            if (!response) return;

            this.questions$.splice(index, 1);
            this.$message.success('Evaluación guardada correctamente');
        },
    },
};
</script>

<style src="@/assets/styles/evaluationForm.css" scoped></style>
