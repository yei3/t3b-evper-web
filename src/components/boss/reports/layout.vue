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
                        :disabled="leftObjectivesData === null"
                    >
                        <a-icon type="printer" />Imprimir
                    </a-button>
                </a-col>
            </a-row>
        </a-row>
        {{ filterFormData }}
        <filter-form :loading="!chartComponetsReady" @updatedForm="$event => getReport($event)"/>
        <employees-information
            v-if="filterFormReady"
            :filterForm="filterFormData"
            @ready="chartComponetsStatus.employeesInformationReady = true"
        />
        <div
            class="collapse-content"
            v-if="leftObjectivesData"
            style="background-color: white; margin: 30px 30px;"
        >
            <h3 class="breadcrumb-header">Objetivos Evaluados</h3>
            <a-row>
                <a-col :span="12" class="text-center">
                    <div class="small">
                        <doughnut-chart
                            v-if="leftObjectivesData"
                            :chartData="leftObjectivesData"
                            :options="leftObjectivesOptions"
                        />
                    </div>
                </a-col>
                <a-col :span="12" class="text-center">
                    <div class="small">
                        <doughnut-chart
                            v-if="rightObjectivesData"
                            :chartData="rightObjectivesData"
                            :options="rightObjectivesOptions"
                        />
                    </div>
                </a-col>
            </a-row>
        </div>
        <div
            v-if="leftChartData"
            class="collapse-content"
            style="background-color: white; margin: 30px 30px;"
        >
            <h3 class="breadcrumb-header">Competencias Evaluadas</h3>
            <a-row>
                <a-col :sm="24" :md="12">
                    <bar-chart
                        v-if="leftChartData"
                        :chartData="leftChartData"
                        :options="barOptions"
                    />
                </a-col>
                <a-col :sm="24" :md="12">
                    <bar-chart
                        v-if="rightChartData"
                        :chartData="rightChartData"
                        :options="barOptions"
                    />
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
// import moment from "moment";
// import client3B from "@/api/client3B";
import print from "@/modules/mixin/print";
// import errorHandler from "@/views/errorHandler";
import filterForm from "@/components/boss/reports/reportsFilterForm.vue";
import EmployeesInformation from "@/components/boss/reports/reportsEmployeesInformation.vue";
import BarChart from "@/components/charts/horizontalBar.vue";
import DoughnutChart from "@/components/charts/doughnut.vue";
import ResultsInfo from "@/components/boss/resultsInfo/resultsInfo.vue";

// const NONE = "NONE";

