<template>
    <a-form @submit="handleForm" :autoFormCreate="(form)=>{this.form = form}">
        <a-row class="form-autoevaluation">
            <a-row class="form-tittle">
                <a-col :span="24">
                    <h1>{{sectionTitle}}</h1>
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
                    <a @click="subsection.showModal = true" v-show="subsection.title.visible">
                        Editar
                    </a>
                    <a-modal
                        title="Editar nombre de la Sección"
                        v-model="subsection.showModal"
                    >
                        <a-input  v-model="subsection.title.value"/>
                        <template slot="footer">
                            <a-button class="btn-green" @click="subsection.showModal = false">
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
                            :labelCol="{ md: 5, sm: 24 }"
                            :wrapperCol="{ md: 19, sm: 24 }"
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
                                v-model="question.label"
                                placeholder="Escribe el texto de la pregunta"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :md="10" :sm="24">
                        <a-form-item
                            :label="'Respuesta ' + (indexQ + 1)"
                            :fieldDecoratorId="'answer-' + subsection.id + '-' + question.id"
                            :labelCol="{ md: 5, sm: 24 }"
                            :wrapperCol="{ md: 19, sm: 24 }"
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
                        title="Agregar nueva subsección"
                        v-model="addSubsectionModal.visible"
                    >
                        <a-input  v-model="addSubsectionModal.value"/>
                        <template slot="footer">
                            <a-button @click="addSubsectionModal.visible = false;
                                addSubsectionModal.value = '';">
                                Cancelar
                            </a-button>
                            <a-button class="btn-green"
                                @click="addSection(addSubsectionModal.value)">
                                Aceptar
                            </a-button>
                        </template>
                    </a-modal>
            </a-row>
        </a-row>
        <a-row style="margin-bottom: 20px;">
            <a-col :span="24" style="text-align: right;">
                <a-button @click="previousStep" :disabled="true"
                    class="btn-green"
                    style="margin-right: 15px;"
                >
                    Anterior
                </a-button>
                <a-button class="btn-green" htmlType='submit'>
                    Guardar y continuar
                </a-button>
                <a-button class="btn-green" @click="printData">
                    Data
                </a-button>
            </a-col>
        </a-row>
    </a-form>
</template>

<script>
import { mapActions } from 'vuex';
// import errorHandler from '@/views/errorHandler';

export default {
    props: {
        sectionTitle: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            addSubsectionModal: {
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
            ],
            subsectionUUID: 0,
            subsections: [
                /*
                {
                    id: 0,
                    showModal: false,
                    title: {
                        visible: true,
                        value: 'Subsection title',
                    },
                    questionUUID: 0,
                    questions: [{
                        id: 0,
                        label: '',
                        answerType: 'selection',
                    }],
                }
                */
            ],
        };
    },
    methods: {
        ...mapActions({
            nextStep: 'nextStep',
            previousStep: 'previousStep',
            updateEvaluationForm: 'updateEvaluationForm',
        }),
        saveObjectives(formValues) {
            console.log(formValues);
            /*
            const questions = [];
            const keys = Object.keys(formValues);
            for (let i = 0; i < keys.length; i += 2) {
                questions.push({
                    id: i,
                    question: formValues[keys[i]],
                    deliverable: formValues[keys[i + 1]],
                });
            }
            this.updateEvaluationForm({
                questions,
            });
            */
            this.nextStep();
        },
        handleForm(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                if (error) return;
                this.saveObjectives(values);
            });
        },
        addSection(sectionTitle) {
            this.subsectionUUID += 1;
            this.subsections.push({
                id: this.subsectionUUID,
                showModal: false,
                title: {
                    visible: true,
                    value: sectionTitle,
                },
                questionUUID: 0,
                questions: [{
                    id: 0,
                    label: '',
                    answerType: 'selection',
                }],
            });
            this.addSubsectionModal.visible = false;
            this.addSubsectionModal.value = '';
            console.log(JSON.parse(JSON.stringify(this.subsections)));
        },
        addQuestion(sectionId) {
            const subsection = this.subsections.find(cmpt => cmpt.id === sectionId);
            subsection.questionUUID += 1;
            subsection.questions.push({
                id: subsection.questionUUID,
                label: '',
                answerType: 'selection',
            });
        },
        removeQuestion(sectionId, questionId) {
            const subsection = this.subsections.find(cmpt => cmpt.id === sectionId);
            subsection.questions = subsection.questions.filter(qst => qst.id !== questionId);
        },
        removeSection(sectionId) {
            this.subsections = this.subsections.filter(subsection => subsection.id !== sectionId);
        },
        printData() {
            console.log(JSON.stringify(this.subsections));
        },
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
