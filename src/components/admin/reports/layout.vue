<template>
    <div>
        <a-row :gutter="32"  class="breadcrumb-wrapper">
            <a-col :h2="24">
                <h1 class="breadcrumb-header">Resultados de Evaluación | Análisis Comparativo</h1>
            </a-col>
            <a-col :h2="24">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-reports' }"
                            class="breadcrumb-path"
                        >
                            Resultados
                        </router-link>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
        </a-row>
        <div class="collapse-content"
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
                        <h5>Región: </h5>
                        <a-select style="width: 100%" v-model="left.region"
                            @change="left.area = null"
                        >
                            <a-select-option v-for="region in regions" :key="region.id"
                                :value="region.id"
                            >
                                {{region.displayName}}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Área: </h5>
                        <a-select style="width: 100%" v-model="left.area"
                            @change="left.person = null"
                        >
                            <a-select-option v-for="area in leftAreas" :key="area.id"
                                :value="area.id"
                            >
                                {{area.displayName}}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Puesto: </h5>
                        <a-select style="width: 100%" v-model="left.person">
                            <a-select-option v-for="person in leftPeople" :key="person.id"
                                :value="person.id"
                            >
                                {{person.jobDescription}}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Evaluado: </h5>
                        <a-select style="width: 100%" v-model="left.person" showSearch
                            :filterOption="filterOption"
                        >
                            <a-select-option v-for="person in leftPeople" :key="person.id"
                                :value="person.id"
                            >
                                {{person.fullName}}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Fecha Inicio: </h5>
                        <a-date-picker placeholder="Fecha Inicio" v-model="left.start" />
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Fecha Fin: </h5>
                        <a-date-picker placeholder="Fecha Fin" v-model="left.end" />
                    </a-col>
                </a-col>
                <a-col :sm="24" :md="12">
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Región: </h5>
                        <a-select style="width: 100%" v-model="right.region"
                            @change="right.area = null"
                        >
                            <a-select-option v-for="region in regions" :key="region.id"
                                :value="region.id"
                            >
                                {{region.displayName}}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Área: </h5>
                        <a-select style="width: 100%" v-model="right.area"
                            @change="right.person = null"
                        >
                            <a-select-option v-for="area in rightAreas" :key="area.id"
                                :value="area.id"
                            >
                                {{area.displayName}}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Puesto: </h5>
                        <a-select style="width: 100%" v-model="right.person">
                            <a-select-option v-for="person in rightPeople" :key="person.id"
                                :value="person.id"
                            >
                                {{person.jobDescription}}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Evaluado: </h5>
                        <a-select style="width: 100%" v-model="right.person" showSearch
                            :filterOption="filterOption"
                        >
                            <a-select-option v-for="person in rightPeople" :key="person.id"
                                :value="person.id"
                            >
                                {{person.fullName}}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Fecha Inicio: </h5>
                        <a-date-picker placeholder="Fecha Inicio" v-model="right.start" />
                    </a-col>
                    <a-col :sm="24" :md="24" :lg="24" :xl="12">
                        <h5>Fecha Fin: </h5>
                        <a-date-picker placeholder="Fecha Fin" v-model="right.end" />
                    </a-col>
                </a-col>
                <a-col :md="24" style="text-align: center; padding-top: 20px;">
                    <a-alert v-show="bannerError" banner closable
                        :message="bannerError"
                    />
                    <br/>
                    <a-button type="primary" @click="getReport"
                        :loading="loading"
                        :disabled="loading"
                    >
                        Comparar
                    </a-button>
                </a-col>
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
                        <doughnut-chart v-if="leftObjectivesData"
                            :chartdata="leftObjectivesData"
                            :options="leftObjectivesOptions"
                        />
                    </div>
                </a-col>
                <a-col :span="12" class="text-center">
                    <div class="small">
                        <doughnut-chart v-if="rightObjectivesData"
                            :chartdata="rightObjectivesData"
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
                    <bar-chart v-if="leftChartData"
                        :chartData="leftChartData"
                        :options="barOptions"
                    />
                </a-col>
                <a-col :sm="24" :md="12">
                    <bar-chart v-if="rightChartData"
                        :chartData="rightChartData"
                        :options="barOptions"
                    />
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import client3B from '@/api/client3B';
import errorHandler from '@/views/errorHandler';
import BarChart from '@/components/charts/horizontalBar.vue';
import DoughnutChart from '@/components/charts/doughnut.vue';

