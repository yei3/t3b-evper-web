<template>
    <div>
        <a-row :gutter="32" class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Resultados de mis Evaluaciones</h1>
            </a-col>
            <a-col :span="16">
                <h2 class="breadcrumb-header">{{ username }}</h2>
            </a-col>
            <a-col :span="8">
                <p class="results-subtitle">Informe de Evaluación de desempeño</p>
                <p class="results-period">Periodo 2019-1</p>
            </a-col>
        </a-row>
        <report v-if="!objetiveSpin && !isSalesMan" />
        <sales-report v-if="!objetiveSpin && isSalesMan" />
    </div>
</template>
<script>
import client3B from "@/api/client3B";
import authService from "@/services/auth";
import errorHandler from "@/views/errorHandler";
import report from "@/components/collaborator/reports/report.vue";
import salesReport from "@/components/collaborator/reports/salesReport.vue";

export default {
    data: () => ({
        objetiveSpin: true,
        user: authService.getUserData(),
        isSalesMan: false,
    }),
    components: {
        report,
        salesReport,
    },
    computed: {
        username() {
            return `${this.user.name} ${this.user.surname}`;
        },
    },
    beforeCreate() {
        this.IsUserSalesMan();
    },
    methods: {
        async IsUserSalesMan() {
            this.objetiveSpin = true;
            const response = await client3B.user.IsUserSalesMan().catch((error) => {
                
                errorHandler(this, error);
            });
            if (!response) this.isSalesMan = false;
            this.isSalesMan = response.data.result;
            this.objetiveSpin = false;
        },
    },
};
</script>
<style>
.results-header {
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
