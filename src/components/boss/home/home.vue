<template>
    <div>
        <a-row :gutter="32">
            <a-col :lg="12" :sm="24">
                <next-evaluation-period />
            </a-col>
            <a-col :lg="12" :sm="24">
                <boss-issues/>
            </a-col>
        </a-row>
        <a-row style="margin-top: 30px;">
            <a-col :span="24" style="padding-bottom: 30px;">
                <pending-colaborator-evaluations />
            </a-col>
            <a-col :span="24" style="padding-bottom: 30px;">
                <colaborator-evaluations />
            </a-col>
            <a-col :span="24">
                <current-colaborator-objectives />
            </a-col>
        </a-row>
    </div>
</template>

<script>
import nextEvaluationPeriod from '@/components/boss/home/nextEvaluationPeriod.vue';
import bossIssues from '@/components/boss/home/bossIssues.vue';
import pendingColaboratorEvaluations from '@/components/boss/home/pendingColaboratorEvaluations.vue';
import colaboratorEvaluations from '@/components/boss/home/colaboratorEvaluations.vue';
import currentColaboratorObjectives from '@/components/boss/home/currentColaboratorObjectives.vue';

export default {
    components: {
        nextEvaluationPeriod,
        bossIssues,
        pendingColaboratorEvaluations,
        colaboratorEvaluations,
        currentColaboratorObjectives,
    },
};
</script>

<style>

</style>
