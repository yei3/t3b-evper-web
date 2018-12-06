<template>
    <a-form @submit="handleForm" :autoFormCreate="(form)=>{this.form = form}">
        <a-row class="form-autoevaluation">
            <a-row class="form-tittle">
                <a-col :span="24" style="margin-bottom: 20px">
                    <span style="font-size: 26px;
                        font-weight: 100;"
                    >
                        {{sectionTitle}}
                    </span>
                    <a-tooltip placement="top" title="Editar Título">
                        <a @click="sectionModal.visible = true; sectionModal.value = sectionTitle;"
                            style="color: #777;"
                        >
                            <a-icon type="edit" class="form-icon"/>
                        </a>
                    </a-tooltip>
                </a-col>
            </a-row>
            <a-row v-for="subsection in subsections" :key="subsection.id">
                <a-row><a-col :span="24">
                    <a-tooltip placement="top" title="Mostrar Subtítulo">
                        <span style="font-size: 20px;">
                            {{subsection.title.value}}
                        </span>
                    </a-tooltip>
                    <a-tooltip placement="top" title="Editar Subtítulo">
                        <a @click="subsection.showModal = true;
                            subsection.title.lastValue = subsection.title.value;"
                            style="color: #777; margin: 0px 10px 0px 15px;"
                            :disabled="subsection.loading"
                        >
                            <a-icon type="edit" class="form-icon"/> Editar
                        </a>
                    </a-tooltip>
                    <a-tooltip placement="top" title="Borrar Subsección">
                        <a @click="removeSubsection(subsection)"
                            style="color: #777; margin: 0px 15px 0px 10px;"
                            :disabled="subsection.loading"
                        >
                            <a-icon type="delete" class="form-icon"/> Eliminar
                        </a>
                    </a-tooltip>
                    <a-tooltip placement="top" title="Visibilidad del título">
                        Visibilidad <a-switch
                            :checked="subsection.title.visible"
                            @change="subsection.title.visible = !subsection.title.visible;
                            updateSubsection(subsection)"
                            :disabled="subsection.loading"
                        />
                    </a-tooltip>
                    <a-tooltip placement="top" title="Actualizando...">
                        <a-icon type="loading" class="form-icon"
                            style="font-size: 18px; margin-left: 10px;"
                            v-show="subsection.loading"
                        />
                    </a-tooltip>
                    <a-modal
                        title="Título de la Subsección"
                        v-model="subsection.showModal"
                    >
                        <a-input
                            v-model="subsection.title.lastValue"
                            @keyup.enter.native="updateSubsection(subsection)"
                        />
                        <template slot="footer">
                            <a-button class="" @click="subsection.showModal = false;">
                                Cancelar
                            </a-button>
                            <a-button class="btn-green" @click="updateSubsection(subsection)"
                                :loading="subsection.loading"
                            >
                                Aceptar
                            </a-button>
                        </template>
                    </a-modal>
                </a-col></a-row>
                <a-row><a-col v-for="question in subsection.questions"
                    :key="question.id"
                    :class="getQuestionStatus(question)"
                >
                    <a-form-item
                        :fieldDecoratorId="'question-' + subsection.id + '-' + question.id"
                        style="margin: 10px 0px;"
                        label='Pregunta'
                        :labelCol="{ xxl: 5, xl: 8, lg: 10, md: 12, sm: 24 }"
                        :wrapperCol="{ xxl: 19, xl: 14, lg: 14, md: 12, sm: 24 }"
                        :fieldDecoratorOptions="{
                            rules: [
                                {
                                    required: true,
                                    message: 'Ingresa el texto de la pregunta'
                                }
                            ]
                        }"
                    >
                        <a-input style=""
                            v-model="question.text"
                            placeholder="Texto de la pregunta"
                        />
                    </a-form-item>

                    <a-form-item
                        :fieldDecoratorId="'answer-' + subsection.id + '-' + question.id"
                        style="margin: 10px 0px;"
                        label='Tipo de Respuesta'
                        :labelCol="{ xxl: 5, xl: 8, lg: 10, md: 12, sm: 24 }"
                        :wrapperCol="{ xxl: 19, xl: 14, lg: 14, md: 12, sm: 24 }"
                        :fieldDecoratorOptions="{
                            rules: [
                                {
                                    required: true,
                                    message: 'Selecciona un tipo de respuesta'
                                }
                            ]
                        }"
                    >
                        <a-select
                            v-model="question.answerType"
                            placeholder="Tipo de respuesta"
                        >
                            <a-select-option :key="answerType.value"
                                :value="answerType.value"
                                v-for="answerType in answerTypes"
                            >
                                {{answerType.label}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item
                        v-show="question.answerType === 'objective'"
                        :fieldDecoratorId="'expectedValue-' + subsection.id + '-' + question.id"
                        style="margin: 10px 0px;"
                        label='Valor del Objetivo'
                        :labelCol="{ xxl: 5, xl: 8, lg: 10, md: 12, sm: 24 }"
                        :wrapperCol="{ xxl: 19, xl: 14, lg: 14, md: 12, sm: 24 }"
                        :fieldDecoratorOptions="{
                            rules: [
                                {
                                    required: true,
                                    message: 'Ingresa el valor numérico del objetivo'
                                }
                            ]
                        }"
                    >
                        <a-input style=""
                            type="number"
                            v-model="question.expectedValue"
                            placeholder="Valor del Objetivo"
                        />
                    </a-form-item>
                    <a-form-item
                        v-show="question.answerType === 'objective'"
                        label='Relación de aprobación del objetivo'
                        :fieldDecoratorId="`approvalRship-${subsection.id}-${question.id}`"
                        style="margin: 10px 0px;"
                        :labelCol="{ xxl: 5, xl: 8, lg: 10, md: 12, sm: 24 }"
                        :wrapperCol="{ xxl: 19, xl: 14, lg: 14, md: 12, sm: 24 }"
                        :fieldDecoratorOptions="{
                            rules: [
                                {
                                    required: true,
                                    message: 'Selecciona una opción'
                                }
                            ]
                        }"
                    >
                        <a-select v-model="question.approvalRelationship"
                            placeholder="Relación de aprobación del objetivo"
                        >
                            <a-select-option value="gt">
                                Mientras más grande mejor
                            </a-select-option>
                            <a-select-option value="lt">
                                Mientras más pequeño mejor
                            </a-select-option>
                            <a-select-option value="eq">
                                Debe ser igual
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-col :sm="24" :md="24" style="text-align: center; margin-top: 10px;">
                        <a @click="removeQuestion(subsection.id, question.id)"
                            class="link-delete-question form-icon"
                            style="padding-right: 2%;"
                        >
                            <a-icon
                                class='dynamic-delete-button form-icon'
                                type='delete'
                            /> Eliminar
                        </a>
                        <a @click="saveQuestion(subsection.id, question)"
                            class="link-delete-question form-icon"
                            style="padding-left: 2%;"
                        >
                            <a-icon
                                class='dynamic-delete-button form-icon'
                                type='check'
                            /> Guardar
                        </a>
                    </a-col>
                    <a-divider />
                </a-col></a-row>
                <a-row><a-col :md="24" style="text-align: center;">
                    <a-button
                        type='dashed'
                        @click="addQuestion(subsection.id)"
                        class="add-button"
                        style="min-width: 200px; width: 300px; margin: 0px 0px 40px 0px;"
                    >
                        <a-icon type='plus' /> Agregar Pregunta
                    </a-button>
                </a-col></a-row>
            </a-row>
            <a-row>
                <a-col :sm="24" :md="6" :offset="0">
                    <a-button
                        style="min-width: 200px; width: 300px; margin-top: 20px;"
                        type='dashed'
                        @click="addSubsectionModal.visible = true; addSubsectionModal.value = '';"
                        class="add-button">
                        <a-icon type='plus' /> Agregar Subsección
                    </a-button>
                </a-col>
                <a-modal
                    title="Título de la Sección"
                    v-model="sectionModal.visible"
                >
                    <a-input
                        v-model="sectionModal.value"
                        @keyup.enter.native="handleSectionTitleInput"
                    />
                    <template slot="footer">
                        <a-button @click="sectionModal.visible = false;
                            sectionModal.value = '';">
                            Cancelar
                        </a-button>
                        <a-button class="btn-green"
                            @click="handleSectionTitleInput"
                            :loading="sectionModal.loading"
                        >
                            Aceptar
                        </a-button>
                    </template>
                </a-modal>
                <a-modal
                    title="Agregar nueva subsección"
                    v-model="addSubsectionModal.visible"
                >
                    <a-input
                        v-model="addSubsectionModal.value"
                        @keyup.enter.native="addSubsection(addSubsectionModal.value)"
                    />
                    <template slot="footer">
                        <a-button @click="addSubsectionModal.visible = false;
                            addSubsectionModal.value = '';">
                            Cancelar
                        </a-button>
                        <a-button class="btn-green"
                            @click="addSubsection(addSubsectionModal.value)"
                            :loading="addSubsectionModal.loading"
                        >
                            Aceptar
                        </a-button>
                    </template>
                </a-modal>
            </a-row>
        </a-row>
        <a-row style="margin-bottom: 20px;">
            <a-col :span="24" style="text-align: right;">
                <a-button @click="previousStep" :disabled="false"
                    class="btn-green"
                    style="margin-right: 15px;"
                >
                    Anterior
                </a-button>
                <a-button class="btn-green" htmlType='submit'
                    v-show="!showFinishButton"
                    :loading="view.loading"
                    :disabled="subsections.length === 0"
                >
                    Siguiente
                </a-button>
                <a-button class="btn-green" htmlType='submit'
                    v-show="showFinishButton"
                    :loading="view.loading"
                    :disabled="subsections.length === 0"
                >
                    Finalizar
                </a-button>
            </a-col>
        </a-row>
    </a-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import client3B from '@/api/client3B';
