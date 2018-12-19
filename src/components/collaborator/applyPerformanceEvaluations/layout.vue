<template>
    <div>
        <a-row :gutter="32" class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Evaluaciones de Desempeño</h1>
            </a-col>
            <a-col :span="24">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link
                            class="breadcrumb-path"
                            :to="{ name: 'collaborator-home' }"
                        >
                            Home Colaborador
                        </router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <strong class="breadcrumb-path-active">Realizar auto-evaluación</strong>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
        </a-row>
        <a-row class="main-content" style="margin-top: 30px;">
            <a-col :span="24" style="padding-bottom: 30px;">
                <make-evaluation />
            </a-col>
        </a-row>
    </div>
</template>

<script>
import makeEvaluation from '@/components/collaborator/applyPerformanceEvaluations/makeEvaluation.vue';

export default {
    components: {
        makeEvaluation,
    },
};
</script>

<style>

</style>
