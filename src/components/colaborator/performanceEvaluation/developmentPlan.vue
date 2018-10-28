<template>
    <form-development-plan :onlyLecture="onlyLecture" />
</template>

<script>
import formDevelopmentPlan from '@/components/colaborator/applyPerformanceEvaluations/formDevelopmentPlan.vue';

export default {
    props: {
        onlyLecture: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        formDevelopmentPlan,
    },
};
</script>

<style scoped>

</style>