import errorHandler from '@/views/errorHandler';

export default {
    props: {
        sectionId: {
            type: Number,
            required: true,
        },
        showFinishButton: {
            type: Boolean,
            required: false,
        },
        sectionTitle: {
            type: String,
            required: true,
        },
    },
    model: {
        prop: 'sectionTitle',
        event: 'input',
    },
    data() {
        return {
            view: {
                loading: false,
            },
            addSubsectionModal: {
                visible: false,
                value: '',
                loading: false,
            },
            sectionModal: {
                visible: false,
                value: '',
                loading: false,
            },
            answerTypes: [
                {
                    label: 'Objetivo',
                    value: 3,
                },
                {
                    label: 'Pregunta abierta',
                    value: 0,
                },
                {
                    label: 'Múltiples respuestas abiertas',
                    value: 1,
                },
                {
                    label: 'Selección de respuesta predefinida',
                    value: 2,
                },
                {
                    label: 'Si / No',
                    value: 4,
                },
            ],
            subsectionUUID: 0,
            subsections: [],
            userActions: {
                sections: {
                    create: [],
                    update: [],
                    delete: [],
                },
                questions: {
                    create: [],
                    update: [],
                    delete: [],
                },
            },
        };
    },
    methods: {
        ...mapActions({
            nextStep: 'nextStep',
            previousStep: 'previousStep',
            updateEvaluationForm: 'updateEvaluationForm',
        }),
        handleForm(e) {
            e.preventDefault();
            this.form.validateFields((error) => {
                if (error) return;
                this.view.loading = true;
                this.saveObjectives();
            });
        },
        async saveObjectives() {
            const section = {
                name: this.sectionTitle,
                showName: true,
                evaluationId: this.evaluationStored.id,
                parentId: 0,
                subsections: this.subsections.map(subsection => ({
                    name: subsection.title.value,
                    showName: subsection.title.visible,
                    evaluationId: this.evaluationStored.id,
                    questions: subsection.questions.map(question => ({
                        text: question.text,
                        questionType: question.answerType,
                    })),
                })),
            };

            const response = await client3B.evaluation.addSection(section).catch((error) => {
                errorHandler(this, error);
            });

            this.view.loading = false;
            if (!response) return;

            this.$message.success('Evaluación guardada correctamente');
            this.nextStep();
            if (this.showFinishButton) {
                this.$router.push({ name: 'home' });
            }
        },
        async addSubsection(sectionTitle) {
            this.addSubsectionModal.loading = true;
            const response = await client3B.section.create({
                name: sectionTitle,
                evaluationTemplateId: this.format.id,
                displayName: true,
                parentId: this.sectionId,
            }).catch(error => errorHandler(error));
            if (!response) {
                this.addSubsectionModal.loading = false;
                return;
            }
            this.subsectionUUID += 1;
            this.subsections.push({
                id: this.subsectionUUID,
                key: response.data.result.id,
                loading: false,
                showModal: false,
                title: {
                    visible: true,
                    value: sectionTitle,
                    lastValue: sectionTitle,
                },
                questionUUID: 0,
                questions: [{
                    id: 0,
                    text: '',
                    key: null,
                    answerType: null,
                    edited: true,
                }],
            });
            this.addSubsectionModal.visible = false;
            this.addSubsectionModal.value = '';
            this.addSubsectionModal.loading = false;
        },
        async updateSubsection(subsection) {
            subsection.loading = true;
            const response = await client3B.section.update({
                id: subsection.key,
                name: subsection.title.lastValue,
                displayName: subsection.title.visible,
                evaluationTemplateId: this.format.id,
                parentId: this.sectionId,
            }).catch(error => errorHandler(error));
            if (!response) {
                subsection.loading = false;
                return;
            }

            subsection.showModal = false;
            subsection.title.value = subsection.title.lastValue;
            subsection.loading = false;
            this.$message.success('Evaluación guardada correctamente');
        },
        addQuestion(sectionId) {
            const subsection = this.subsections.find(cmpt => cmpt.id === sectionId);
            subsection.questionUUID += 1;
            // const response = await client3B.question.create({

            // }).catch(error => errorHandler(error));
            subsection.questions.push({
                id: subsection.questionUUID,
                key: null,
                text: '',
                answerType: null,
                edited: true,
            });
        },
        removeQuestion(sectionId, questionId) {
            const subsection = this.subsections.find(cmpt => cmpt.id === sectionId);
            subsection.questions = subsection.questions.filter(qst => qst.id !== questionId);
        },
        async removeSubsection(subsection) {
            subsection.loading = true;
            const response = await client3B.section.delete({
                id: subsection.key,
            }).catch(error => errorHandler(error));
            if(!response) {
                subsection.loading = false;
                return;
            }
            this.subsections = this.subsections.filter(sbt =>
                sbt.id !== subsection.id);
            subsection.loading = false;
        },
        async handleSectionTitleInput() {
            this.sectionModal.loading = true;
            const response = await client3B.section.update({
                id: this.sectionId,
                evaluationTemplateId: this.format.id,
                name: this.sectionModal.value,
            }).catch(error => errorHandler(error));
            if(!response) {
                this.sectionModal.loading = false;
                return;
            }

            this.sectionModal.visible = false;
            this.$emit('input', this.sectionModal.value);
            this.sectionModal.value = '';
            this.sectionModal.loading = false;
            this.$message.success('Evaluación guardada correctamente');
        },
        handleSubsectionTitleInput() {
            this.sectionModal.visible = false;
        },
        getQuestionStatus(question) {
            if (question.edited) {
                return 'question-row orange-bar';
            }
            return 'question-row green-bar';
        },
        async saveQuestion(sectionId, question) {
            let response = null
            console.log(question.key);
            if (question.key) {
                response = await client3B.question.update({
                    id: question.key,
                    text: question.text,
                    questionType: question.answerType,
                }).catch(error => errorHandler(this, error));
            } else {
                response = await client3B.question.create({
                    text: question.text,
                    questionType: question.answerType,
                    section: sectionId,
                }).catch(error => errorHandler(this, error));
            }
            if (!response) return;
            console.log(response);
            question.key = response.data.result.id;
            question.edited = false;
            this.$message.success('Evaluación guardada correctamente');
        }
    },
    computed: {
        ...mapGetters({
            format: 'format',
        }),
    },
};
</script>

<style scoped>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 0px;
  font-size: 16px;
  color: #777;
  transition: all .3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.link-delete-question {
    color: #777;
}
.link-delete-question:hover {
    color: #777;
}

.form-icon {
    color: #777;
}

.form-icon:hover {
    color: #333;
}

.add-button {
    width: 90%;
}
.add-button:hover {
    border-style: dashed;
}
.question-row {
    margin: 30px 0px;
    padding: 0px 10px;
    border-left: 3px solid #1AB394;
}
.green-bar {
    border-left: 3px solid #1AB394;
}
.orange-bar {
    border-left: 3px solid #F57B22;
}

</style>
