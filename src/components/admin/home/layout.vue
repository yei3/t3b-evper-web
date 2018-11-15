<template>
    <div>
        <a-row :gutter="32"  class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Evaluaciones de Personal</h1>
            </a-col>
            <a-col :span="20">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-home' }"
                            class="breadcrumb-path"
                        >
                            Home Administrador
                        </router-link>
                    </a-breadcrumb-item>
                </a-breadcrumb>                
            </a-col>
            <a-col :span="4">
                <a-button type="primary" ghost @click="initNewEvaluationForm">
                    Crear evaluación <a-icon type="plus" />
                </a-button>
            </a-col>
        </a-row>
        <div class="collapse-content" style="background-color: white; margin: 30px 30px;">
            <h3 class="breadcrumb-header">Criterios de búsqueda</h3>
            <a-divider />
            <a-row class="main-content" style="margin-top: 30px;">
                <a-col :span="24" style="padding-bottom: 30px;">
                    <search-evaluation />
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import searchEvaluation from '@/components/admin/search/evaluations.vue';
import createEvaluation from '@/components/admin/createEvaluation/layout.vue';

export default {
    components: {
        searchEvaluation
    },
    methods: {
        ...mapActions({
            clearEvaluationForm: 'clearEvaluationForm',
        }),
        initNewEvaluationForm() {
            this.clearEvaluationForm();
            this.$router.push({ name: 'create-evaluation' });
        },
    },
};
</script>

<style>

</style>
