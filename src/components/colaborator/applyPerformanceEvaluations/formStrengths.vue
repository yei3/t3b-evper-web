<template>
    <a-col class="form-autoevaluation">
        <a-row class="form-tittle">
            <a-col :span="24">
                <h1>Fortalezas</h1>
            </a-col>
            <a-col :span="24">
                <span>
                    Las Fortalezas son características que otros reconocen en ti
                    y te permiten alcanzar tus objetivos.
                </span>
            </a-col>
            <a-col :span="24">
                <a-input
                    :key="i"
                    :placeholder="'Fortaleza ' + i + '...'"
                    v-for="i in formOptions.strengthsInputs"
                />
            </a-col>
        </a-row>
    </a-col>
</template>

<script>
export default {
    data() {
        return {
            formOptions: {
                strengthsInputs: 5,
            },
        };
    },
};
</script>

<style scoped>

</style>
