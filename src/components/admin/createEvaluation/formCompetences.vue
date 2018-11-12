<template>
    <a-form
        @submit="handleForm"
        :autoFormCreate="(form)=>{this.form = form}"
    >
        <a-row class="form-autoevaluation">
            <a-row class="form-tittle">
                <a-col :span="24">
                    <h1>Evaluación de Competencias</h1>
                </a-col>
            </a-row>
            <a-row v-for="(competence, indexC) in competences" :key="competence.id">
                <a-form-item
                    :label="'Competencia ' + (indexC + 1)"
                    :labelCol="{ sm: 24, md: 3 }"
                    :wrapperCol="{ sm: 24, md: 12 }"
                    :fieldDecoratorId="'competence-' + competence.id"
                    style="margin-bottom: 0px;"
                    :fieldDecoratorOptions="{
                        rules: [
                            {
                                required: true,
                                message: 'Ingresa la descripción de la competencia'
                            }
                        ]
                    }"
                >
                    <a-input style="width: 90%; marginRight: 8px"/>
                    <a-icon
                        class='dynamic-delete-button'
                        type='minus-circle-o'
                        @click="removeSectionField(competence.id)"
                    />
                </a-form-item>

                <a-row
                    :key="question.id"
                    v-for="(question, indexQ) in competence.questions"
                >
                    <a-col :sm="24" :md="24">
                        <a-form-item
                            :label="'Pregunta ' + (indexQ + 1)"
                            :labelCol="{ sm: 24, md: 4 }"
                            :wrapperCol="{ sm: 24, md: 12 }"
                            :fieldDecoratorId="'question-' + competence.id + '-' + question.id"
                            style="margin-bottom: 0px;"
                            :fieldDecoratorOptions="{
                                rules: [
                                    {
                                        required: true,
                                        message: 'Ingresa una pregunta de la sección'
                                    }
                                ]
                            }"
                        >
                            <a-input style="width: 90%; marginRight: 8px"/>
                            <a-icon
                                class='dynamic-delete-button'
                                type='minus-circle-o'
                                @click="removeQuestionField(competence.id, question.id)"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col :sm="24" :md="12" :offset="4">
                        <a-button
                            style="margin-bottom: 24px;"
                            type='dashed'
                            @click="addQuestionField(competence.id)"
                            class="add-button">
                            <a-icon type='plus' /> Agregar Pregunta
                        </a-button>
                    </a-col>
                </a-row>
            </a-row>
            <a-row>
                <a-col :sm="24" :md="12" :offset="3">
                    <a-button
                        type='dashed'
                        @click="addSectionField"
                        class="add-button">
                        <a-icon type='plus' /> Agregar Sección
                    </a-button>
                </a-col>
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
                <a-button htmlType='submit' class="btn-green">
                    Guardar y continuar
                </a-button>
            </a-col>
        </a-row>
    </a-form>
</template>

<script>
import { mapActions } from 'vuex';
// import errorHandler from '@/views/errorHandler';

export default {
    data() {
        return {
            uuid: 0,
            competences: [{
                id: 0,
                uuid: 0,
                questions: [{ id: 0 }],
            }],
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
            this.nextStep();
            */
        },
        handleForm(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                if (error) return;
                this.saveObjectives(values);
            });
        },
        addSectionField() {
            this.uuid += 1;
            this.competences.push({
                id: this.uuid,
                uuid: 0,
                questions: [{ id: 0 }],
            });
            console.log(JSON.parse(JSON.stringify(this.competences)));
        },
        addQuestionField(sectionId) {
            const competence = this.competences.find(cmpt => cmpt.id === sectionId);
            competence.uuid += 1;
            competence.questions.push({
                id: competence.uuid,
            });
            console.log(JSON.parse(JSON.stringify(this.competences)));
        },
        removeQuestionField(sectionId, questionId) {
            const competence = this.competences.find(cmpt => cmpt.id === sectionId);
            competence.questions = competence.questions.filter(qst => qst.id !== questionId);
        },
        removeSectionField(sectionId) {
            this.competences = this.competences.filter(competence => competence.id !== sectionId);
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
