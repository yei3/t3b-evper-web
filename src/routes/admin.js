import beforeEnter from '@/routes/guards/globals';
import authService from '@/services/auth';

import Home from '@/components/admin/home/layout.vue';
import CreateFormat from '@/components/admin/formats/layout.vue';
import Evaluation from '@/components/admin/evaluations/layout.vue';
import CreateEvaluation from '@/components/admin/evaluations/evaluation.vue';
import Users from '@/components/admin/users/users.vue';

export default [
    {
        path: 'admin/home',
        name: 'admin-home',
        component: Home,
        beforeEnter: beforeEnter(authService.ROLES.ADMINISTRATOR),
    },
    {
        path: 'admin/formats/create',
        name: 'create-format',
        component: CreateFormat,
        beforeEnter: beforeEnter(authService.ROLES.ADMINISTRATOR),
    },
    {
        path: 'admin/formats/:id/update',
        name: 'update-format',
        component: CreateFormat,
        beforeEnter: beforeEnter(authService.ROLES.ADMINISTRATOR),
    },
    {
        path: 'admin/evaluations',
        name: 'admin-evaluations',
        component: Evaluation,
        beforeEnter: beforeEnter(authService.ROLES.ADMINISTRATOR),
    },
    {
        path: 'admin/evaluations/create',
        name: 'create-evaluation',
        component: CreateEvaluation,
        beforeEnter: beforeEnter(authService.ROLES.ADMINISTRATOR),
    },
    {
        path: 'admin/users',
        name: 'users',
        component: Users,
        beforeEnter: beforeEnter(authService.ROLES.ADMINISTRATOR),
    },
];
