<template>
    <a-col class="form-autoevaluation">
        <a-row class="form-tittle">
            <a-col :span="24">
                <h1>Áreas de Mejora</h1>
            </a-col>
            <a-col :span="24" style="padding: 10px 16px;">
                <span>
                    Las Áreas de Mejora son aspectos que puedes mejorar y
                    que te permitirían lograr mejores resultados.
                </span>
            </a-col>
            <a-col :span="24" style="padding: 10px 15px 20px 15px;">
                <div :key="i" v-for="i in formOptions.improvementInputs"
                    style="padding: 5px 0px;"
                >
                    <a-input
                        :placeholder="'Mejora ' + i + '...'"
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
                improvementInputs: 5,
            },
        };
    },
};
</script>

<style scoped>

</style>
