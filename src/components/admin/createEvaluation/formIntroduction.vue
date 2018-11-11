<template>
    <a-form
        @submit="handleForm"
        :autoFormCreate="(form)=>{this.form = form}"
    >
        <a-row class="form-autoevaluation">
            <a-row class="form-tittle">
                <a-col :span="24">
                    <h1>Instrucciones</h1>
                </a-col>
            </a-row>
            <a-form-item
                label='Instrucciones de la evaluación'
                :labelCol="{ sm: 24, md: 5 }"
                :wrapperCol="{ sm: 24, md: 12 }"
                fieldDecoratorId="instructions"
                :fieldDecoratorOptions="{
                    rules: [
                        {
                            required: true,
                            message: 'Ingresa las instrucciones para realizar la evaluación'
                        }
                    ]
                }"
            >
                <a-textarea :rows="4"/>
            </a-form-item>
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
import errorHandler from '@/views/errorHandler';
import { error } from 'util';


export default {
    methods: {
        ...mapActions({
            nextStep: 'nextStep',
            previousStep: 'previousStep',
            updateEvaluationForm: 'updateEvaluationForm',
        }),
        handleForm(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                if (error) return;
                this.updateEvaluationForm({
                    instructions: values.instructions,
                });
                this.nextStep();
            });
        },
    },
};
</script>

<style scoped>

</style>
