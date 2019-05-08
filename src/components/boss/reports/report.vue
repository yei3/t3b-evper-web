<template>
    <div>
        <a-row class="main-content">
            <h3 class="breadcrumb-header">Objetivos Evaluados</h3>
            <a-col v-if="isObjectivesLoaded" :span="12" class="text-center">
                <p>2019-1</p>
                <div class="small">
                    <chart v-if="isObjectivesLoaded" :chartData="currentData" :options="currentOptions" />
                </div>
            </a-col>
            <a-col v-if="isObjectivesLoaded" :span="12" class="text-center">
                <p>2018-2</p>
                <div class="small">
                    <chart v-if="isObjectivesLoaded" :chartData="previousData" :options="previousOptions" />
                </div>
            </a-col>
            <a-row v-show="spin">
                <div style="text-align: center; margin-top: 20px;">
                    <a-spin tip="Cargando..." size="small" />
                </div>
            </a-row>
        </a-row>
        <a-divider />
        <a-row class="main-content">
            <h3 class="breadcrumb-header">Competencias Evaluadas</h3>
            <a-row v-show="spin">
                <div style="text-align: center; margin-top: 20px;">
                    <a-spin tip="Cargando..." size="small" />
                </div>
            </a-row>
            <a-col :span="8" class="text-left">
                <a-select
                    defaultValue="radar"
                    style="width: 200px"
                    @change="(option) => (competencesChartType = option)"
                >
                    <a-select-option value="radar">Gráfica Radar</a-select-option>
                    <a-select-option value="bar">Gráfica de Barras</a-select-option>
                </a-select>

                <a-list itemLayout="horizontal" :dataSource="competencesSections">
                    <a-list-item slot="renderItem" slot-scope="item, index">
                        {{ item.title }}
                    </a-list-item>
                </a-list>
            </a-col>
            <a-col :span="12" class="text-center">
                <div class="radar--size" v-show="competencesChartType == 'radar'">
                    <radar-chart
                        v-if="isCompentecesLoaded"
                        :chartData="compentecesData"
                        :options="compentecesOptions"
                    />
                </div>
                <div class="radar--size" v-show="competencesChartType == 'bar'">
                    <bar-chart v-if="isCompentecesLoaded" :chartData="compentecesData" :options="compentecesOptions" />
                </div>
            </a-col>
        </a-row>
    </div>
</template>
<script>
import client3B from "@/api/client3B";
import errorHandler from "@/views/errorHandler";
import Chart from "@/components/charts/doughnut.vue";
import RadarChart from "@/components/charts/radar.vue";
import BarChart from "@/components/charts/bar.vue";

export default {
    name: "Objectives",
    props: {
        collaboratorId: {
            type: Number,
            default: 0,
        },
    },
    components: {
        Chart,
        RadarChart,
        BarChart,
    },
    data: () => ({
        spin: false,
        isObjectivesLoaded: false,
        isCompentecesLoaded: false,
        currentData: {
            datasets: [
                {
                    data: [],
                    backgroundColor: [],
                },
            ],
            labels: [],
        },
        currentOptions: {
            display: true,
            labels: {
                fontColor: "rgb(255, 99, 132)",
            },
            responsive: true,
            maintainAspectRatio: true,
        },
        previousData: {
            datasets: [
                {
                    data: [],
                    backgroundColor: [],
                },
            ],
            labels: [],
        },
        previousOptions: {
            display: true,
            labels: {
                fontColor: "rgb(255, 99, 132)",
            },
            responsive: true,
            maintainAspectRatio: true,
        },
        competencesChartType: "radar",
        compentecesData: {
            labels: [],
            datasets: [],
        },
        compentecesOptions: {
            responsive: false,
            maintainAspectRatio: false,
        },
        competencesSections: [
            {
                title: "Orientación a resultados",
            },
            {
                title: "Eficiencia",
            },
            {
                title: "Orientación al detalle",
            },
            {
                title: "Comunicación",
            },
            {
                title: "Capacidad de análisis y solución de problemas",
            },
            {
                title: "Cultura 3B",
            },
        ],
    }),
    async mounted() {
        await this.getCollaboratorObjectives();
        await this.getCollaboratorCompetences();
    },
    methods: {
        async getCollaboratorCompetences() {
            this.isCompentecesLoaded = false;
            const currentData = [8, 8, 4, 5, 7, 9];
            const previousData = [6, 7, 9, 8, 4, 5];

            const response = await client3B.report.getCollaboratorCompetencesReport().catch((error) => {
                this.spin = false;
                errorHandler(this, error);
            });
            if (!response) return;

            /*
            const competences = response.data.result;
            competences.forEach(competence => {

            });
            */

            this.compentecesData = {
                labels: [
                    "Orientación a resultados",
                    "Eficiencia",
                    "Orientación al detalle",
                    "Comunicación",
                    "Capacidad de análisis y solución de problemas",
                    "Cultura 3B",
                ],
                datasets: [
                    {
                        label: "2019-1",
                        data: currentData,
                        borderWidth: 2,
                        borderColor: "#00b880",
                        backgroundColor: "#00b88088",
                    },
                    {
                        label: "2018-2",
                        data: previousData,
                        borderWidth: 2,
                        borderColor: "#b6b6b6",
                        backgroundColor: "#b6b6b688",
                    },
                ],
            };
            this.compentecesOptions = {
                responsive: true,
                maintainAspectRatio: true,
            };
            this.isCompentecesLoaded = true;
        },
        async getCollaboratorObjectives() {
            this.spin = true;
            let currentDiff = 0;
            let previousDiff = 0;
            this.isObjectivesLoaded = false;

            const response = await client3B.report
                .getCollaboratorObjectivesReportById({
                    UserId: this.collaboratorId,
                })
                .catch((error) => {
                    this.spin = false;
                    errorHandler(this, error);
                });
            if (!response) return;

            const { result } = response.data;
            currentDiff = result.currentTotal - result.currentValidated;
            previousDiff = result.previousTotal - result.previousValidated;
            // Current Chart
            this.currentData = {
                datasets: [
                    {
                        data: [result.currentValidated, currentDiff],
                        backgroundColor: ["#00b880", "#ff3b3b"],
                    },
                ],
                labels: ["Cumplidos", "No cumplidos"],
            };
            // Previous Chart
            this.previousData = {
                datasets: [
                    {
                        data: [result.previousValidated, previousDiff],
                        backgroundColor: ["#00b880", "#ff3b3b"],
                    },
                ],
                labels: ["Cumplidos", "No cumplidos"],
            };

            this.spin = false;
            this.isObjectivesLoaded = true;
        },
        getYearDays(dateString) {
            const inputDate = new Date(dateString);
            const startDate = new Date(inputDate.getFullYear(), 0, 0);
            const diff = inputDate - startDate;
            const oneDay = 1000 * 60 * 60 * 24;
            return Math.floor(diff / oneDay);
        },
    },
};
</script>
<style>
.small {
    max-width: 256px;
    margin: 0px auto;
}
.radar--size {
    color: #b6b6b688;
}
</style>
