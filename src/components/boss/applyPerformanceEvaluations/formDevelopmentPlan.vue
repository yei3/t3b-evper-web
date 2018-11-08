<template>
    <a-col class="form-autoevaluation">
        <a-row class="form-tittle">
            <a-col :span="24">
                <h1>Plan de Desarrollo y Capacitación</h1>
            </a-col>
            <a-col :span="24" style="padding: 10px 16px;">
                <span>
                    Acciones y objetivos del plan de capacitación.
                </span>
            </a-col>
            <a-col :span="24" style="padding: 10px 15px 20px 15px;">
                <div style="padding: 5px 0px;">
                    <a-textarea
                        placeholder="Detalle del plan de desarrollo..."
                        :rows="6"
                        :disabled="onlyLecture"
                    />
                </div>
            </a-col>
        </a-row>
    </a-col>
</template>

<script>
export default {
    props: {
        onlyLecture: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
        };
    },
};
</script>

<style scoped>

</style>