export default {
    mixins: [print],
    components: {
        filterForm,
        EmployeesInformation,
        BarChart,
        DoughnutChart,
        ResultsInfo,
    },
    data: () => ({
        loading: false,
        filterFormData: {},
        filterFormReady: false,
        chartComponetsStatus: {
            employeesInformationReady: false,
        },
        objetiveSpin: true,
        leftObjectivesData: null,
        leftObjectivesOptions: {
            title: {
                display: true,
                text: "Reporte de Objetivos A",
            },
            display: true,
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
                    formatter: (value, context) => {
                        let total = 0;
                        context.dataset.data.forEach((element) => {
                            total += element;
                        });
                        return `${Math.round((value / total) * 100)}%`;
                    },
                },
            },
        },
        rightObjectivesData: null,
        rightObjectivesOptions: {
            title: {
                display: true,
                text: "Reporte de Objetivos B",
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
                    formatter: (value, context) => {
                        let total = 0;
                        context.dataset.data.forEach((element) => {
                            total += element;
                        });
                        return `${Math.round((value / total) * 100)}%`;
                    },
                },
            },
        },
        leftChartData: null,
        rightChartData: null,
        barOptions: {
            title: {
                display: true,
                text: "Reporte de Capacidades",
            },
            tooltips: {
                mode: "index",
                intersect: false,
            },
            responsive: true,
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
                    formatter: (value, context) => {
                        const index = context.dataIndex;
                        let total = 0;
                        context.chart.data.datasets.forEach((dataset) => {
                            total += dataset.data[index];
                        });
                        return `${Math.round((value / total) * 100)}%`;
                    },
                },
            },
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
            console.log("get report");
            this.filterFormData = event;
            this.filterFormReady = true;
            const keys = Object.keys(this.chartComponetsStatus);
            keys.forEach((key) => {
                this.chartComponetsStatus[key] = false;
            });

            // try {
            //

            //     // Objectives - Capabilities Left-Report
            //     const [
            //         {
            //             data: { result: leftReport },
            //         },
            //         {
            //             data: { result: leftObjectives },
            //         },
            //     ] = await this.getCapabilitiesReport(this.filterFormData.left);

            //     this.populateLeftHorizontalChart(leftReport);
            //     this.populateLeftObjectivesChart(leftObjectives);

            //     // Objectives - Capabilities Right-Report
            //     const [
            //         {
            //             data: { result: rightReport },
            //         },
            //         {
            //             data: { result: rightObjectives },
            //         },
            //     ] = await this.getCapabilitiesReport(this.filterFormData.right);

            //     this.populateRightObjectivesChart(rightObjectives);
            //     this.populateRightHorizontalChart(rightReport);
            // } catch (error) {
            //     errorHandler(this, error);
            // } finally {
            //     this.filterFormData.loading = false;
            // }
        },
        // getCapabilitiesReport(side) {
        //     const startTime = side.start;
        //     const endTime = side.end;
        //     startTime.set({
        //         hour: 0,
        //         minute: 0,
        //         second: 0,
        //         millisecond: 0,
        //     });
        //     endTime.set({
        //         hour: 23,
        //         minute: 59,
        //         second: 59,
        //         millisecond: 999,
        //     });
        //     const dataReport = {
        //         RegionId: side.region,
        //         StarTime: startTime.toISOString(),
        //         EndDateTime: endTime.toISOString(),
        //     };
        //     if (side.area !== NONE) dataReport.AreaId = side.area;
        //     if (side.job !== NONE) dataReport.JobDescription = side.job;
        //     if (side.person !== NONE) dataReport.UserId = side.person;

        //     return Promise.all([
        //         client3B.report.GetEvaluatorCapabilitiesReport(dataReport),
        //         client3B.report.GetEvaluatorObjectivesReport(dataReport),
        //     ]);
        // },
        // populateLeftHorizontalChart(leftReport) {
        //     this.filterFormData.leftChartData = {
        //         labels: leftReport.map((item) => item.name),
        //         datasets: [
        //             {
        //                 label: "Insatisfactorio",
        //                 data: leftReport.map((item) => item.unsatisfactory),
        //                 backgroundColor: "#e94e6f",
        //             },
        //             {
        //                 label: "Cumple Requerimiento",
        //                 data: leftReport.map((item) => item.satisfactory),
        //                 backgroundColor: "#498bc9",
        //             },
        //             {
        //                 label: "Excede Requerimiento",
        //                 data: leftReport.map((item) => item.exceeds),
        //                 backgroundColor: "#2eaa79",
        //             },
        //         ],
        //     };
        // },
        // populateRightHorizontalChart(rightReport) {
        //     this.filterFormData.rightChartData = {
        //         labels: rightReport.map((item) => item.name),
        //         datasets: [
        //             {
        //                 label: "Insatisfactorio",
        //                 data: rightReport.map((item) => item.unsatisfactory),
        //                 backgroundColor: "#e94e6f",
        //             },
        //             {
        //                 label: "Satisfactorio",
        //                 data: rightReport.map((item) => item.satisfactory),
        //                 backgroundColor: "#498bc9",
        //             },
        //             {
        //                 label: "Excede",
        //                 data: rightReport.map((item) => item.exceeds),
        //                 backgroundColor: "#2eaa79",
        //             },
        //         ],
        //     };
        // },
        // populateLeftObjectivesChart(leftObjectives) {
        //     const leftU = leftObjectives.totalObjectives - leftObjectives.validatedObjectives;
        //     this.filterFormData.leftObjectivesData = {
        //         datasets: [
        //             {
        //                 data: [leftObjectives.validatedObjectives, leftU],
        //                 backgroundColor: ["#00b880", "#ff3b3b"],
        //             },
        //         ],
        //         labels: ["Cumplidos", "No cumplidos"],
        //     };
        // },
        // populateRightObjectivesChart(rightObjectives) {
        //     const rightU = rightObjectives.totalObjectives - rightObjectives.validatedObjectives;
        //     this.filterFormData.rightObjectivesData = {
        //         datasets: [
        //             {
        //                 data: [rightObjectives.validatedObjectives, rightU],
        //                 backgroundColor: ["#00b880", "#ff3b3b"],
        //             },
        //         ],
        //         labels: ["Cumplidos", "No cumplidos"],
        //     };
        // },


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
