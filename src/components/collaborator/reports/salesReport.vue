<template>
    <div>
        <div class="collapse-content" style="background-color: white; margin: 30px 30px;">
            <h3 class="breadcrumb-header">Objetivos de Ventas Evaluados</h3>
            <a-row>
                <a-col v-if="isObjectivesLoaded" :span="12" class="text-center">
                    <div class="small">
                        <doughnut-chart v-if="isObjectivesLoaded" :chartData="currentData" :options="currentOptions" />
                    </div>
                </a-col>
                <a-col v-if="isObjectivesLoaded" :span="12" class="text-center">
                    <div class="small">
                        <doughnut-chart
                            v-if="isObjectivesLoaded"
                            :chartData="previousData"
                            :options="previousOptions"
                        />
                    </div>
                </a-col>
                <a-row v-show="objetiveSpin">
                    <div style="text-align: center; margin-top: 20px;">
                        <a-spin tip="Cargando..." size="small" />
                    </div>
                </a-row>
            </a-row>
        </div>
        <div class="collapse-content" style="background-color: white; margin: 30px 30px;">
            <a-row>
                <a-row>
                    <a-col :span="12">
                        <h3 class="breadcrumb-header">Competencias de Ventas Evaluadas</h3>
                    </a-col>
                    <a-col :span="12" class="text-right select--chart__padding">
                        <b>Tipo de gráfica: </b>
                        <a-select
                            defaultValue="bar"
                            class="select--chart"
                            @change="(option) => (competencesChartType = option)"
                        >
                            <a-select-option value="radar">Gráfica Radar</a-select-option>
                            <a-select-option value="bar">Gráfica de Barras</a-select-option>
                        </a-select>
                    </a-col>
                </a-row>
                <a-row class="chart--capabilities">
                    <a-row v-show="competenceSpin">
                        <div style="text-align: center; margin-top: 20px;">
                            <a-spin tip="Cargando..." size="small" />
                        </div>
                    </a-row>
                    <a-col v-show="!competenceSpin" :span="12" class="text-center">
                        <div class="radar--size" v-show="competencesChartType == 'radar'">
                            <radar-chart
                                v-if="isCompentecesLoaded"
                                :chartData="currentCompentecesData"
                                :options="currentCompentecesOptions"
                            />
                        </div>
                        <div class="radar--size" v-show="competencesChartType == 'bar'">
                            <bar-chart
                                v-if="isCompentecesLoaded"
                                :chartData="currentCompentecesData"
                                :options="currentCompentecesOptions"
                            />
                        </div>
                    </a-col>
                    <a-col v-show="!competenceSpin" :span="12" class="text-center">
                        <div class="radar--size" v-show="competencesChartType == 'radar'">
                            <radar-chart
                                v-if="isCompentecesLoaded"
                                :chartData="previousCompetencesData"
                                :options="previousCompentecesOptions"
                            />
                        </div>
                        <div class="radar--size" v-show="competencesChartType == 'bar'">
                            <bar-chart
                                v-if="isCompentecesLoaded"
                                :chartData="previousCompetencesData"
                                :options="previousCompentecesOptions"
                            />
                        </div>
                    </a-col>
                </a-row>
            </a-row>
        </div>
    </div>
</template>
<script>
import client3B from "@/api/client3B";
import authService from "@/services/auth";
import errorHandler from "@/views/errorHandler";
import RadarChart from "@/components/charts/radar.vue";
import BarChart from "@/components/charts/horizontalBar.vue";
import DoughnutChart from "@/components/charts/doughnut.vue";

