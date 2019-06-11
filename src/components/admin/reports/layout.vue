<template>
    <div id="printReport">
        <a-row class="breadcrumb-wrapper">
            <a-row :gutter="32">
                <a-col :h2="24">
                    <h1 class="breadcrumb-header">Resultados de Evaluación | Análisis Comparativo</h1>
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
                    <a-button class="btn-blue" @click="print" :disabled="leftObjectivesData === null">
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
                        <a-select class="column--width" v-model="left.region" @change="left.area = null">
                            <a-select-option v-for="region in regions" :key="region.id" :value="region.id">
                                {{ region.displayName }}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Área:</h5>
                        <a-select class="column--width" v-model="left.area" @change="left.person = null">
                            <a-select-option v-for="area in leftAreas" :key="area.id" :value="area.id">
                                {{ area.displayName }}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Puesto:</h5>
                        <a-select class="column--width" v-model="left.person">
                            <a-select-option v-for="person in leftPeople" :key="person.id" :value="person.id">
                                {{ person.jobDescription }}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Evaluado:</h5>
                        <a-select class="column--width" v-model="left.person" showSearch :filterOption="filterOption">
                            <a-select-option v-for="person in leftPeople" :key="person.id" :value="person.id">
                                {{ person.fullName }}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Fecha Inicio:</h5>
                        <a-date-picker class="column--width" placeholder="Fecha Inicio" v-model="left.start" />
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Fecha Fin:</h5>
                        <a-date-picker class="column--width" placeholder="Fecha Fin" v-model="left.end" />
                    </a-col>
                </a-col>
                <a-col :sm="24" :md="12">
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Región:</h5>
                        <a-select class="column--width" v-model="right.region" @change="right.area = null">
                            <a-select-option v-for="region in regions" :key="region.id" :value="region.id">
                                {{ region.displayName }}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Área:</h5>
                        <a-select class="column--width" v-model="right.area" @change="right.person = null">
                            <a-select-option v-for="area in rightAreas" :key="area.id" :value="area.id">
                                {{ area.displayName }}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Puesto:</h5>
                        <a-select class="column--width" v-model="right.person">
                            <a-select-option v-for="person in rightPeople" :key="person.id" :value="person.id">
                                {{ person.jobDescription }}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Evaluado:</h5>
                        <a-select class="column--width" v-model="right.person" showSearch :filterOption="filterOption">
                            <a-select-option v-for="person in rightPeople" :key="person.id" :value="person.id">
                                {{ person.fullName }}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Fecha Inicio:</h5>
                        <a-date-picker class="column--width" placeholder="Fecha Inicio" v-model="right.start" />
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Fecha Fin:</h5>
                        <a-date-picker class="column--width" placeholder="Fecha Fin" v-model="right.end" />
                    </a-col>
                </a-col>
                <a-col :md="24" style="text-align: center; padding-top: 20px;">
                    <a-alert v-show="bannerError" banner closable :message="bannerError" />
                    <br />
                    <a-button block @click="getReport" :loading="loading" :disabled="loading"
                        >C o m p a r a r</a-button
                    >
                </a-col>
            </a-row>
        </div>
        <div class="collapse-content" v-if="leftObjectivesData" style="background-color: white; margin: 30px 30px;">
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
        <div v-if="leftChartData" class="collapse-content" style="background-color: white; margin: 30px 30px;">
            <h3 class="breadcrumb-header">Competencias Evaluadas</h3>
            <a-row>
                <a-col :sm="24" :md="12">
                    <bar-chart v-if="leftChartData" :chartData="leftChartData" :options="barOptions" />
                </a-col>
                <a-col :sm="24" :md="12">
                    <bar-chart v-if="rightChartData" :chartData="rightChartData" :options="barOptions" />
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import client3B from "@/api/client3B";
import print from "@/modules/mixin/print";
import errorHandler from "@/views/errorHandler";
import BarChart from "@/components/charts/horizontalBar.vue";
import DoughnutChart from "@/components/charts/doughnut.vue";

