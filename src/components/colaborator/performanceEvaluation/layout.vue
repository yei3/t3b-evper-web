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
                        <router-link :to="{ name: 'colaborator-assessments' }">
                            <strong>Evaluaciones de desempeño</strong>
                        </router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <strong>Ver Evaluación</strong>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
        </a-row>
        <a-row style="margin-top: 30px;">
            <a-col :span="24" style="padding-bottom: 30px;">
                <evaluation />
            </a-col>
        </a-row>
    </div>
</template>

<script>
import evaluation from '@/components/colaborator/performanceEvaluation/evaluation.vue';

export default {
    components: {
        evaluation,
    },
    data() {
        return {
        };
    },
};
</script>

<style>

</style>
