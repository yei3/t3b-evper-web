<template>
<div>
    <a-row :gutter="32"  class="breadcrumb-wrapper">
        <a-col :span="24">
            <h1 class="breadcrumb-header">Resultados de mis Evaluaciones</h1>
        </a-col>
    </a-row>
    <a-row :gutter=32>
        <div class="collapse-content">
            <a-row class="results-header">
                <h2 class="breadcrumb-header">{{username}}</h2>
                <p class="results-subtitle">Informe de Evaluación de desempeño</p>
                <p class="results-period">Periodo 2019-1</p>
            </a-row>
            <a-divider />
            <report />
        </div>
    </a-row>
</div>
</template>
<script>
import authService from '@/services/auth';
import report from '@/components/boss/reports/report.vue';

export default {
    data: () => ({
        user: authService.getUserData(),
    }),
    components: {
        report,
    },
    computed: {
        username() {
            // return `${this.user.name}`;
            return `${this.user.name} ${this.user.surname}`;
        },
    },
};
</script>
<style>
    .results-header{
        margin: 16px 0 0 8px;
    }
    .results-subtitle {
        color: #ff1515;
        font-weight: 600;

    }
    .results-period {
        color: black;
        font-weight: bold;
        font-size: 13px;
    }
</style>
