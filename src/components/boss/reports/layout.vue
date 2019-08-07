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
        <div
            class="collapse-content"
            style="background-color: white;
                margin: 30px 30px; padding-top: 20px;:"
        >
            <a-row>
                <a-col :md="11" style="text-align:center;">
                    <h4 style="color: red;">Evaluado A</h4>
                </a-col>
                <a-col :md="2" style="text-align:center;">
                    <h4 style="color: red;">vs</h4>
                </a-col>
                <a-col :md="11" style="text-align:center;">
                    <h4 style="color: red;">Evaluado B</h4>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :sm="24" :md="12">
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Región:</h5>
                        <a-select
                            style="width: 100%"
                            :defaultValue="none"
                            v-model="left.region"
                            @change="left.area = left.job = left.person = none"
                        >
                            <a-select-option :value="none" :key="none"
                                >Selecciona una región</a-select-option
                            >
                            <a-select-option
                                v-for="region in regions"
                                :key="region.id"
                                :value="region.id"
                                >{{ region.displayName }}</a-select-option
                            >
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Área:</h5>
                        <a-select
                            style="width: 100%"
                            :defaultValue="none"
                            v-model="left.area"
                            @change="left.job = left.person = none"
                            :disabled="left.region === none"
                        >
                            <a-select-option :value="none" :key="none">Todos</a-select-option>
                            <a-select-option
                                v-for="area in leftAreas"
                                :key="area.id"
                                :value="area.id"
                                >{{ area.displayName }}</a-select-option
                            >
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Puesto:</h5>
                        <a-select
                            style="width: 100%"
                            :defaultValue="none"
                            v-model="left.job"
                            @change="left.person = none"
                            :disabled="left.area === none"
                        >
                            <a-select-option :value="none" :key="none">Todos</a-select-option>
                            <a-select-option
                                v-for="job in leftJobs"
                                :key="job.id"
                                :value="job.id"
                                >{{ job.jobDescription }}</a-select-option
                            >
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Evaluado:</h5>
                        <a-select
                            style="width: 100%"
                            :defaultValue="none"
                            v-model="left.person"
                            showSearch
                            :filterOption="filterOption"
                            :disabled="left.job === none"
                        >
                            <a-select-option :value="none" :key="none">Todos</a-select-option>
                            <a-select-option
                                v-for="person in leftPeople"
                                :key="person.id"
                                :value="person.id"
                                >{{ person.fullName }}</a-select-option
                            >
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Fecha Inicio:</h5>
                        <a-date-picker placeholder="Fecha Inicio" v-model="left.start" />
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Fecha Fin:</h5>
                        <a-date-picker placeholder="Fecha Fin" v-model="left.end" />
                    </a-col>
                </a-col>
                <a-col :sm="24" :md="12">
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Región:</h5>
                        <a-select
                            style="width: 100%"
                            :defaultValue="none"
                            v-model="right.region"
                            @change="right.area = right.job = right.person = none"
                        >
                            <a-select-option :value="none" :key="none"
                                >Selecciona una región</a-select-option
                            >
                            <a-select-option
                                v-for="region in regions"
                                :key="region.id"
                                :value="region.id"
                                >{{ region.displayName }}</a-select-option
                            >
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Área:</h5>
                        <a-select
                            style="width: 100%"
                            :defaultValue="none"
                            v-model="right.area"
                            @change="right.job = right.person = none"
                            :disabled="right.region === none"
                        >
                            <a-select-option :value="none" :key="none">Todos</a-select-option>
                            <a-select-option
                                v-for="area in rightAreas"
                                :key="area.id"
                                :value="area.id"
                                >{{ area.displayName }}</a-select-option
                            >
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Puesto:</h5>
                        <a-select
                            style="width: 100%"
                            :defaultValue="none"
                            v-model="right.job"
                            @change="right.person = none"
                            :disabled="right.area === none"
                        >
                            <a-select-option :value="none" :key="none">Todos</a-select-option>
                            <a-select-option
                                v-for="job in rightJobs"
                                :key="job.id"
                                :value="job.id"
                                >{{ job.jobDescription }}</a-select-option
                            >
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Evaluado:</h5>
                        <a-select
                            style="width: 100%"
                            :defaultValue="none"
                            v-model="right.person"
                            showSearch
                            :filterOption="filterOption"
                            :disabled="right.job === none"
                        >
                            <a-select-option :value="none" :key="none">Todos</a-select-option>
                            <a-select-option
                                v-for="person in rightPeople"
                                :key="person.id"
                                :value="person.id"
                                >{{ person.fullName }}</a-select-option
                            >
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Fecha Inicio:</h5>
                        <a-date-picker placeholder="Fecha Inicio" v-model="right.start" />
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Fecha Fin:</h5>
                        <a-date-picker placeholder="Fecha Fin" v-model="right.end" />
                    </a-col>
                </a-col>
                <a-col :md="24" style="text-align: center; padding-top: 20px;">
                    <a-alert v-show="bannerError" banner closable :message="bannerError" />
                    <br />
                    <a-button
                        type="primary"
                        @click="getReport"
                        :loading="loading"
                        :disabled="loading"
                        >Comparar</a-button
                    >
                </a-col>
            </a-row>
        </div>
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
import BarChart from "@/components/charts/horizontalBar.vue";
import DoughnutChart from "@/components/charts/doughnut.vue";
import ResultsInfo from "@/components/boss/resultsInfo/resultsInfo.vue";

