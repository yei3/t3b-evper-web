<template>
    <div id="printReport">
        <a-row class="breadcrumb-wrapper">
            <a-row :gutter="32">
                <a-col :h2="24">
                    <h1 class="breadcrumb-header">
                        Resultados de Evaluación | Análisis Comparativo
                    </h1>
                </a-col>
            </a-row>
            <a-row :gutter="32">
                <a-col :span="21">
                    <a-breadcrumb>
                        <a-breadcrumb-item>
                            <router-link :to="{ name: 'admin-reports' }" class="breadcrumb-path"
                                >Resultados</router-link
                            >
                        </a-breadcrumb-item>
                    </a-breadcrumb>
                </a-col>
                <a-col :span="3">
                    <a-button
                        class="btn-blue"
                        @click="print"
                        :disabled="!filterFormReady || !chartComponetsReady"
                    >
                        <a-icon type="printer" />Imprimir
                    </a-button>
                </a-col>
            </a-row>
        </a-row>
        <filter-form :loading="!chartComponetsReady" @updatedForm="$event => getReport($event)"/>
        <div
            v-if="filterFormReady"
            class="collapse-content"
            style="background-color: white; margin: 30px 30px;"
        >
            <h3 class="breadcrumb-header">Información de evaluados</h3>
            <a-row>
                <a-col class="results-info" :xl="12" :lg="12" :xs="24">
                    <employee-information
                        v-if="filterFormReady"
                        :queryData="filterFormData.left"
                        @ready="chartComponetsStatus.employeeInformationReadyL = true"
                    />
                </a-col>
                <a-col class="results-info" :xl="12" :lg="12" :xs="24">
                    <employee-information
                        v-if="filterFormReady"
                        :queryData="filterFormData.right"
                        @ready="chartComponetsStatus.employeeInformationReadyR = true"
                    />
                </a-col>
            </a-row>
        </div>
        <div
            v-if="filterFormReady"
            class="collapse-content"
            style="background-color: white; margin: 30px 30px;"
        >
            <h3 class="breadcrumb-header">Objetivos Evaluados</h3>
            <a-row>
                <a-col :span="12" class="text-center">
                    <objectives
                        :queryData="filterFormData.left"
                        title="Reporte de Objetivos A"
                        @ready="chartComponetsStatus.objectivesReadyL = true"
                    />
                </a-col>
                <a-col :span="12" class="text-center">
                    <objectives
                        :queryData="filterFormData.right"
                        title="Reporte de Objetivos B"
                        @ready="chartComponetsStatus.objectivesReadyR = true"
                    />
                </a-col>
            </a-row>
        </div>
        <div
            v-if="filterFormReady"
            class="collapse-content"
            style="background-color: white; margin: 30px 30px;"
        >
            <h3 class="breadcrumb-header">Competencias Evaluadas</h3>
            <a-row>
                <a-col :sm="24" :md="12">
                    <competences
                        :queryData="filterFormData.left"
                        @ready="chartComponetsStatus.competencesReadyL = true"
                    />
                </a-col>
                <a-col :sm="24" :md="12">
                    <competences
                        :queryData="filterFormData.right"
                        @ready="chartComponetsStatus.competencesReadyR = true"
                    />
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import print from "@/modules/mixin/print";
import filterForm from "@/components/boss/reports/reportsFilterForm.vue";
import EmployeeInformation from "@/components/boss/reports/reportsEmployeeInformation.vue";
import Objectives from "@/components/boss/reports/reportsObjectives.vue";
import Competences from "@/components/boss/reports/reportsCompetences.vue";


export default {
    mixins: [print],
    components: {
        filterForm,
        EmployeeInformation,
        Objectives,
        Competences,
    },
    data: () => ({
        loading: false,
        filterFormData: {},
        filterFormReady: false,
        chartComponetsStatus: {
            employeeInformationReadyL: false,
            employeeInformationReadyR: false,
            objectivesReadyL: false,
            objectivesReadyR: false,
            competencesReadyL: false,
            competencesReadyR: false,
        },
    }),
    created() {
    },
    methods: {
        print() {
            // Pass the element id here
            this.$printHtml("printReport");
        },
        async getReport(event) {
            this.filterFormData = event;
            this.filterFormReady = true;

            const keys = Object.keys(this.chartComponetsStatus);
            keys.forEach((key) => {
                this.chartComponetsStatus[key] = false;
            });
        },
    },
    computed: {
        chartComponetsReady() {
            if (!this.filterFormReady) {
                return true;
            }

            const keys = Object.keys(this.chartComponetsStatus);
            for (let i = 0; i < keys.length; i += 1) {
                if (!this.chartComponetsStatus[keys[i]]) {
                    return false;
                }
            }
            return true;
        },
    },
};
</script>

<style scoped></style>
