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
        <filter-form v-model="filterFormData"/>
        <div
            class="collapse-content"
            v-if="evaluationEmployeeData.left.results.data.seniorityAverage"
            style="background-color: white; margin: 30px 30px;"
        >
            <h3 class="breadcrumb-header">Información de evaluados</h3>
            <a-row>
                <results-info
                    :data="evaluationEmployeeData.left.results.data"
                    :showAll="evaluationEmployeeData.left.results.showAll"
                />
                <results-info
                    :data="evaluationEmployeeData.right.results.data"
                    :showAll="evaluationEmployeeData.right.results.showAll"
                />
            </a-row>
        </div>
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
import moment from "moment";
import client3B from "@/api/client3B";
import print from "@/modules/mixin/print";
import errorHandler from "@/views/errorHandler";
import filterForm from "@/components/boss/reports/reportsFilterForm.vue";
import BarChart from "@/components/charts/horizontalBar.vue";
import DoughnutChart from "@/components/charts/doughnut.vue";
import ResultsInfo from "@/components/boss/resultsInfo/resultsInfo.vue";

const NONE = "NONE";

export default {
    mixins: [print],
    components: {
        filterForm,
        BarChart,
        DoughnutChart,
        ResultsInfo,
    },
    data: () => ({
        loading: false,
        filterFormData: {},
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
        evaluationEmployeeData: {
            left: {
                results: {
                    data: {
                        seniorityAverage: null,
                        totalEmployees: null,
                        evaluatedEmployees: null,
                    },
                    showAll: null,
                },
            },
            right: {
                results: {
                    data: {
                        seniorityAverage: null,
                        totalEmployees: null,
                        evaluatedEmployees: null,
                    },
                    showAll: null,
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

        async getReport() {
            this.filterFormData.loading = true;
            this.filterFormData.loading = true;

            // try {
            //     // Employees Data - Capabilities Left-Report
            //     this.evaluationEmployeeData.left.results.showAll = this.isInCurrentPeriod(
            //         this.filterFormData.left.start,
            //         this.filterFormData.left.end,
            //     );
            //     this.evaluationEmployeeData.right.results.showAll = this.isInCurrentPeriod(
            //         this.filterFormData.right.start,
            //         this.filterFormData.right.end,
            //     );

            //     const [leftEmployee, rightEmployee] = await Promise.all([
            //         this.getEvaluationEmployeeData(this.filterFormData.left),
            //         this.getEvaluationEmployeeData(this.filterFormData.right),
            //     ]);
            //     this.evaluationEmployeeData.left.results.data = leftEmployee.data.result;
            //     this.evaluationEmployeeData.right.results.data = rightEmployee.data.result;

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
        getCapabilitiesReport(side) {
            const startTime = side.start;
            const endTime = side.end;
            startTime.set({
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0,
            });
            endTime.set({
                hour: 23,
                minute: 59,
                second: 59,
                millisecond: 999,
            });
            const dataReport = {
                RegionId: side.region,
                StarTime: startTime.toISOString(),
                EndDateTime: endTime.toISOString(),
            };
            if (side.area !== NONE) dataReport.AreaId = side.area;
            if (side.job !== NONE) dataReport.JobDescription = side.job;
            if (side.person !== NONE) dataReport.UserId = side.person;

            return Promise.all([
                client3B.report.GetEvaluatorCapabilitiesReport(dataReport),
                client3B.report.GetEvaluatorObjectivesReport(dataReport),
            ]);
        },
        populateLeftHorizontalChart(leftReport) {
            this.filterFormData.leftChartData = {
                labels: leftReport.map((item) => item.name),
                datasets: [
                    {
                        label: "Insatisfactorio",
                        data: leftReport.map((item) => item.unsatisfactory),
                        backgroundColor: "#e94e6f",
                    },
                    {
                        label: "Cumple Requerimiento",
                        data: leftReport.map((item) => item.satisfactory),
                        backgroundColor: "#498bc9",
                    },
                    {
                        label: "Excede Requerimiento",
                        data: leftReport.map((item) => item.exceeds),
                        backgroundColor: "#2eaa79",
                    },
                ],
            };
        },
        populateRightHorizontalChart(rightReport) {
            this.filterFormData.rightChartData = {
                labels: rightReport.map((item) => item.name),
                datasets: [
                    {
                        label: "Insatisfactorio",
                        data: rightReport.map((item) => item.unsatisfactory),
                        backgroundColor: "#e94e6f",
                    },
                    {
                        label: "Satisfactorio",
                        data: rightReport.map((item) => item.satisfactory),
                        backgroundColor: "#498bc9",
                    },
                    {
                        label: "Excede",
                        data: rightReport.map((item) => item.exceeds),
                        backgroundColor: "#2eaa79",
                    },
                ],
            };
        },
        populateLeftObjectivesChart(leftObjectives) {
            const leftU = leftObjectives.totalObjectives - leftObjectives.validatedObjectives;
            this.filterFormData.leftObjectivesData = {
                datasets: [
                    {
                        data: [leftObjectives.validatedObjectives, leftU],
                        backgroundColor: ["#00b880", "#ff3b3b"],
                    },
                ],
                labels: ["Cumplidos", "No cumplidos"],
            };
        },
        populateRightObjectivesChart(rightObjectives) {
            const rightU = rightObjectives.totalObjectives - rightObjectives.validatedObjectives;
            this.filterFormData.rightObjectivesData = {
                datasets: [
                    {
                        data: [rightObjectives.validatedObjectives, rightU],
                        backgroundColor: ["#00b880", "#ff3b3b"],
                    },
                ],
                labels: ["Cumplidos", "No cumplidos"],
            };
        },
        getEvaluationEmployeeData(side) {
            const startTime = side.start;
            const endTime = side.end;
            startTime.set({
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0,
            });
            endTime.set({
                hour: 23,
                minute: 59,
                second: 59,
                millisecond: 999,
            });
            const dataReport = {
                RegionId: side.region,
                StarTime: startTime.toISOString(),
                EndDateTime: endTime.toISOString(),
            };
            if (side.area !== NONE) dataReport.AreaId = side.area;
            if (side.job !== NONE) dataReport.JobDescription = side.job;
            if (side.person !== NONE) dataReport.UserId = side.person;

            return client3B.report.GetEvaluationEmployeeData(dataReport);
        },
        isInCurrentPeriod(dateStart, dateEnd) {
            const currentDate = moment();
            const firstPeriodStart = moment().startOf("year");
            const firstPeriodStartClone = firstPeriodStart.clone();
            const firstPeriodEnd = firstPeriodStartClone.add(5, "months");

            const firstPeriodEndClone = firstPeriodEnd.clone();
            const secondPeriodStart = firstPeriodEndClone.endOf("month").add(1, "day");
            const secondPeriodEnd = moment().endOf("year");

            if (currentDate.year() !== dateStart.year()) {
                return false;
            }

            if (
                dateStart.isBetween(firstPeriodStart, firstPeriodEnd, "month", "[]") &&
                dateEnd.isBetween(firstPeriodStart, firstPeriodEnd, "month", "[]")
            ) {
                if (currentDate.month() >= 0 && currentDate.month() <= 5) {
                    return true;
                }
            } else if (
                dateStart.isBetween(secondPeriodStart, secondPeriodEnd, "month", "[]") &&
                dateEnd.isBetween(secondPeriodStart, secondPeriodEnd, "month", "[]")
            ) {
                if (currentDate.month() >= 6 && currentDate.month() <= 11) {
                    return true;
                }
            }

            return false;
        },
    },
    watch: {
        filterFormData: {
            handler() {
                this.getReport();
            },
            deep: true
        }
    },
};
</script>

<style scoped></style>
