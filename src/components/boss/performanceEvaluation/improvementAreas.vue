<template>
    <form-improvement-areas :onlyLecture="onlyLecture" />
</template>

<script>
import formImprovementAreas from '@/components/boss/applyPerformanceEvaluations/formImprovementAreas.vue';

export default {
    props: {
        onlyLecture: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        formImprovementAreas,
    },
};
</script>

<style scoped>

</style>
