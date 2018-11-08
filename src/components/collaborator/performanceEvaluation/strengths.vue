<template>
    <form-strengths :onlyLecture="onlyLecture" />
</template>

<script>
import formStrengths from '@/components/collaborator/applyPerformanceEvaluations/formStrengths.vue';

export default {
    props: {
        onlyLecture: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        formStrengths,
    },
};
</script>

<style scoped>

</style>
