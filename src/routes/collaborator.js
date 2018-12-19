import collaboratorHome from '@/components/collaborator/home/layout.vue';
import performanceEvaluations from '@/components/collaborator/performanceEvaluations/layout.vue';
import performanceEvaluation from '@/components/collaborator/performanceEvaluation/layout.vue';
import applyPerformanceEvaluations from '@/components/collaborator/applyPerformanceEvaluations/layout.vue';
import beforeEnter from '@/routes/guards/globals';
import authService from '@/services/auth';

export default [
    {
        path: 'collaborator/home',
        name: 'collaborator-home',
        component: collaboratorHome,
        beforeEnter: beforeEnter(authService.ROLES.COLLABORATOR),
    },
    {
        path: 'collaborator/assessments',
        name: 'collaborator-assessments',
        component: performanceEvaluations,
        beforeEnter: beforeEnter(authService.ROLES.COLLABORATOR),
    },
    {
        path: 'collaborator/assessments/apply',
        name: 'collaborator-assessments-apply',
        component: applyPerformanceEvaluations,
        beforeEnter: beforeEnter(authService.ROLES.COLLABORATOR),
    },
    {
        path: 'collaborator/assessments/:id',
        name: 'collaborator-assessment',
        component: performanceEvaluation,
        beforeEnter: beforeEnter(authService.ROLES.COLLABORATOR),
    },
];
