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
                    <a @click="sectionModal.visible = true; sectionModal.value = sectionTitle;">
                        <a-icon type="edit" />
                    </a>
                </a-col>
            </a-row>
            <a-row v-for="subsection in subsections" :key="subsection.id">
                <a-row><a-col :span="24">
                    <a-checkbox
                        :checked="subsection.title.visible"
                        @change="subsection.title.visible = !subsection.title.visible"
                    >
                        <span style="font-size: 20px;" v-show="subsection.title.visible">
                            {{subsection.title.value}}
                        </span>
                        <span style="color: red;" v-show="!subsection.title.visible">
                            El título de la sección no será mostrado
                        </span>
                    </a-checkbox>
                    <a @click="subsection.showModal = true;
                        subsection.title.lastValue = subsection.title.value;"
                        v-show="subsection.title.visible"
                    >
                        <a-icon type="edit" />
                    </a>

                    <a @click="removeSubsection(subsection.id)" v-show="subsection.title.visible"
                        style="color: red; margin-left: 10px;"
                    >
                        <a-icon type="delete" />
                    </a>
                    <a-modal
                        title="Título de la  Subsección"
                        v-model="subsection.showModal"
                    >
                        <a-input
                            v-model="subsection.title.lastValue"
                            @keyup.enter.native="subsection.showModal = false;
                                subsection.title.value = subsection.title.lastValue;"
                        />
                        <template slot="footer">
                            <a-button class="" @click="subsection.showModal = false;">
                                Cancelar
                            </a-button>
                            <a-button class="btn-green" @click="subsection.showModal = false;
                                subsection.title.value = subsection.title.lastValue;"
                            >
                                Aceptar
                            </a-button>
                        </template>
                    </a-modal>
                </a-col></a-row>
                <a-row><a-col v-for="(question, indexQ) in subsection.questions" :key="question.id">
                    <a-col :md="14" :sm="24">
                        <a-form-item
                            :label="'Pregunta ' + (indexQ + 1)"
                            :fieldDecoratorId="'question-' + subsection.id + '-' + question.id"
                            style="margin: 10px 0px;"
                            :fieldDecoratorOptions="{
                                rules: [
                                    {
                                        required: true,
                                        message: 'Ingresa el texto de la pregunta'
                                    }
                                ]
                            }"
                        >
                            <a-input style="width: 95%;"
                                v-model="question.text"
                                placeholder="Escribe el texto de la pregunta"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :md="10" :sm="24">
                        <a-form-item
                            :label="'Respuesta ' + (indexQ + 1)"
                            :fieldDecoratorId="'answer-' + subsection.id + '-' + question.id"
                            style="margin: 10px 0px;"
                            :fieldDecoratorOptions="{
                                rules: [
                                    {
                                        required: true,
                                        message: 'Selecciona un tipo de respuesta'
                                    }
                                ]
                            }"
                        >
                            <a-select style="width: 90%; margin-right: 10px;"
                                v-model="question.answerType"
                                placeholder="Selecciona un tipo de respuesta"
                            >
                                <a-select-option :key="answerType.value"
                                    :value="answerType.value"
                                    v-for="answerType in answerTypes"
                                >
                                    {{answerType.label}}
                                </a-select-option>
                            </a-select>
                            <a-icon
                                class='dynamic-delete-button'
                                type='minus-circle-o'
                                @click="removeQuestion(subsection.id, question.id)"
                            />
                        </a-form-item>
                    </a-col>
                </a-col></a-row>
                <a-row><a-col :sm="24" :md="12" style="text-align: center;">
                    <a-button
                        type='dashed'
                        @click="addQuestion(subsection.id)"
                        class="add-button"
                        style="width: 50%; margin-bottom: 20px;"
                    >
                        <a-icon type='plus' /> Agregar Pregunta
                    </a-button>
                </a-col></a-row>
            </a-row>
            <a-row>
                <a-col :sm="24" :md="6" :offset="0">
                    <a-button
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
                            @click="handleSectionTitleInput">
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
                            @click="addSubsection(addSubsectionModal.value)">
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
                    Guardar y continuar
                </a-button>
                <a-button class="btn-green" htmlType='submit'
                    v-show="showFinishButton"
                    :loading="view.loading"
                    :disabled="subsections.length === 0"
                >
                    Guardar y Finalizar
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
            },
            sectionModal: {
                visible: false,
                value: '',
            },
            answerTypes: [
                {
                    label: 'Pregunta abierta',
                    value: 'open',
                },
                {
                    label: 'Múltiples respuestas abiertas',
                    value: 'multiple',
                },
                {
                    label: 'Selección de respuesta predefinida',
                    value: 'selection',
                },
                {
                    label: 'Si / No',
                    value: 'boolean',
                },
            ],
            subsectionUUID: 0,
            subsections: [],
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
        addSubsection(sectionTitle) {
            this.subsectionUUID += 1;
            this.subsections.push({
                id: this.subsectionUUID,
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
                    answerType: 'selection',
                }],
            });
            this.addSubsectionModal.visible = false;
            this.addSubsectionModal.value = '';
        },
        addQuestion(sectionId) {
            const subsection = this.subsections.find(cmpt => cmpt.id === sectionId);
            subsection.questionUUID += 1;
            subsection.questions.push({
                id: subsection.questionUUID,
                text: '',
                answerType: 'selection',
            });
        },
        removeQuestion(sectionId, questionId) {
            const subsection = this.subsections.find(cmpt => cmpt.id === sectionId);
            subsection.questions = subsection.questions.filter(qst => qst.id !== questionId);
        },
        removeSubsection(subsectionId) {
            this.subsections = this.subsections.filter(subsection =>
                subsection.id !== subsectionId);
        },
        handleSectionTitleInput() {
            this.sectionModal.visible = false;
            this.$emit('input', this.sectionModal.value);
            this.sectionModal.value = '';
        },
        handleSubsectionTitleInput() {
            this.sectionModal.visible = false;
        },
    },
    computed: {
        ...mapGetters({
            evaluationStored: 'evaluation',
        }),
    },
};
</script>

<style scoped>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all .3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.add-button {
    width: 90%;
}
.add-button:hover {
    border-style: dashed;
}
</style>