export default {
    name: "Objectives",
    components: {
        DoughnutChart,
        RadarChart,
        BarChart,
    },
    data: () => ({
        user: authService.getUserData(),
        objetiveSpin: false,
        competenceSpin: false,
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
            title: {
                display: true,
                text: "Objetivos actuales",
            },
            display: true,
            labels: {
                fontColor: "rgb(255, 99, 132)",
            },
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                datalabels: {
                    font: {
                        weight: "bold",
                    },
                    color: (context) => {
                        const index = context.dataIndex;
                        const value = context.dataset.data[index];
                        return value <= 0 ? "transparent" : "white";
                    },
                },
            },
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
            title: {
                display: true,
                text: "Objetivos anteriores",
            },
            display: true,
            labels: {
                fontColor: "rgb(255, 99, 132)",
            },
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                datalabels: {
                    font: {
                        weight: "bold",
                    },
                    color: (context) => {
                        const index = context.dataIndex;
                        const value = context.dataset.data[index];
                        return value <= 0 ? "transparent" : "white";
                    },
                },
            },
        },
        competencesChartType: "bar",
        currentCompentecesData: {
            labels: [],
            datasets: [],
        },
        currentCompentecesOptions: {
            title: {
                display: true,
                text: "Reporte de Capacidades actuales",
            },
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                mode: "index",
                intersect: false,
            },
            scales: {
                xAxes: [
                    {
                        stacked: true,
                    },
                ],
                yAxes: [
                    {
                        stacked: true,
                    },
                ],
            },
            plugins: {
                datalabels: {
                    font: {
                        weight: "bold",
                    },
                    color: (context) => {
                        const index = context.dataIndex;
                        const value = context.dataset.data[index];
                        return value <= 0 ? "transparent" : "white";
                    },
                },
            },
        },
        previousCompetencesData: {
            labels: [],
            datasets: [],
        },
        previousCompentecesOptions: {
            title: {
                display: true,
                text: "Reporte de Capacidades anteriores",
            },
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                mode: "index",
                intersect: false,
            },
            scales: {
                xAxes: [
                    {
                        stacked: true,
                    },
                ],
                yAxes: [
                    {
                        stacked: true,
                    },
                ],
            },
            plugins: {
                datalabels: {
                    font: {
                        weight: "bold",
                    },
                    color: (context) => {
                        const index = context.dataIndex;
                        const value = context.dataset.data[index];
                        return value <= 0 ? "transparent" : "white";
                    },
                },
            },
        },
    }),
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            await this.getCollaboratorObjectives();
            await this.getCollaboratorCompetences();
        },
        async getCollaboratorObjectives() {
            this.objetiveSpin = true;
            let currentDiff = 0;
            let previousDiff = 0;
            this.isObjectivesLoaded = false;

            const response = await client3B.report.GetCollaboratorObjectivesAccomplishmentReport().catch((error) => {
                this.objetiveSpin = false;
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

            this.objetiveSpin = false;
            this.isObjectivesLoaded = true;
        },
        async getCollaboratorCompetences() {
            this.competenceSpin = true;
            this.isCompentecesLoaded = false;

            const current = await client3B.report.GetCollaboratorAccomplishmentReport(0).catch((error) => {
                this.competenceSpin = false;
                errorHandler(this, error);
            });

            const previous = await client3B.report.GetCollaboratorAccomplishmentReport(1).catch((error) => {
                this.competenceSpin = false;
                errorHandler(this, error);
            });

            if (!current) return;

            const currentJobTotal = current.data.result[0].total;
            const currentJobSuccess = current.data.result[0].satisfactory;
            const currentCultureTotal = current.data.result[1].total;
            const currentCultureSuccess = current.data.result[1].satisfactory;

            const previousJobTotal = previous.data.result[0].total;
            const previousJobSuccess = previous.data.result[0].satisfactory;
            const previousCultureTotal = previous.data.result[1].total;
            const previousCultureSuccess = previous.data.result[1].satisfactory;

            const currentData = [
                {
                    name: "Competencias del puesto",
                    total: currentJobTotal - currentJobSuccess,
                    exceeds: this.isExceeds(currentJobTotal, currentJobSuccess),
                    satisfactory: this.isSatisfactory(currentJobTotal, currentJobSuccess),
                    unsatisfactory: this.isUnsatisfactory(currentJobTotal, currentJobSuccess),
                },
                {
                    name: "Cultura 3B",
                    total: currentCultureTotal - currentCultureSuccess,
                    exceeds: this.isExceeds(currentCultureTotal, currentCultureSuccess),
                    satisfactory: this.isSatisfactory(currentCultureTotal, currentCultureSuccess),
                    unsatisfactory: this.isUnsatisfactory(currentCultureTotal, currentCultureSuccess),
                },
            ];

            const previousData = [
                {
                    name: "Competencias del puesto",
                    total: previousJobTotal - previousJobSuccess,
                    exceeds: this.isExceeds(previousJobTotal, previousJobSuccess),
                    satisfactory: this.isSatisfactory(previousJobTotal, previousJobSuccess),
                    unsatisfactory: this.isUnsatisfactory(previousJobTotal, previousJobSuccess),
                },
                {
                    name: "Cultura 3B",
                    total: previousCultureTotal - previousCultureSuccess,
                    exceeds: this.isExceeds(previousCultureTotal, previousCultureSuccess),
                    satisfactory: this.isSatisfactory(previousCultureTotal, previousCultureSuccess),
                    unsatisfactory: this.isUnsatisfactory(previousCultureTotal, previousCultureSuccess),
                },
            ];

            this.currentCompentecesData = {
                labels: currentData.map((item) => item.name),
                datasets: [
                    {
                        label: "Insatisfactorio",
                        data: currentData.map((item) => item.unsatisfactory),
                        backgroundColor: "#e94e6f",
                    },
                    {
                        label: "Satisfactorio",
                        data: currentData.map((item) => item.satisfactory),
                        backgroundColor: "#498bc9",
                    },
                    {
                        label: "Excelente",
                        data: currentData.map((item) => item.exceeds),
                        backgroundColor: "#2eaa79",
                    },
                    {
                        label: "",
                        data: currentData.map((item) => item.total),
                    },
                ],
            };

            this.previousCompetencesData = {
                labels: previousData.map((item) => item.name),
                datasets: [
                    {
                        label: "Insatisfactorio",
                        data: previousData.map((item) => item.unsatisfactory),
                        backgroundColor: "#e94e6f",
                    },
                    {
                        label: "Satisfactorio",
                        data: previousData.map((item) => item.satisfactory),
                        backgroundColor: "#498bc9",
                    },
                    {
                        label: "Excelente",
                        data: previousData.map((item) => item.exceeds),
                        backgroundColor: "#2eaa79",
                    },
                    {
                        label: "",
                        data: previousData.map((item) => item.total),
                    },
                ],
            };

            this.competenceSpin = false;
            this.isCompentecesLoaded = true;
        },
        isExceeds(total, value) {
            if (!total) return 0;
            if (value / total >= 0.9) return value;
            return 0;
        },
        isSatisfactory(total, value) {
            if (!total) return 0;
            let percent = value / total;
            if (percent >= 0.7 && percent < 0.9) return value;
            return 0;
        },
        isUnsatisfactory(total, value) {
            if (!total) return 0;
            if (value / total < 0.7) return value;
            return 0;
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
.select--chart {
    width: 200px;
}
.select--chart__padding {
    padding: 8px 4px 0 0;
}
.results-header {
    margin: 16px 0 0 8px;
}
.results-subtitle {
    color: #ff1515;
    font-weight: 600;
    font-size: 15px;
}
.results-period {
    color: black;
    font-weight: bold;
    font-size: 13px;
}
.chart--capabilities {
    padding: 32px 0 0 0;
}
.ant-select-selection--single {
    height: 25px;
}
.ant-select-selection__rendered {
    line-height: none;
}
</style>
