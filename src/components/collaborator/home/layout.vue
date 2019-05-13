<template>
    <div class="main-content">
        <a-row :gutter="32" style="margin-top: 30px;">
            <!-- <a-col :lg="6" :sm="24" style="text-align: center">
                <br/>
                <h2></h2>
            </a-col> -->
            <a-col :lg="6" :sm="24"></a-col>
            <a-col :lg="12" :sm="24">
                <next-evaluation-period />
            </a-col>

            <a-col :lg="6" :sm="24" style="text-align: center"></a-col>
        </a-row>
        <a-row style="margin-top: 30px;">
            <a-col :span="24">
                <current-objectives />
            </a-col>
            <a-col :span="24">
                <current-actions />
            </a-col>
            <a-col :span="24">
                <pending-auto-evaluations />
            </a-col>
            <a-col :span="24">
                <boss-evaluations />
            </a-col>
        </a-row>
    </div>
</template>

<script>
import nextEvaluationPeriod from "@/components/collaborator/home/nextEvaluationPeriod.vue";
import collaboratorIssues from "@/components/collaborator/home/collaboratorIssues.vue";
import pendingAutoEvaluations from "@/components/collaborator/home/pendingAutoEvaluations.vue";
import bossEvaluations from "@/components/collaborator/home/bossEvaluations.vue";
import currentObjectives from "@/components/collaborator/home/currentObjectives.vue";
import currentActions from "@/components/collaborator/home/currentActions.vue";

export default {
    components: {
        nextEvaluationPeriod,
        collaboratorIssues,
        pendingAutoEvaluations,
        bossEvaluations,
        currentObjectives,
        currentActions,
    },
};
</script>

<style scoped>
    .dropdown-icon {
        color: #fff;
    }
</style>
