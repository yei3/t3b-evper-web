<template>
<div>
    <a-row class="main-content">
        <h3 class="breadcrumb-header">Objetivos</h3>
        <a-col :span="12" class="text-center">
            <p>2019-1</p>
            <div class="small">
                <chart v-if="loaded" :chartdata="chartdata" :options="options"/>
            </div>
        </a-col>
        <a-col :span="12" class="text-center">
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
        <a-col :span="12" class="text-center">
            <p>2019-1</p>
            <div class="small">
                <chart v-if="loaded" :chartdata="chartdata" :options="options"/>
            </div>
        </a-col>
        <a-col :span="12" class="text-center">
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
</div>
</template>
<script>
import client3B from '@/api/client3B';

import errorHandler from '@/views/errorHandler';
import Chart from '@/components/charts/doughnut.vue';

export default {
    name: 'Objectives',
    components: { Chart },
    data: () => ({
        spin: false,
        loaded: false,
        chartdata: null,
        options: null,
        chartdata2: null,
        options2: null
    }),
    async mounted () {
        this.getCollaboratorObjectives()
    },
    methods: {
        
        async getCollaboratorObjectives (){
            this.spin = true
            this.loaded = false            
            let total = [0, 0]
            let finished = [0, 0]
            let response = null
            try {
                response = await client3B.report.getCollaboratorReport()
                const result = response.data.result
                total[0] = result[0].total
                finished[0] = result[0].finished
                total[1] = result[1].total
                finished[1] = result[1].finished
                this.chartdata = {                
                    datasets: [{                
                        data: [finished[0], total[0]-finished[0]],
                        backgroundColor: [
                            '#00b880',
                            '#ff3b3b'
                        ]
                    }],
                    labels: ['Cumplidos', 'No cumplidos'],
                },
                this.options = {
                    display: true,
                    labels: {
                        fontColor: 'rgb(255, 99, 132)'
                    },
                    responsive: true,
                    maintainAspectRatio: true
                },
                this.chartdata2 = {                
                    datasets: [{                
                        data: [finished[1], total[1]-finished[1]],
                        backgroundColor: [
                            '#00b880',
                            '#ff3b3b'
                        ]
                    }],
                    labels: ['Cumplidos', 'No cumplidos'],
                },
                this.options2 = {
                    responsive: true,
                    maintainAspectRatio: true
                }
                this.spin = false
                this.loaded = true
            } catch (e) {
                console.error(e)
            }
        }
    }
}
</script>
<style>
    .small {
        color: #00b880;
        max-width: 256px;
        margin: 0px auto;
    }
</style>


