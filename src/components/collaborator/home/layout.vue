<template>
    <div class="main-content">
        <a-row :gutter="32" style="margin-top: 30px;">
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
        <video-modal-component ref="videoModal" :userRole="role"></video-modal-component>
    </div>
</template>

<script>
// *Utilities
import loginDates from "@/services/loginDates";
import videoPreference from "@/services/videoPreference";
import authService from "@/services/auth";
// *Components
import nextEvaluationPeriod from "@/components/collaborator/home/nextEvaluationPeriod.vue";
import collaboratorIssues from "@/components/collaborator/home/collaboratorIssues.vue";
import pendingAutoEvaluations from "@/components/collaborator/home/pendingAutoEvaluations.vue";
import bossEvaluations from "@/components/collaborator/home/bossEvaluations.vue";
import currentObjectives from "@/components/collaborator/home/currentObjectives.vue";
import currentActions from "@/components/collaborator/home/currentActions.vue";
import videoModalComponent from "@/components/shared/videoModal.vue";

export default {
    components: {
        nextEvaluationPeriod,
        collaboratorIssues,
        pendingAutoEvaluations,
        bossEvaluations,
        currentObjectives,
        currentActions,
        videoModalComponent,
    },
    data() {
        return {
            role: "",
        };
    },
    mounted() {
        if (!videoPreference.getShouldNeverDisplayVideo()) {
            this.role = authService.getCurrentRole();
            const lastLoginDate = loginDates.getPreviousLoginDate();
            if (
                videoPreference.getVideoPreference() ||
                loginDates.hasMoreThanOneDay(lastLoginDate)
            ) {
                this.$refs.videoModal.showModal();
            }
        }
    },
};
</script>

<style scoped>
.dropdown-icon {
    color: #fff;
}
</style>
