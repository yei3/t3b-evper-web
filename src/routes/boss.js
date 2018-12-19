import beforeEnter from '@/routes/guards/globals';
import authService from '@/services/auth';

import bossHome from '@/components/boss/home/home.vue';
import performanceEvaluations from '@/components/boss/performanceEvaluations/layout.vue';
import performanceEvaluation from '@/components/boss/performanceEvaluation/layout.vue';
import applyPerformanceEvaluations from '@/components/boss/applyPerformanceEvaluations/layout.vue';

export default [
    {
        path: 'boss/home',
        name: 'boss-home',
        component: bossHome,
        beforeEnter: beforeEnter(authService.ROLES.SUPERVISOR),
    },
    {
        path: 'boss/assessments',
        name: 'boss-assessments',
        component: performanceEvaluations,
        beforeEnter: beforeEnter(authService.ROLES.SUPERVISOR),
    },
    {
        path: 'boss/assessments/apply',
        name: 'boss-assessments-apply',
        component: applyPerformanceEvaluations,
        beforeEnter: beforeEnter(authService.ROLES.SUPERVISOR),
    },
    {
        path: 'boss/assessments/:id',
        name: 'boss-assessment',
        component: performanceEvaluation,
        beforeEnter: beforeEnter(authService.ROLES.SUPERVISOR),
    },
];
