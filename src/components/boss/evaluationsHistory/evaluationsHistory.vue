<template>
    <div class="users">
        <a-row class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Historial</h1>
            </a-col>
            <a-col :span="24">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'collaborator-home' }" class="breadcrumb-path">
                            Home
                        </router-link>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
        </a-row>
        <div class="collapse-content">
            <div>
                <a-row class="steps">
                    <span class="breadcrumb-header" style="font-weight: 120;">
                        Objetivos
                    </span>
                </a-row>
                <a-divider />
            </div>

            <!-- Edit form -->
            <div>
                <a-row style="margin-top: 30px;">
                    <a-col :span="24">
                        <history-objectives />
                    </a-col>
                </a-row>
            </div>
            <div>
                <a-row class="steps">
                    <span class="breadcrumb-header" style="font-weight: 120;">
                        Evaluaciones
                    </span>
                </a-row>
                <a-divider />
            </div>

            <!-- Edit form -->
            <div>
                <a-row style="margin-top: 30px;">
                    <a-col :span="24">
                        <closed-evaluations />
                    </a-col>
                </a-row>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import client3B from "@/api/client3B";
import { mapActions, mapGetters } from "vuex";
import Footer from "@/components/layout/Footer.vue";
import closedEvaluations from "@/components/boss/evaluationsHistory/closedEvaluationsHistory.vue";
import historyObjectives from "@/components/boss/evaluationsHistory/pastCollaboratorObjectives.vue";
import errorHandler from "@/views/errorHandler";

export default {
    components: {
        Footer,
        closedEvaluations,
        historyObjectives,
    },
    data() {
        return {
            spin: false,
        };
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
    },
    methods: {},
};
</script>

<style>
.collapse-content {
    margin: 32px;
    background: white;
}
</style>