const NONE = "NONE";

export default {
    mixins: [print],
    components: {
        BarChart,
        DoughnutChart,
        ResultsInfo,
    },
    data: () => ({
        none: NONE,
        areas: [],
        regions: [],
        jobs: [],
        users: [],
        loading: false,
        bannerError: null,
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
        left: {
            region: NONE,
            area: NONE,
            job: NONE,
            person: NONE,
            start: undefined,
            end: undefined,
        },
        right: {
            region: NONE,
            area: NONE,
            job: NONE,
            person: NONE,
            start: undefined,
            end: undefined,
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
        this.init();
    },
    methods: {
        print() {
            // Pass the element id here
            this.$printHtml("printReport");
        },
        async init() {
            const [
                {
                    data: { result: regions },
                },
                {
                    data: { result: areas },
                },
                {
                    data: { result: jobs },
                },
                {
                    data: { result: users },
                },
            ] = await Promise.all([
                client3B.organizationUnit.getRegionsTree(),
                client3B.organizationUnit.getAreasTree(),
                client3B.organizationUnit.getJobsTree(),
                client3B.organizationUnit.getUserTree(),
            ]).catch((error) => errorHandler(this, error));

            this.regions = regions;
            this.areas = areas;
            this.jobs = jobs;
            this.users = users;
        },
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
            );
        },
        async getReport() {
            this.loading = true;
            this.bannerError = null;
            if (this.left.region === NONE || this.right.region === NONE) {
                this.bannerError = "Al menos una región debe ser seleccionada";
                this.loading = false;
                return;
            }
            if (
                this.left.start === undefined ||
                this.right.start === undefined ||
                this.left.end === undefined ||
                this.right.end === undefined
            ) {
                this.bannerError = "Selecciona un rango de fechas correcto";
                this.loading = false;
                return;
            }

            try {
                // Objectives - Capabilities Left-Report
                const [
                    {
                        data: { result: leftReport },
                    },
                    {
                        data: { result: leftObjectives },
                    },
                ] = await this.getCapabilitiesReport(this.left);

                this.populateLeftHorizontalChart(leftReport);
                this.populateLeftObjectivesChart(leftObjectives);

                // Objectives - Capabilities Right-Report
                const [
                    {
                        data: { result: rightReport },
                    },
                    {
                        data: { result: rightObjectives },
                    },
                ] = await this.getCapabilitiesReport(this.right);

                this.populateRightObjectivesChart(rightObjectives);
                this.populateRightHorizontalChart(rightReport);

                this.evaluationEmployeeData.left.results.showAll = this.isInCurrentPeriod(
                    this.left.start,
                    this.left.end,
                );
                this.evaluationEmployeeData.right.results.showAll = this.isInCurrentPeriod(
                    this.right.start,
                    this.right.end,
                );

                const [leftEmployee, rightEmployee] = await Promise.all([
                    this.getEvaluationEmployeeData(this.left),
                    this.getEvaluationEmployeeData(this.right),
                ]);
                this.evaluationEmployeeData.left.results.data = leftEmployee.data.result;
                this.evaluationEmployeeData.right.results.data = rightEmployee.data.result;
            } catch (error) {
                errorHandler(this, error);
            } finally {
                this.loading = false;
            }
        },
        getCapabilitiesReport(side) {
            const startTime = side.start;
            const endTime = side.end;
            startTime.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
            endTime.set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
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
            this.leftChartData = {
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
            this.rightChartData = {
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
            this.leftObjectivesData = {
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
            this.rightObjectivesData = {
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
            startTime.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
            endTime.set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
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

            if (currentDate.year() != dateStart.year()) {
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
    computed: {
        leftAreas() {
            if (this.left.region === NONE) return [];
            return this.areas.filter((area) => area.parentId === this.left.region);
        },
        rightAreas() {
            if (this.right.region === NONE) return [];
            return this.areas.filter((area) => area.parentId === this.right.region);
        },
        leftJobs() {
            if (this.left.area === NONE) return [];
            return this.jobs.filter((job) => job.areaIds.includes(this.left.area));
        },
        rightJobs() {
            if (this.right.area === NONE) return [];
            return this.jobs.filter((job) => job.areaIds.includes(this.right.area));
        },
        leftPeople() {
            if (this.left.job === NONE) return [];
            const currentJob = this.jobs.find((job) => job.id === this.left.job);
            return this.users.filter((user) => user.jobDescription === currentJob.jobDescription);
        },
        rightPeople() {
            if (this.right.job === NONE) return [];
            const currentJob = this.jobs.find((job) => job.id === this.right.job);
            return this.users.filter((user) => user.jobDescription === currentJob.jobDescription);
        },
    },
};
</script>

<style scoped></style>
