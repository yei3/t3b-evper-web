import beforeEnter from '@/routes/guards/globals';
import authService from '@/services/auth';

import Home from '@/components/admin/home/layout.vue';
import CreateEvaluation from '@/components/admin/createEvaluation/layout.vue';

export default [
    {
        path: 'admin/home',
        name: 'admin-home',
        component: Home,
        beforeEnter: beforeEnter(authService.ROLES.ADMINISTRATOR),
    },
    {
        path: 'admin/evaluations/create',
        name: 'create-evaluation',
        component: CreateEvaluation,
        beforeEnter: beforeEnter(authService.ROLES.ADMINISTRATOR),
    },
];
