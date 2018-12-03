<template>
    <div>
        <a-row :gutter="32"  class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Crear Formato</h1>
            </a-col>
            <a-col :span="24">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-home' }"
                            class="breadcrumb-path"
                        >
                            Home Administrador
                        </router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <strong class="breadcrumb-path">Formatos</strong>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <strong class="breadcrumb-path-active"
                            v-if="!$route.params.id"
                        >
                            Crear Formato
                        </strong>
                        <strong class="breadcrumb-path-active" v-else>
                            Actualizar Formato
                        </strong>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
        </a-row>
        <div class="collapse-content"
            style="background-color: white;
            margin: 30px 30px;"
        >
            <a-row :gutter="16">
                <a-col :span="5">
                    <a-input placeholder="Formatos" />
                </a-col>
                <a-col :span="5">
                    <a-input placeholder="Región" />
                </a-col>
                <a-col :span="5">
                    <a-input placeholder="Areas" />
                </a-col>
                <a-col :span="4">
                    <a-date-picker placeholder="Fecha Inicio" />
                </a-col>
                <a-col :span="4">
                    <a-date-picker placeholder="Fecha Fin" />
                </a-col>
            </a-row>
            
        </div>
        <a-modal
            title="Agregar Nueva Sección"
            v-model="view.sectionModal.show"
        >
            <a-input
                v-model="view.sectionModal.value"
                @keyup.enter.native="addSection"
            />
            <template slot="footer">
                <a-button key="back" @click="cancelAddSection">Cancelar</a-button>
                <a-button key="submit" class="btn-green" @click="addSection">
                    Agregar
                </a-button>
            </template>
        </a-modal>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import formName from '@/components/admin/formats/formName.vue';
import formGeneric from '@/components/admin/formats/formGeneric.vue';
import client3B from '@/api/client3B';
import errorHandler from '@/views/errorHandler';

export default {
    components: {
        formName,
        formGeneric,
    },
    created() {
        this.fetchData();
    },
    watch: {
        $route: 'fetchData',
    },
    data() {
        return {
            view: {
                activeSection: 0,
                sectionModal: {
                    show: false,
                    error: null,
                    value: '',
                },
                stepsUUID: 2,
                steps: [
                    {
                        id: 0,
                        label: 'Nombre del Formato',
                        name: 'name',
                    },
                ],
            },
        };
    },
    methods: {
        ...mapActions({
            nextStep: 'nextStep',
            previousStep: 'previousStep',
            setStep: 'setStep',
            setLastStep: 'setLastStep',
        }),
        addSection() {
            const step = {
                id: this.view.stepsUUID,
                label: this.view.sectionModal.value,
                name: this.view.sectionModal.value.replace(/ /g, ''),
            };
            this.view.steps.push(step);
            this.view.stepsUUID += 1;
            this.cancelAddSection();
            // this.setStep(this.view.steps.length - 1);
            // this.setLastStep(this.view.steps.length - 1);
        },
        cancelAddSection() {
            this.view.sectionModal.show = false;
            this.view.sectionModal.value = '';
        },
        deleteSection(sectionStep) {
            let step = -1;
            this.view.steps = this.view.steps.filter(() => {
                step += 1;
                return sectionStep !== step;
            });
            this.setStep(this.view.steps.length - 1);
            this.view.activeSection = this.view.steps[this.view.steps.length - 1].id;
        },
        async fetchData() {
            if (!this.$route.params.id) return;
            const response = await client3B.format.get(this.$route.params.id)
                .catch(error => errorHandler(error));
            if (!response) return;

            const format = response.data.result;
            this.formatId = format.id;
            console.log(format);
            format.sections.forEach((section) => {
                this.view.steps.push({
                    id: this.view.stepsUUID,
                    label: section.name,
                    name: section.name,
                });
                this.view.stepsUUID += 1;
            });

            this.setLastStep(this.view.steps.length - 1);
        },
    },
    computed: {
        ...mapGetters({
            currentStep: 'currentStepEvaluation',
            lastStep: 'lastStepEvaluation',
            format: 'format',
        }),
        dinamicSteps() {
            return this.view.steps.slice(1);
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
