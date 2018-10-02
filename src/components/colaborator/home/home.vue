<template>
    <div>
        <a-row :gutter="32">
            <a-col :lg="12" :sm="24">
                <next-evaluation-period />
            </a-col>
            <a-col :lg="12" :sm="24">
                <colaborator-issues/>
            </a-col>
        </a-row>
        <a-row style="margin-top: 30px;">
            <a-col :span="24">
                <pending-auto-evaluations />
            </a-col>
        </a-row>
    </div>
</template>

<script>
import nextEvaluationPeriod from '@/components/colaborator/home/nextEvaluationPeriod.vue';
import colaboratorIssues from '@/components/colaborator/home/colaboratorIssues.vue';
import pendingAutoEvaluations from '@/components/colaborator/home/pendingAutoEvaluations.vue';

export default {
    components: {
        nextEvaluationPeriod,
        colaboratorIssues,
        pendingAutoEvaluations,
    },
};
</script>

<style>

</style>
