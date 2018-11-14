<template>
    <a-form
        @submit="handleForm"
        :autoFormCreate="(form)=>{this.form = form}"
    >
        <a-row class="form-autoevaluation">
            <a-row class="form-tittle">
                <a-col :span="24">
                    <h1>Objetivos del siguiente periodo</h1>
                </a-col>
            </a-row>
            <a-row
                :key="objective.id"
                v-for="(objective, index) in objectives"
            >
                <a-col :sm="24" :md="24">
                    <a-form-item
                        :label="'Objetivo ' + (index + 1)"
                        :labelCol="{ sm: 24, md: 3 }"
                        :wrapperCol="{ sm: 24, md: 20 }"
                        :fieldDecoratorId="'objective-' + objective.id"
                        style="margin-bottom: 0px;"
                        :fieldDecoratorOptions="{
                            rules: [
                                {
                                    required: true,
                                    message: 'Ingresa la descripción del objetivo'
                                }
                            ]
                        }"
                    >
                        <a-input style="width: 90%; marginRight: 8px"/>
                        <a-icon
                            class='dynamic-delete-button'
                            type='minus-circle-o'
                            @click="removeObjectiveField(objective.id)"
                        />
                    </a-form-item>
                </a-col>
                <a-col :sm="24" :md="24">
                    <a-form-item
                        style="margin-bottom: 0px;"
                        :label="'Entregable ' + (index + 1)"
                        :labelCol="{ sm: 24, md: 3 }"
                        :wrapperCol="{ sm: 24, md: 20 }"
                        :fieldDecoratorId="'deliverable-' + objective.id"
                        :fieldDecoratorOptions="{
                            rules: [
                                {
                                    required: true,
                                    message: 'Ingresa el entregable del objetivo'
                                }
                            ]
                        }"
                    >
                        <a-input style="width: 90%; marginRight: 8px"/>
                    </a-form-item>
                </a-col>
                <a-col :sm="24" :md="24">
                    <a-form-item
                        :label="'Fecha ' + (index + 1)"
                        :labelCol="{ sm: 24, md: 3 }"
                        :wrapperCol="{ sm: 24, md: 20 }"
                        :fieldDecoratorId="'date-' + objective.id"
                        :fieldDecoratorOptions="{
                            rules: [
                                {
                                    required: true,
                                    message: 'Ingresa la fecha del Objetivo'
                                }
                            ]
                        }"
                    >
                        <a-date-picker />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col :sm="24" :md="20" :offset="3">
                    <a-button
                        type='dashed'
                        @click="addObjectiveField"
                        class="add-button">
                        <a-icon type='plus' /> Agregar Objetivo
                    </a-button>
                </a-col>
            </a-row>
        </a-row>
        <a-row style="margin-bottom: 20px;">
            <a-col :span="24" style="text-align: right;">
                <a-button @click="previousStep"
                    class="btn-green"
                    style="margin-right: 15px;"
                >
                    Anterior
                </a-button>
                <a-button htmlType='submit' class="btn-green">
                    Guardar y Finalizar
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
            objectives: [{ id: 0 }],
        };
    },
    methods: {
        ...mapActions({
            nextStep: 'nextStep',
            previousStep: 'previousStep',
            updateEvaluationForm: 'updateEvaluationForm',
        }),
        saveObjectives(formValues) {
            const objectives = [];
            const keys = Object.keys(formValues);
            for (let i = 0; i < keys.length; i += 3) {
                objectives.push({
                    id: i,
                    objective: formValues[keys[i]],
                    deliverable: formValues[keys[i + 1]],
                    date: formValues[keys[i + 2]],
                });
            }
            this.updateEvaluationForm({
                objectives,
            });
            // this.nextStep();
            this.$router.push({ name: 'home' });
        },
        handleForm(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                if (error) return;
                this.saveObjectives(values);
            });
        },
        formValues() {
            console.log(this.form.getFieldsValue());
        },
        addObjectiveField() {
            this.uuid += 1;
            this.objectives.push({
                id: this.uuid,
            });
        },
        removeObjectiveField(id) {
            this.objectives = this.objectives.filter(objetive => objetive.id !== id);
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
