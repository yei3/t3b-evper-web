<template>
    <a-col class="form-autoevaluation">
        <a-row class="form-tittle">
            <a-col :span="24">
                <h2>Instrucciones</h2>
            </a-col>
        </a-row>
        <a-row style="padding: 70px 10px;">
            <a-col :span="24">
                <span>
                    {{instructions}}
                </span>
            </a-col>
        </a-row>
    </a-col>
</template>

<script>
export default {
    props: {
        instructions: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>

</style>
