<template>
    <div class="main-content">
        <a-row :gutter="32" style="margin-top: 30px;">
            <a-col :lg="12" :sm="24">
                <next-evaluation-period />
            </a-col>
            <a-col :lg="12" :sm="24">
                <collaborator-issues/>
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
import nextEvaluationPeriod from '@/components/collaborator/home/nextEvaluationPeriod.vue';
import collaboratorIssues from '@/components/collaborator/home/collaboratorIssues.vue';
import pendingAutoEvaluations from '@/components/collaborator/home/pendingAutoEvaluations.vue';
import bossEvaluations from '@/components/collaborator/home/bossEvaluations.vue';
import currentObjectives from '@/components/collaborator/home/currentObjectives.vue';

export default {
    components: {
        nextEvaluationPeriod,
        collaboratorIssues,
        pendingAutoEvaluations,
        bossEvaluations,
        currentObjectives,
    },
};
</script>

<style>

</style>
