<template>
<div>
    <a-row class="main-content">
        <h3 class="breadcrumb-header">Objetivos</h3>
        <a-col v-if="loaded" :span="12" class="text-center">
            <p>2019-1</p>
            <div class="small">
                <chart v-if="loaded" :chartdata="chartdata" :options="options"/>
            </div>
        </a-col>
        <a-col v-if="loaded" :span="12" class="text-center">
            <p>2018-2</p>
            <div class="small">
                <chart v-if="loaded" :chartdata="chartdata2" :options="options2"/>
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
        <h3 class="breadcrumb-header">Competencias</h3>
        <a-row v-show="spin">
            <div style="text-align: center; margin-top: 20px;">
                <a-spin tip="Cargando..." size="small" />
            </div>
        </a-row>
        <a-col :span="8" class="text-left">
            <a-list
                itemLayout="horizontal"
                :dataSource="subseccions"
            >
                <a-list-item slot="renderItem" slot-scope="item, index">
                    {{item.title}}
                </a-list-item>
            </a-list>
        </a-col>
        <a-col :span="12" class="text-center">
            <div class="radar--size">
                <radar-chart v-if="loaded2"
                    :chartdata="compentecesData"
                    :options="compentecesOptions"
                />
            </div>
        </a-col>
    </a-row>
</div>
</template>
<script>
import client3B from '@/api/client3B';
import errorHandler from '@/views/errorHandler';
import Chart from '@/components/charts/doughnut.vue';
import RadarChart from '@/components/charts/radar.vue';

export default {
    name: 'Objectives',
    components: { Chart, RadarChart },
    data: () => ({

        spin: false,
        loaded: false,
        loaded2: false,

        chartdata: null,
        options: null,

        chartdata2: null,
        options2: null,

        subseccions: [],
        compentecesData: null,
        compentecesOptions: null,
    }),
    async mounted() {
        this.getCollaboratorObjectives();
    },
    methods: {
        async getCollaboratorCompetences(
            currentTemplateId,
            currentTerm,
            currrentDays,
            beforeTemplateId,
            beforeTerm,
            beforeDays,
        ) {
            this.loaded2 = false;

            const labels = [];
            let response = null;
            const beforeData = [];
            const currrentData = [];

            try {
                response = await client3B.report.GetCollaboratorEvaluationComparision(
                    currentTemplateId,
                    currentTerm,
                    currrentDays,
                    beforeTemplateId,
                    beforeTerm,
                    beforeDays,
                );

                const beforeEvaluation = response.data.result.rightEvaluation;
                const currentEvaluation = response.data.result.leftEvaluation;

                for (let i = 0; i < currentEvaluation.sections.length; i += 1) {
                    labels.push(currentEvaluation.sections[i].name);
                    this.subseccions.push({ title: currentEvaluation.sections[i].name });
                    beforeData.push(beforeEvaluation.sections[i].finishedQuestions);
                    currrentData.push(currentEvaluation.sections[i].finishedQuestions);
                }

                this.compentecesData = {
                    labels,
                    datasets: [
                        {
                            label: '2019-1',
                            data: currrentData,
                            borderWidth: 2,
                            borderColor: '#00b880',
                            backgroundColor: '#00b88088',
                        },
                        {
                            label: '2018-2',
                            data: beforeData,
                            borderWidth: 2,
                            borderColor: '#b6b6b6',
                            backgroundColor: '#b6b6b688',
                        },
                    ],
                };
                this.compentecesOptions = {
                    responsive: true,
                    maintainAspectRatio: true,
                };
                this.loaded2 = true;
            } catch (error) {
                errorHandler(this, error);
            }
        },
        async getCollaboratorObjectives() {
            this.spin = true;
            this.loaded = false;
            let response = null;

            try {
                response = await client3B.report.getCollaboratorReport();

                const results = response.data.result;

                if (results.length < 2) {
                    this.spin = false;
                    this.$message.success('No hay información para obtener resultados');
                    return;
                }

                const total = [results[0].total, results[1].total];
                const finished = [results[0].finished, results[1].finished];
                const beforeTerm = results[1].term;
                const currentTerm = results[0].term;
                const beforeDays = this.getYearDays(results[1].creationTime);
                const currrentDays = this.getYearDays(results[0].creationTime);
                const beforeTemplateId = results[1].evaluationTemplateId;
                const currentTemplateId = results[0].evaluationTemplateId;

                await this.getCollaboratorCompetences(
                    currentTemplateId,
                    currentTerm,
                    currrentDays,
                    beforeTemplateId,
                    beforeTerm,
                    beforeDays,
                );

                this.chartdata = {
                    datasets: [{
                        data: [finished[0], total[0] - finished[0]],
                        backgroundColor: [
                            '#00b880',
                            '#ff3b3b',
                        ],
                    }],
                    labels: ['Cumplidos', 'No cumplidos'],
                };
                this.options = {
                    display: true,
                    labels: {
                        fontColor: 'rgb(255, 99, 132)',
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                };
                this.chartdata2 = {
                    datasets: [{
                        data: [finished[1], total[1] - finished[1]],
                        backgroundColor: [
                            '#00b880',
                            '#ff3b3b',
                        ],
                    }],
                    labels: ['Cumplidos', 'No cumplidos'],
                };
                this.options2 = {
                    responsive: true,
                    maintainAspectRatio: true,
                };
                this.spin = false;
                this.loaded = true;
            } catch (error) {
                errorHandler(this, error);
            }
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
