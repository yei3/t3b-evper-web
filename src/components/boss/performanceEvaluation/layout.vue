<template>
    <div>
        <a-row :gutter="32" class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1>Evaluaciones de Desempeño</h1>
            </a-col>
            <a-col :span="24">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link
                            class="breadcrumb-path"
                            :to="{ name: 'boss-home' }"
                        >
                            Home Colaborador
                        </router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <router-link
                            class="breadcrumb-path"
                            :to="{ name: 'boss-assessments' }">
                            Evaluaciones de desempeño
                        </router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <strong class="breadcrumb-path-active">Ver Evaluación</strong>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
        </a-row>
        <a-row class="main-content" style="margin-top: 30px;">
            <a-col :span="24" style="padding-bottom: 30px;">
                <evaluation />
            </a-col>
        </a-row>
    </div>
</template>

<script>
import evaluation from '@/components/boss/performanceEvaluation/evaluation.vue';

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

<style scoped>
.main-content >>> .form-autoevaluation {
    background-color: #fff;
}
</style>
