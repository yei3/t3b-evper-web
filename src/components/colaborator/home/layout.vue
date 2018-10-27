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
            <a-col :span="24" style="padding-bottom: 30px;">
                <pending-auto-evaluations />
            </a-col>
            <a-col :span="24" style="padding-bottom: 30px;">
                <boss-evaluations />
            </a-col>
            <a-col :span="24">
                <current-objectives />
            </a-col>
        </a-row>
    </div>
</template>

<script>
import nextEvaluationPeriod from '@/components/colaborator/home/nextEvaluationPeriod.vue';
import colaboratorIssues from '@/components/colaborator/home/colaboratorIssues.vue';
import pendingAutoEvaluations from '@/components/colaborator/home/pendingAutoEvaluations.vue';
import bossEvaluations from '@/components/colaborator/home/bossEvaluations.vue';
import currentObjectives from '@/components/colaborator/home/currentObjectives.vue';

export default {
    components: {
        nextEvaluationPeriod,
        colaboratorIssues,
        pendingAutoEvaluations,
        bossEvaluations,
        currentObjectives,
    },
};
</script>

<style>

</style>
