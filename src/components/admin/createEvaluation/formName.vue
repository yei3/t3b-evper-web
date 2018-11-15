<template>
    <a-form
        @submit="handleForm"
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
                        <a-input v-model="evaluation.name"/>
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
                        <a-input v-model="evaluation.description"/>
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
                <a-button htmlType='submit' class="btn-green" :loading="view.loading">
                    Guardar y continuar
                </a-button>
            </a-col>
        </a-row>
    </a-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import authService from '@/services/auth';
import client3B from '@/api/client3B';
import errorHandler from '@/views/errorHandler';

export default {
    data() {
        return {
            view: {
                loading: false,
            },
            evaluation: {
                name: '',
                description: '',
            },
        };
    },
    methods: {
        ...mapActions({
            nextStep: 'nextStep',
            previousStep: 'previousStep',
            updateEvaluationStored: 'updateEvaluationForm',
        }),
        handleForm(e) {
            e.preventDefault();
            this.form.validateFields((error) => {
                if (error) return;
                this.view.loading = true;
                if (this.evaluationStored.id) {
                    this.updateEvaluation();
                } else {
                    this.createEvaluation();
                }
            });
        },
        async createEvaluation() {
            const user = authService.getUserData();
            const response = await client3B.evaluation.create({
                evaluatorUserId: user.id,
                term: 1,
                name: this.evaluation.name,
                description: this.evaluation.description,
            }).catch((error) => {
                errorHandler(this, error);
            });

            this.view.loading = false;
            if (!response) return;

            this.updateEvaluationStored({
                id: response.data.result.id,
                name: this.evaluation.name,
                description: this.evaluation.description,
            });
            this.$message.success('Evaluación guardada correctamente');
            this.nextStep();
        },
        async updateEvaluation() {
            const user = authService.getUserData();
            const response = await client3B.evaluation.update({
                id: this.evaluationStored.id,
                evaluatorUserId: user.id,
                term: 1,
                name: this.evaluation.name,
                description: this.evaluation.description,
            }).catch((error) => {
                errorHandler(this, error);
            });

            this.view.loading = false;
            if (!response) return;

            this.updateEvaluationStored({
                id: response.data.result.id,
                name: this.evaluation.name,
                description: this.evaluation.description,
            });
            this.$message.success('Evaluación guardada correctamente');
            this.nextStep();
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

</style>
