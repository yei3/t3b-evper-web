<template>
    <div class="main-content">
        <a-row>
            <a-col>
                    <a @click="initNewEvaluationForm">
                        Crear nueva evaluación
                    </a>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    components: {
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
