<template>
    <a-col class="form-autoevaluation">
        <a-row class="form-tittle">
            <a-col :span="24">
                <h1>Objetivos para el próximo periodo</h1>
            </a-col>
            <a-col :span="24">
                <a-row :key="i" v-for="i in formOptions.objetivesForms">
                    <a-col :span="24">
                        <span>Objetivo {{i}}</span>
                    </a-col>
                    <a-col :span="12">
                        <a-input placeholder="Objetivo: Específico/Medible/Alcanzable/Real" />
                    </a-col>
                    <a-col :span="6">
                        <a-input placeholder="Entregable" />
                    </a-col>
                    <a-col :span="6">
                        <a-date-picker style="width: 100%" />
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </a-col>
</template>

<script>
export default {
    data() {
        return {
            formOptions: {
                objetivesForms: 5,
            },
        };
    },
};
</script>

<style scoped>

</style>