export default {
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
                text: 'Reporte de Objetivos A',
            },
            display: true,
            labels: {
                fontColor: 'rgb(255, 99, 132)',
            },
            responsive: true,
            maintainAspectRatio: true,
        },
        rightObjectivesData: null,
        rightObjectivesOptions: {
            title: {
                display: true,
                text: 'Reporte de Objetivos B',
            },
            display: true,
            labels: {
                fontColor: 'rgb(255, 99, 132)',
            },
            responsive: true,
            maintainAspectRatio: true,
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
                text: 'Reporte de Capacidades',
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true,
                    // barThickness: 10,
                }],
            },
        },
    }),
    created() {
        this.init();
    },
    methods: {
        async init() {
            let response = await client3B.organizationUnit.getAllRegions()
                .catch(error => errorHandler(this, error));
            this.regions = response.data.result;

            response = await client3B.organizationUnit.getAllAreas()
                .catch(error => errorHandler(this, error));
            this.areas = response.data.result;

            response = await client3B.organizationUnit.getOrganigram()
                .catch(error => errorHandler(this, error));
            this.organigram = response.data.result;
        },
        filterOption(input, option) {
            return option.componentOptions.children[0].text.toLowerCase()
                .indexOf(input.toLowerCase()) >= 0;
        },
        async getReport() {
            this.loading = true;
            this.bannerError = null;
            if (this.left.region === null || this.right.region === null) {
                this.bannerError = 'Al menos una región debe ser seleccionada';
                this.loading = false;
                return;
            }
            if (this.left.start === undefined || this.right.start === undefined
                || this.left.end === undefined || this.right.end === undefined) {
                this.bannerError = 'Selecciona un rango de fechas correcto';
                this.loading = false;
                return;
            }

            // Objectives - Capabilities Left-Report
            let AreaId = 0;
            let RegionId = this.left.region;
            if (this.left.area) AreaId = this.left.area;

            let response = await client3B.report.getAdminReport({
                RegionId,
                AreaId,
                JobDescription: this.left.person,
                StarTime: this.left.start.toISOString(),
                EndDateTime: this.left.end.toISOString(),
                UserId: this.left.person,
            }).catch(error => errorHandler(this, error));
            const leftReport = response.data.result;

            response = await client3B.report.getAdminObjectivesReport({
                RegionId,
                AreaId,
                JobDescription: this.right.person,
                StarTime: this.right.start.toISOString(),
                EndDateTime: this.right.end.toISOString(),
                UserId: this.right.person,
            }).catch(error => errorHandler(this, error));
            const leftObjectives = response.data.result;

            // Objectives - Capabilities Right-Report
            AreaId = 0;
            RegionId = this.left.region;
            if (this.right.area) AreaId = this.right.area;
            response = await client3B.report.getAdminReport({
                RegionId,
                AreaId,
                JobDescription: this.right.person,
                StarTime: this.right.start.toISOString(),
                EndDateTime: this.right.end.toISOString(),
                UserId: this.right.person,
            }).catch(error => errorHandler(this, error));
            const rightReport = response.data.result;

            response = await client3B.report.getAdminObjectivesReport({
                RegionId,
                AreaId,
                JobDescription: this.right.person,
                StarTime: this.right.start.toISOString(),
                EndDateTime: this.right.end.toISOString(),
                UserId: this.right.person,
            }).catch(error => errorHandler(this, error));
            const rightObjectives = response.data.result;

            // Left Chart
            const leftU = (leftObjectives.totalObjectives - leftObjectives.validatedObjectives);
            this.leftObjectivesData = {
                datasets: [{
                    data: [leftObjectives.validatedObjectives, leftU],
                    backgroundColor: [
                        '#00b880',
                        '#ff3b3b',
                    ],
                }],
                labels: ['Cumplidos', 'No cumplidos'],
            };
            // Right Chart
            const rightU = (rightObjectives.totalObjectives - rightObjectives.validatedObjectives);
            this.rightObjectivesData = {
                datasets: [{
                    data: [rightObjectives.validatedObjectives, rightU],
                    backgroundColor: [
                        '#00b880',
                        '#ff3b3b',
                    ],
                }],
                labels: ['Cumplidos', 'No cumplidos'],
            };

            this.leftChartData = {
                labels: leftReport.map(item => item.name),
                datasets: [
                    {
                        label: 'Insatisfactorio',
                        data: leftReport.map(item => item.unsatisfactory),
                        backgroundColor: '#e94e6f',
                    },
                    {
                        label: 'Cumple Requerimiento',
                        data: leftReport.map(item => item.satisfactory),
                        backgroundColor: '#498bc9',
                    },
                    {
                        label: 'Excede Requerimiento',
                        data: leftReport.map(item => item.exceeds),
                        backgroundColor: '#2eaa79',
                    },
                ],
            };

            this.rightChartData = {
                labels: rightReport.map(item => item.name),
                datasets: [
                    {
                        label: 'Insatisfactorio',
                        data: rightReport.map(item => item.unsatisfactory),
                        backgroundColor: '#e94e6f',
                    },
                    {
                        label: 'Satisfactorio',
                        data: rightReport.map(item => item.satisfactory),
                        backgroundColor: '#498bc9',
                    },
                    {
                        label: 'Excede',
                        data: rightReport.map(item => item.exceeds),
                        backgroundColor: '#2eaa79',
                    },
                ],
            };

            this.loading = false;
        },
    },
    computed: {
        leftAreas() {
            if (!this.left.region) return [];
            return this.areas.filter(area => area.parentId === this.left.region);
        },
        rightAreas() {
            if (!this.right.region) return [];
            return this.areas.filter(area => area.parentId === this.right.region);
        },
        leftPeople() {
            if (!this.left.area) return [];
            const area = this.organigram
                .find(org => org.parentId !== null && org.id === this.left.area);
            return area.organizationUnitUsers;
        },
        rightPeople() {
            if (!this.right.area) return [];
            const area = this.organigram
                .find(org => org.parentId !== null && org.id === this.right.area);
            return area.organizationUnitUsers;
        },
    },
};
</script>

<style scoped>
</style>
