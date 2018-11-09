<template>
    <div class="main-content">
        <a-row :gutter="32" style="margin-top: 30px;">
            <a-col :lg="12" :sm="24">
                <next-evaluation-period />
            </a-col>
            <a-col :lg="12" :sm="24">
                <boss-issues/>
            </a-col>
        </a-row>
        <a-row style="margin-top: 30px;">
            <a-col :span="24" style="padding-bottom: 30px;">
                <pending-collaborator-evaluations />
            </a-col>
            <a-col :span="24" style="padding-bottom: 30px;">
                <collaborator-evaluations />
            </a-col>
            <a-col :span="24">
                <current-collaborator-objectives />
            </a-col>
        </a-row>
    </div>
</template>

<script>
import nextEvaluationPeriod from '@/components/boss/home/nextEvaluationPeriod.vue';
import bossIssues from '@/components/boss/home/bossIssues.vue';
import pendingCollaboratorEvaluations from '@/components/boss/home/pendingCollaboratorEvaluations.vue';
import collaboratorEvaluations from '@/components/boss/home/collaboratorEvaluations.vue';
import currentCollaboratorObjectives from '@/components/boss/home/currentCollaboratorObjectives.vue';

export default {
    components: {
        nextEvaluationPeriod,
        bossIssues,
        pendingCollaboratorEvaluations,
        collaboratorEvaluations,
        currentCollaboratorObjectives,
    },
};
</script>

<style>

</style>
