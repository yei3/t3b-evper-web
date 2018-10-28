<template>
    <form-objetives :onlyLecture="onlyLecture" />
</template>

<script>
import formObjetives from '@/components/colaborator/applyPerformanceEvaluations/formObjetives.vue';

export default {
    props: {
        onlyLecture: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        formObjetives,
    },
};
</script>

<style scoped>

</style>
