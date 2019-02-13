<template>
    <div>
        <a-row class="form-autoevaluation">
            <a-row class="form-tittle">
                <a-col :span="24" style="margin-bottom: 20px">
                    <span style="font-size: 26px;
                        font-weight: 100;"
                    >
                        {{sectionTitle}} <small style="font-size: 15px;">
                            {{sectionPercent$}}%
                        </small>
                    </span>
                    <a-tooltip placement="top" title="Editar Título o Porcentaje">
                        <a @click="sectionModal.visible = true;
                                   sectionModal.value = sectionTitle;
                                   sectionModal.percent = sectionPercent$"
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
                    <a-tooltip placement="top" title="Eliminar">
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
                    <a-modal title="Título de la Subsección" v-model="subsection.showModal">
                        <a-input placeholder="Título de la subsección"
                            v-model="subsection.title.lastValue"
                            addonBefore="Nombre"
                            @keyup.enter.native="updateSubsection(subsection)"
                        />
                        <template slot="footer">
                            <a-row>
                                <a-col :span="12" style="text-align: left;">
                                    <a-button class="" @click="subsection.showModal = false;">
                                        Cancelar
                                    </a-button>
                                </a-col>
                                <a-col :span="12" style="text-align: right;">
                                    <a-button class="btn-green"
                                        @click="updateSubsection(subsection)"
                                        :loading="subsection.loading"
                                    >
                                        Aceptar
                                    </a-button>
                                </a-col>
                            </a-row>
                        </template>
                    </a-modal>
                </a-col></a-row>
                <a-row><a-col v-for="question in subsection.questions"
                    :key="question.id"
                    :class="getQuestionStatus(question)"
                ><a-form @submit="handleForm" :autoFormCreate="(form)=>{question.form = form}">

                    <a-form-item
                        :fieldDecoratorId="'question-' + subsection.id + '-' + question.id"
                        style="margin: 10px 0px;"
                        label='Pregunta'
                        :labelCol="{ xxl: 5, xl: 8, lg: 10, md: 24, sm: 24 }"
                        :wrapperCol="{ xxl: 19, xl: 14, lg: 14, md: 24, sm: 24 }"
                        :fieldDecoratorOptions="{
                            initialValue: question.text,
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
                            @change="setQuestionAsModify(question)"
                            :disabled="question.answerType === 5"
                        />
                    </a-form-item>

                    <a-form-item
                        :fieldDecoratorId="'answer-' + subsection.id + '-' + question.id"
                        style="margin: 10px 0px;"
                        label='Tipo de Respuesta'
                        :labelCol="{ xxl: 5, xl: 8, lg: 10, md: 24, sm: 24 }"
                        :wrapperCol="{ xxl: 19, xl: 14, lg: 14, md: 24, sm: 24 }"
                        :fieldDecoratorOptions="{
                            initialValue: question.answerType,
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
                            @select="(value) => {
                                setQuestionAsModify(question);
                                if (value === 5) {
                                    question.text = 'Pregunta tipo Acción';
                                } else if (question.text === 'Pregunta tipo Acción') {
                                    question.text = '';
                                }
                            }"
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
                        v-if="question.answerType === 3"
                        :fieldDecoratorId="'expectedValue-' + subsection.id + '-' + question.id"
                        style="margin: 10px 0px;"
                        label='Valor del Objetivo'
                        :labelCol="{ xxl: 5, xl: 8, lg: 10, md: 24, sm: 24 }"
                        :wrapperCol="{ xxl: 19, xl: 14, lg: 14, md: 24, sm: 24 }"
                        :fieldDecoratorOptions="{
                            initialValue: question.expectedValue,
                            rules: [
                                {
                                    required: true,
                                    message: 'Ingresa el valor del objetivo'
                                }
                            ]
                        }"
                    >
                        <a-input style=""
                            type="text"
                            v-model="question.expectedValue"
                            placeholder="Valor del Objetivo"
                            @change="setQuestionAsModify(question)"
                        />
                    </a-form-item>
                    <a-form-item
                        v-if="question.answerType === 3"
                        label='Relación de aprobación del objetivo'
                        :fieldDecoratorId="`approvalRship-${subsection.id}-${question.id}`"
                        style="margin: 10px 0px;"
                        :labelCol="{ xxl: 5, xl: 8, lg: 10, md: 24, sm: 24 }"
                        :wrapperCol="{ xxl: 19, xl: 14, lg: 14, md: 24, sm: 24 }"
                        :fieldDecoratorOptions="{
                            initialValue: question.approvalRelationship,
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
                            @select="setQuestionAsModify(question)"
                        >
                            <a-select-option v-for="(item, index) in objectiveRelationships"
                                :key="index"
                                :value="item.value"
                            >
                                {{item.label}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-col :sm="24" :md="24" style="text-align: center; margin-top: 10px;">
                        <a-switch :checked="question.qualifiable"
                            @change='question.qualifiable = !question.qualifiable;
                                     setQuestionAsModify(question);'
                            size="small"
                            :disabled="question.loading"
                        /> Calificable
                        <a @click="removeQuestion(subsection.key, question)"
                            class="link-delete-question form-icon"
                            style="padding-right: 2%; padding-left: 4%;"
                            :disabled="question.loading"
                        >
                            <a-icon
                                class='dynamic-delete-button form-icon'
                                type="delete"
                            /> Eliminar
                        </a>
                        <a @click="saveQuestion(subsection.key, question)"
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
                    <a-divider />
                </a-form></a-col></a-row>
                <a-row><a-col :md="24" style="text-align: center;">
                    <a-button
                        type='dashed'
                        @click="addQuestion(subsection.key)"
                        class="add-button"
                        style="min-width: 200px; width: 300px; margin: 15px 0px 40px 0px;"
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
                    <a-input v-model="sectionModal.value"
                        addonBefore="Título"
                        @keyup.enter.native="handleSectionTitleInput"
                    />
                    <a-input v-model="sectionModal.percent"
                        type="number"
                        style="margin-top: 20px;"
                        addonBefore="Porcentaje"
                        addonAfter="%"
                        placeholder="0 a 100"
                        min="1"
                        max="100"
                        @keyup.enter.native="handleSectionTitleInput"
                    />
                    <template slot="footer">
                        <a-row>
                            <a-col :span="12" style="text-align: left;">
                                <a-button @click="sectionModal.visible = false;
                                    sectionModal.value = '';">
                                    Cancelar
                                </a-button>
                            </a-col>
                            <a-col :span="12" style="text-align: right;">
                                <a-button class="btn-green"
                                    @click="handleSectionTitleInput"
                                    :loading="sectionModal.loading"
                                >
                                    Aceptar
                                </a-button>
                            </a-col>
                        </a-row>
                    </template>
                </a-modal>
                <a-modal
                    title="Agregar nueva subsección"
                    v-model="addSubsectionModal.visible"
                >
                    <a-input
                        addonBefore="Título"
                        v-model="addSubsectionModal.value"
                        @keyup.enter.native="addSubsection(addSubsectionModal.value)"
                    />
                    <template slot="footer">
                        <a-row>
                            <a-col :span="12" style="text-align: left;">
                                <a-button @click="addSubsectionModal.visible = false;
                                    addSubsectionModal.value = '';">
                                    Cancelar
                                </a-button>
                            </a-col>
                            <a-col :span="12" style="text-align: right;">
                                <a-button class="btn-green"
                                    @click="addSubsection(addSubsectionModal.value)"
                                    :loading="addSubsectionModal.loading"
                                >
                                    Aceptar
                                </a-button>
                            </a-col>
                        </a-row>
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
                    @click="nextStep"
                >
                    Siguiente
                </a-button>
                <a-button class="btn-green" htmlType='submit'
                    v-show="showFinishButton"
                    :loading="view.loading"
                    :disabled="subsections.length === 0"
                    @click="$router.push({ name: 'home' })"
                >
                    Finalizar
                </a-button>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import client3B from '@/api/client3B';
import { answerTypes } from '@/modules/evaluation';
import errorHandler from '@/views/errorHandler';
import { setTimeout } from 'timers';

export default {
    props: {
        subsectionsFetched: {
            type: Array,
            required: false,
        },
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
        sectionPercent: {
            type: Number,
            required: true,
        },
    },
    model: {
        prop: 'sectionTitle',
        event: 'input',
    },
    data() {
        return {
            sectionPercent$: 0,
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
                percent: 0,
            },
            answerTypes,
            subsectionUUID: 0,
            subsections: [],
            objectiveRelationships: [
                {
                    value: 1,
                    label: 'El valor real debe ser menor al del objetivo',
                },
                {
                    value: 2,
                    label: 'El valor real debe ser menor o igual al del objetivo',
                },
                {
                    value: 3,
                    label: 'El valor real debe ser igual al del objetivo',
                },
                {
                    value: 5,
                    label: 'El valor real debe ser mayor o igual al del objetivo',
                },
                {
                    value: 4,
                    label: 'El valor real debe ser mayor al del objetivo',
                },
            ],
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        ...mapActions({
            nextStep: 'nextStep',
            previousStep: 'previousStep',
            updateEvaluationForm: 'updateEvaluationForm',
        }),
        loadData() {
            this.sectionPercent$ = this.sectionPercent;
            if (this.subsectionsFetched) {
                this.subsections = this.subsectionsFetched.map(subs => ({
                    id: subs.id,
                    key: subs.id,
                    loading: false,
                    showModal: false,
                    title: {
                        visible: subs.displayName,
                        value: subs.name,
                        lastValue: subs.name,
                    },
                    questionUUID: -1000,
                    questions: [
                        ...subs.unmeasuredQuestions.map(qst => ({
                            id: qst.id,
                            key: qst.id,
                            text: qst.text,
                            loading: false,
                            answerType: qst.questionType,
                            lastAnswerType: qst.questionType,
                            edited: false,
                            qualifiable: qst.isQualifiable,
                        })),
                        ...subs.measuredQuestions.map(qst => ({
                            id: qst.id,
                            key: qst.id,
                            text: qst.text,
                            loading: false,
                            answerType: qst.questionType,
                            lastAnswerType: qst.questionType,
                            edited: false,
                            approvalRelationship: qst.relation,
                            expectedValue: qst.expectedText || qst.expected,
                            qualifiable: qst.isQualifiable,
                        })),
                    ],
                }));
            }
        },
        handleForm(e) {
            e.preventDefault();
        },
        async addSubsection(sectionTitle) {
            this.addSubsectionModal.loading = true;
            const response = await client3B.section.create({
                name: sectionTitle,
                evaluationTemplateId: this.format.id,
                displayName: true,
                parentId: this.sectionId,
            }).catch(error => errorHandler(this, error));
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
                    loading: false,
                    answerType: null,
                    lastAnswerType: null,
                    edited: true,
                    qualifiable: true,
                }],
            });
            this.addSubsectionModal.visible = false;
            this.addSubsectionModal.value = '';
            this.addSubsectionModal.loading = false;
        },
        async updateSubsection(_subsection) {
            const subsection = _subsection;
            subsection.loading = true;
            const response = await client3B.section.update({
                id: subsection.key,
                name: subsection.title.lastValue,
                displayName: subsection.title.visible,
                evaluationTemplateId: this.format.id,
                parentId: this.sectionId,
            }).catch(error => errorHandler(this, error));
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
            const subsection = this.subsections.find(cmpt => cmpt.key === sectionId);
            subsection.questionUUID += 1;
            subsection.questions.push({
                id: subsection.questionUUID,
                key: null,
                text: '',
                loading: false,
                answerType: null,
                lastAnswerType: null,
                edited: true,
                qualifiable: true,
            });
        },
        async removeQuestion(sectionId, _question) {
            const question = _question;
            question.loading = true;
            if (question.key) {
                await this.deleteQuestion(sectionId, question);
            }
            const subsection = this.subsections.find(cmpt => cmpt.key === sectionId);
            subsection.questions = subsection.questions.filter(qst => qst.key !== question.key);
            this.$message.success('Evaluación guardada correctamente');
            if (!subsection.questions.length) {
                setTimeout(() => {
                    this.addQuestion(sectionId);
                }, 500);
            }
        },
        async removeSubsection(_subsection) {
            const subsection = _subsection;
            subsection.loading = true;
            const response = await client3B.section.delete({
                id: subsection.key,
            }).catch(error => errorHandler(this, error));
            if (!response) {
                subsection.loading = false;
                return;
            }
            this.subsections = this.subsections.filter(sbt => sbt.id !== subsection.id);
            subsection.loading = false;
        },
        async handleSectionTitleInput() {
            this.sectionModal.loading = true;
            const response = await client3B.section.update({
                id: this.sectionId,
                evaluationTemplateId: this.format.id,
                name: this.sectionModal.value,
                value: this.sectionModal.percent,
            }).catch(error => errorHandler(this, error));
            if (!response) {
                this.sectionModal.loading = false;
                return;
            }

            this.sectionModal.visible = false;
            this.$emit('input', this.sectionModal.value);
            this.sectionPercent$ = this.sectionModal.percent;
            this.sectionModal.value = '';
            this.sectionModal.percent = '';
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
        setQuestionAsModify(_question) {
            const question = _question;
            question.edited = true;
        },
        async saveQuestion(sectionId, _question) {
            const question = _question;
            let validForm = true;
            question.form.validateFields((error) => {
                if (error) validForm = false;
            });
            if (!validForm) return;

            question.loading = true;
            let response = null;
            const data = {
                text: question.text,
                questionType: question.answerType,
                sectionId,
                relation: question.approvalRelationship,
                isQualifiable: question.qualifiable,
            };

            // Verificar si es texto
            if (question.answerType === 3) { // Es tipo objetivo
                if (Number.isNaN(Number(question.expectedValue)) && data.relation === 3) {
                    data.expectedText = question.expectedValue;
                } else if (Number.isNaN(Number(question.expectedValue))) {
                    const msg = 'Los Objetivos tipo texto solo son permitidos con la relación de igualdad';
                    errorHandler(this, msg);
                    question.loading = false;
                    return;
                } else {
                    data.expected = question.expectedValue;
                }
            }

            if (question.key) {
                await this.deleteQuestion(sectionId, question);
                question.key = null;
            }

            response = await client3B.question.create(data, {
                objective: question.answerType === 3,
            }).catch(error => errorHandler(this, error));

            if (!response) {
                question.loading = false;
                return;
            }

            question.key = response.data.result.id;
            question.edited = false;
            question.lastAnswerType = question.answerType;
            this.$message.success('Evaluación guardada correctamente');
            question.loading = false;
        },
        async deleteQuestion(sectionId, question) {
            await client3B.question.delete({
                id: question.key,
            }, { objective: question.lastAnswerType === 3 })
                .catch(error => errorHandler(this, error));
        },
    },
    computed: {
        ...mapGetters({
            format: 'format',
        }),
    },
};
</script>

<style src="@/assets/styles/evaluationForm.css" scoped></style>
