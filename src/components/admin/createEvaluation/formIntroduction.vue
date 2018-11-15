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
                <a-textarea :rows="4" v-model="evaluation.instructions"/>
            </a-form-item>
        </a-row>
        <a-row style="margin-bottom: 20px;">
            <a-col :span="24" style="text-align: right;">
                <a-button @click="previousStep"
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
import client3B from '@/api/client3B';
import errorHandler from '@/views/errorHandler';

export default {
    data() {
        return {
            view: {
                loading: false,
            },
            evaluation: {
                instructions: '',
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
                this.addInstructions();
            });
        },
        async addInstructions() {
            const response = await client3B.evaluation.addInstructions({
                id: this.evaluationStored.id,
                instructions: this.evaluation.instructions,
            }).catch((error) => {
                errorHandler(this, error);
            });

            this.view.loading = false;
            if (!response) return;

            this.updateEvaluationForm({
                instructions: this.evaluation.instructions,
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
