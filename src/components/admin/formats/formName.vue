<template>
    <a-form
        @submit="handleForm"
        :autoFormCreate="(form)=>{this.form = form}"
    >
        <a-row class="form-autoevaluation">
            <a-row class="form-tittle">
                <a-col :span="24">
                    <h1>Formato - Datos Generales</h1>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :sm="24" :md="12">
                    <a-form-item
                        label='Nombre del Formato'
                        fieldDecoratorId="name"
                        :fieldDecoratorOptions="{
                            initialValue: evaluation.name,
                            rules: [
                                {
                                    required: true,
                                    message: 'Ingresa el nombre del Formato'
                                }
                            ]
                        }"
                    >
                        <a-input
                            v-model="evaluation.name"
                        />
                    </a-form-item>
                </a-col>
                <a-col :sm="24" :md="12">
                    <a-form-item
                        label='Descripción del Formato'
                        fieldDecoratorId="description"
                        :fieldDecoratorOptions="{
                            initialValue: evaluation.description,
                            rules: [
                                {
                                    required: true,
                                    message: 'Ingresa la Descripción del Formato'
                                }
                            ]
                        }"
                    >
                        <a-input v-model="evaluation.description"/>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item
                        label='Instrucciones del Formato'
                        fieldDecoratorId="instructions"
                        :fieldDecoratorOptions="{
                            initialValue: evaluation.instructions,
                            rules: [
                                {
                                    required: true,
                                    message: 'Ingresa las instrucciones para realizar el Formato'
                                }
                            ]
                        }"
                    >
                        <a-textarea :rows="4" v-model="evaluation.instructions"/>
                    </a-form-item>
                </a-col>
                <a-col :md="6" :sm="24">
                    <a-form-item
                        fieldDecoratorId="isAutoEvaluation"
                    >
                        <a-checkbox
                            v-model="evaluation.isAutoEvaluation"
                        >
                            Auto Evaluación
                        </a-checkbox>
                    </a-form-item>
                </a-col>
                <a-col :md="6" :sm="24">
                    <a-form-item
                        fieldDecoratorId="loadPreviousObjetives"
                    >
                        <a-checkbox>
                            Cargar objetivos anteriores
                        </a-checkbox>
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
import client3B from '@/api/client3B';
import errorHandler from '@/views/errorHandler';

export default {
    props: {
        formatfetched: {
            type: Object,
            required: false,
        },
    },
    data() {
        return {
            view: {
                loading: false,
            },
            evaluation: {
                name: '',
                description: '',
                instructions: '',
                isAutoEvaluation: false,
            },
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        ...mapActions({
            nextStep: 'nextStep',
            previousStep: 'previousStep',
            updateFormatForm: 'updateFormatForm',
            setLastStep: 'setLastStep',
        }),
        loadData() {
            if (this.formatfetched) {
                this.evaluation.name = this.formatfetched.name;
                this.evaluation.description = this.formatfetched.description;
                this.evaluation.instructions = this.formatfetched.instructions;
                this.evaluation.isAutoEvaluation = this.formatfetched.isAutoEvaluation;
            }
        },
        handleForm(e) {
            e.preventDefault();
            this.form.validateFields((error) => {
                if (error) return;
                this.view.loading = true;
                if (this.formatStored.id) {
                    this.updateEvaluation();
                } else {
                    this.createEvaluation();
                }
            });
        },
        async createEvaluation() {
            const response = await client3B.format.create({
                name: this.evaluation.name,
                description: this.evaluation.description,
                instructions: this.evaluation.instructions,
                isAutoEvaluation: this.evaluation.isAutoEvaluation,
            }).catch((error) => {
                errorHandler(this, error);
            });

            this.view.loading = false;
            if (!response) return;

            this.updateFormatForm({
                id: response.data.result.id,
                name: this.evaluation.name,
                description: this.evaluation.description,
                instructions: this.evaluation.instructions,
                isAutoEvaluation: this.evaluation.isAutoEvaluation,
            });
            this.$message.success('Evaluación guardada correctamente');
            if (this.lastStep === 0) {
                this.setLastStep(1);
            } else {
                this.nextStep();
            }
        },
        async updateEvaluation() {
            const response = await client3B.format.update({
                id: this.formatStored.id,
                name: this.evaluation.name,
                description: this.evaluation.description,
                instructions: this.evaluation.instructions,
                isAutoEvaluation: this.evaluation.isAutoEvaluation,
            }).catch((error) => {
                errorHandler(this, error);
            });

            this.view.loading = false;
            if (!response) return;

            this.updateFormatForm({
                id: response.data.result.id,
                name: this.evaluation.name,
                description: this.evaluation.description,
                instructions: this.evaluation.instructions,
                isAutoEvaluation: this.evaluation.isAutoEvaluation,
            });
            this.$message.success('Evaluación guardada correctamente');
            this.nextStep();
        },
    },
    computed: {
        ...mapGetters({
            formatStored: 'format',
            lastStep: 'lastStep',
        }),
    },
};
</script>

<style scoped>

</style>