export default {
    mixins: [print],
    components: {
        BarChart,
        DoughnutChart,
    },
    data: () => ({
        areas: [],
        regions: [],
        organigram: [],
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
                },
            },
        },
        left: {
            region: null,
            area: null,
            person: null,
            start: undefined,
            end: undefined,
        },
        right: {
            region: null,
            area: null,
            person: null,
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
            try {
                const [
                    {
                        data: { result: regions },
                    },
                    {
                        data: { result: areas },
                    },
                    {
                        data: { result: organigram },
                    },
                ] = await Promise.all([
                    client3B.organizationUnit.getAllRegions(),
                    client3B.organizationUnit.getAllAreas(),
                    client3B.organizationUnit.getOrganigram(),
                ]);
                this.regions = regions;
                this.areas = areas;
                this.organigram = organigram;
            } catch (error) {
                errorHandler(this, error);
            }
        },
        filterOption(input, option) {
            return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        },
        async getReport() {
            this.loading = true;
            this.bannerError = null;
            if (this.left.region === null || this.right.region === null) {
                this.bannerError = "Al menos una región debe ser seleccionada";
                this.loading = false;
                return;
            }
            if (
                this.left.start === undefined
                || this.right.start === undefined
                || this.left.end === undefined
                || this.right.end === undefined
            ) {
                this.bannerError = "Selecciona un rango de fechas correcto";
                this.loading = false;
                return;
            }

            try {
                // Objectives - Capabilities Left-Report
                let AreaId = 0;
                let RegionId = this.left.region;
                if (this.left.area) AreaId = this.left.area;
                const [                    
                    {
                        data: { result: leftObjectives },
                    },
                    {
                        data: { result: leftCapabilities },
                    },
                ] = await this.getAdminLeftReport(RegionId, AreaId);

                // Objectives - Capabilities Right-Report
                RegionId = this.left.region;
                if (this.right.area) AreaId = this.right.area;
                const [
                    {
                        data: { result: rightObjectives },
                    },
                    {
                        data: { result: rightCapabilities },
                    },
                ] = await this.getAdminRightReport(RegionId, AreaId);

                // Left Doughnut Chart
                this.populateLeftObjectivesChart(leftObjectives);
                // Right Doughnut Chart
                this.populateRightObjectivesChart(rightObjectives);
                // Left Horizontal Bar Chart
                this.populateLeftHorizontalChart(leftCapabilities);
                // Right Horizontal Bar Chart
                this.populateRightHorizontalChart(rightCapabilities);
            } catch (error) {
                errorHandler(this, error);
            } finally {
                this.loading = false;
            }
        },
        getAdminLeftReport(RegionId, AreaId) {
            return Promise.all([
                client3B.report.getAdminObjectivesReport({
                    RegionId,
                    AreaId,
                    JobDescription: this.left.person,
                    StarTime: this.left.start.toISOString(),
                    EndDateTime: this.left.end.toISOString(),
                    UserId: this.left.person,
                }),
                client3B.report.getAdminCapabilitiesReport({
                    RegionId,
                    AreaId,
                    JobDescription: this.left.person,
                    StarTime: this.left.start.toISOString(),
                    EndDateTime: this.left.end.toISOString(),
                    UserId: this.left.person,
                }),                
            ]);
        },
        getAdminRightReport(RegionId, AreaId) {
            return Promise.all([
                client3B.report.getAdminObjectivesReport({
                    RegionId,
                    AreaId,
                    JobDescription: this.right.person,
                    StarTime: this.right.start.toISOString(),
                    EndDateTime: this.right.end.toISOString(),
                    UserId: this.right.person,
                }),
                client3B.report.getAdminCapabilitiesReport({
                    RegionId,
                    AreaId,
                    JobDescription: this.right.person,
                    StarTime: this.right.start.toISOString(),
                    EndDateTime: this.right.end.toISOString(),
                    UserId: this.right.person,
                }),
            ]);
        },
        populateLeftHorizontalChart(leftCapabilities) {
            this.leftChartData = {
                labels: leftCapabilities.map((item) => item.name),
                datasets: [
                    {
                        label: "Insatisfactorio",
                        data: leftCapabilities.map((item) => item.unsatisfactory),
                        backgroundColor: "#e94e6f",
                    },
                    {
                        label: "Cumple Requerimiento",
                        data: leftCapabilities.map((item) => item.satisfactory),
                        backgroundColor: "#498bc9",
                    },
                    {
                        label: "Excede Requerimiento",
                        data: leftCapabilities.map((item) => item.exceeds),
                        backgroundColor: "#1ab394",
                    },
                ],
            };
        },
        populateRightHorizontalChart(rightCapabilities) {
            this.rightChartData = {
                labels: rightCapabilities.map((item) => item.name),
                datasets: [
                    {
                        label: "Insatisfactorio",
                        data: rightCapabilities.map((item) => item.unsatisfactory),
                        backgroundColor: "#e94e6f",
                    },
                    {
                        label: "Satisfactorio",
                        data: rightCapabilities.map((item) => item.satisfactory),
                        backgroundColor: "#498bc9",
                    },
                    {
                        label: "Excede",
                        data: rightCapabilities.map((item) => item.exceeds),
                        backgroundColor: "#1ab394",
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
                        backgroundColor: ["#1ab394", "#ff3b3b"],
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
                        backgroundColor: ["#1ab394", "#ff3b3b"],
                    },
                ],
                labels: ["Cumplidos", "No cumplidos"],
            };
        },
    },
    computed: {
        leftAreas() {
            if (!this.left.region) return [];
            return this.areas.filter((area) => area.parentId === this.left.region);
        },
        rightAreas() {
            if (!this.right.region) return [];
            return this.areas.filter((area) => area.parentId === this.right.region);
        },
        leftPeople() {
            if (!this.left.area) return [];
            const area = this.organigram.find((org) => org.parentId !== null && org.id === this.left.area);
            return area.organizationUnitUsers;
        },
        rightPeople() {
            if (!this.right.area) return [];
            const area = this.organigram.find((org) => org.parentId !== null && org.id === this.right.area);
            return area.organizationUnitUsers;
        },
    },
};
</script>

<style scoped>
.ant-btn:hover {
    color: #1ab394;
    border-color: #1ab394;
}
.ant-btn::selection {
    background: #1ab394 !important;
    border-color: #1ab394;
}
.ant-btn::before {
    border-color: #1ab394;
}
.column--width {
    width: 100%
}
</style>
