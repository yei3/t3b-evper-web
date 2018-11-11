<template>
    <a-form
        @submit="createEvaluation"
        :autoFormCreate="(form)=>{this.form = form}"
    >
        <a-row class="form-autoevaluation">
            <a-row class="form-tittle">
                <a-col :span="24">
                    <h1>Evaluación - Datos Generales</h1>
                </a-col>
            </a-row>
            <a-row>
                <a-col :sm="24" :md="24">
                    <a-form-item
                        label='Evaluación'
                        :labelCol="{ sm: 24, md: 5 }"
                        :wrapperCol="{ sm: 24, md: 12 }"
                        fieldDecoratorId="name"
                        :fieldDecoratorOptions="{
                            rules: [
                                {
                                    required: true,
                                    message: 'Ingresa el nombre de la Evaluación'
                                }
                            ]
                        }"
                    >
                        <a-input />
                    </a-form-item>
                </a-col>
                <a-col :sm="24" :md="24">
                    <a-form-item
                        label='Descripción'
                        :labelCol="{ sm: 24, md: 5 }"
                        :wrapperCol="{ sm: 24, md: 12 }"
                        fieldDecoratorId="description"
                        :fieldDecoratorOptions="{
                            rules: [
                                {
                                    required: true,
                                    message: 'Ingresa la Descripción de la Evaluación'
                                }
                            ]
                        }"
                    >
                        <a-input />
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
        test() {
            console.log(this.form.setFieldsValue({
                name: 'asdkjashjdb',
            }));
        },
        createEvaluation(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                if (error) return;
                this.updateEvaluationForm({
                    name: values.name,
                    description: values.description,
                });
                this.nextStep();
            });
        },
    },
};
</script>

<style scoped>

</style>
