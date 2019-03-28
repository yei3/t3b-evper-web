<template>
<div>
    <a-row :gutter="32"  class="breadcrumb-wrapper">
        <a-col :span="24">
            <h1 class="breadcrumb-header">Resultados de mis evaluados</h1>
        </a-col>
    </a-row>
    <a-row :gutter=32>
        <div class="collapse-content">
            <a-row class="results-header">
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" style="padding-bottom: 15px;">
                    <a-select style="width: 100%" placeholder="Empleados"
                        v-model="form.evaluado" v-on:change="selUser"
                    >
                        <a-select-option v-for="item in users" :key="item.id"
                        :value="item.id">
                            {{ item.fullName }}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" style="padding-bottom: 15px;">
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" style="padding-bottom: 15px;">
                    <a-button class="btn-green" @click="applyEvaluation()" :loading="loading">
                        Consultar
                    </a-button>
                </a-col>
            </a-row>
            <a-divider />
            <report v-show="showResults" :collaboratorId="this.form.evaluado" :key="this.form.evaluado"/>
        </div>
    </a-row>
</div>
</template>
<script>
import client3B from '@/api/client3B';
import errorHandler from '@/views/errorHandler';
import authService from '@/services/auth';
import report from '@/components/boss/reports/report.vue';

export default {
    data: () => ({
        spin: false,
        loading: false,
        showResults: false,
        user: authService.getUserData(),
        users: [],
        form: {
            evaluado: 0,
        },
    }),
    created() {
        this.getAllUsers();
    },
    components: {
        report,
    },
    computed: {
        username() {
            // return `${this.user.name}`;
            return `${this.user.name} ${this.user.surname}`;
        },
    },
    methods: {
        async getAllUsers() {
            this.spin = true;
            let response = null;
            try {
                response = await client3B.user.getCollaborators();
                this.users = response.data.result;
            } catch (error) {
                errorHandler(this, error);
            }
            this.spin = false;
        },
        async applyEvaluation() {
            this.loading = true;
            this.showResults = true;
            this.loading = false;
        },
        selUser() {
            this.showResults = false;
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
