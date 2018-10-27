<template>
    <a-col class="form-autoevaluation">
        <a-row class="form-tittle">
            <a-col :span="24">
                <h1>Plan de Desarrollo y Capacitación</h1>
            </a-col>
            <a-col :span="24">
                <span>
                    Acciones y objetivos del plan de capacitación.
                </span>
            </a-col>
            <a-col :span="24">
                <a-textarea placeholder="Detalle del plan de desarrollo..." :rows="6"/>
            </a-col>
        </a-row>
    </a-col>
</template>

<script>
export default {
    data() {
        return {
        };
    },
};
</script>

<style scoped>

</style>
