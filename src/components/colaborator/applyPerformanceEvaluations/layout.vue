<template>
    <div class="main-content">
        <a-row :gutter="32">
            <a-col :span="24">
                <h1>Evaluaciones de Desempeño</h1>
            </a-col>
            <a-col :span="24">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'colaborator-home' }">
                            Home Colaborador
                        </router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <strong>Realizar auto-evaluación</strong>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
        </a-row>
        <a-row style="margin-top: 30px;">
            <a-col :span="24" style="padding-bottom: 30px;">
                <make-evaluation />
            </a-col>
        </a-row>
    </div>
</template>

<script>
import makeEvaluation from '@/components/colaborator/applyPerformanceEvaluations/makeEvaluation.vue';

export default {
    components: {
        makeEvaluation,
    },
};
</script>

<style>

</style>
