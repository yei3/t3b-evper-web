<template>
    <a-form
        @submit="handleForm"
        :autoFormCreate="(form)=>{this.form = form}"
    >
        <a-row class="form-autoevaluation">
            <a-row class="form-tittle">
                <a-col :span="24">
                    <h1>Plan de Desarrollo</h1>
                </a-col>
            </a-row>
            <a-row >
                <a-col :sm="24" :md="24">
                    <a-form-item
                        label="Descripción de la sección de Plan de Desarrollo"
                        fieldDecoratorId="description"
                        style="margin-bottom: 0px;"
                        :fieldDecoratorOptions="{
                            rules: [
                                {
                                    required: true,
                                message: 'Ingresa la descripción la sección de Plan de Desarrollo'
                                }
                            ]
                        }"
                    >
                        <a-textarea

                        />
                    </a-form-item>
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
    methods: {
        ...mapActions({
            nextStep: 'nextStep',
            previousStep: 'previousStep',
            updateEvaluationForm: 'updateEvaluationForm',
        }),
        saveStrengths(formValues) {
            this.updateEvaluationForm({
                developmentPlanDescription: formValues.description,
            });
            this.nextStep();
        },
        handleForm(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                if (error) return;
                this.saveStrengths(values);
            });
        },
    },
};
</script>

<style scoped>
</style>
