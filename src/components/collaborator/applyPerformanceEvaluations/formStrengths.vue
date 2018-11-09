<template>
    <a-col class="form-autoevaluation">
        <a-row class="form-tittle">
            <a-col :span="24">
                <h1>Fortalezas</h1>
            </a-col>
            <a-col :span="24" style="padding: 10px 16px;">
                <span>
                    Las Fortalezas son características que otros reconocen en ti
                    y te permiten alcanzar tus objetivos.
                </span>
            </a-col>
            <a-col :span="24" style="padding: 10px 15px 20px 15px;">
                <div :key="i" v-for="i in formOptions.strengthsInputs"
                    style="padding: 5px 0px;"
                >
                    <a-input
                        :placeholder="'Fortaleza ' + i + '...'"
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
            formOptions: {
                strengthsInputs: 5,
            },
        };
    },
};
</script>

<style scoped>

</style>
