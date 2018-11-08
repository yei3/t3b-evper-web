<template>
    <div>
        <a-row :gutter="32"  class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Evaluaciones de Desempeño</h1>
            </a-col>
            <a-col :span="24">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'collaborator-home' }"
                            class="breadcrumb-path"
                        >
                            Home Colaborador
                        </router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <strong class="breadcrumb-path-active">Evaluaciones de desempeño</strong>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
        </a-row>
        <a-row class="main-content" style="margin-top: 30px;">
            <a-col :span="24" style="padding-bottom: 30px;">
                <evaluations-history />
            </a-col>
        </a-row>
    </div>
</template>

<script>
import evaluationsHistory from '@/components/collaborator/performanceEvaluations/evaluationsHistory.vue';

export default {
    components: {
        evaluationsHistory,
    },
};
</script>

<style>

</style>
