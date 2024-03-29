import beforeEnter from "@/routes/guards/globals";
import authService from "@/services/auth";

import bossHome from "@/components/boss/home/home.vue";
import bossReports from "@/components/boss/reports/layout.vue";
import performanceEvaluations from "@/components/boss/performanceEvaluations/layout.vue";
import performanceEvaluation from "@/components/boss/performanceEvaluation/layout.vue";
import applyPerformanceEvaluations from "@/components/boss/applyPerformanceEvaluations/layout.vue";
import closedEvaluationsHistory from "@/components/boss/evaluationsHistory/evaluationsHistory.vue";

export default [
    {
        path: "boss/home",
        name: "boss-home",
        component: bossHome,
        beforeEnter: beforeEnter(authService.ROLES.SUPERVISOR),
    },
    {
        path: "boss/results",
        name: "boss-reports",
        component: bossReports,
        beforeEnter: beforeEnter(authService.ROLES.SUPERVISOR),
    },
    {
        path: "boss/assessments",
        name: "boss-assessments",
        component: performanceEvaluations,
        beforeEnter: beforeEnter(authService.ROLES.SUPERVISOR),
    },
    {
        path: "boss/assessments/:id/apply",
        name: "boss-assessments-apply",
        component: applyPerformanceEvaluations,
        beforeEnter: beforeEnter(authService.ROLES.SUPERVISOR),
    },
    {
        path: "boss/assessments/:id",
        name: "boss-assessment",
        component: performanceEvaluation,
        beforeEnter: beforeEnter(authService.ROLES.SUPERVISOR),
    },
    {
        path: "boss/evaluationsHisroty",
        name: "boss-closedEvaluationsHistory",
        component: closedEvaluationsHistory,
        beforeEnter: beforeEnter(authService.ROLES.SUPERVISOR),
    },
];
