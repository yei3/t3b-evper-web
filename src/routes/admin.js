import beforeEnter from '@/routes/guards/globals';
import authService from '@/services/auth';

import Home from '@/components/admin/home/layout.vue';
import CreateFormat from '@/components/admin/formats/layout.vue';
import Evaluation from '@/components/admin/evaluations/layout.vue';
import CreateEvaluation from '@/components/admin/evaluations/evaluation.vue';
import Users from '@/components/admin/users/users.vue';
import Organigram from '@/components/admin/organization/organigram.vue';
import Notifications from '@/components/admin/notifications/notifications.vue';
import EvaluationsHistory from '@/components/admin/evaluationsHistory/evaluationsHistory.vue';

export default [
    {
        path: 'admin/formats',
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
        name: 'admin-users',
        component: Users,
        beforeEnter: beforeEnter(authService.ROLES.ADMINISTRATOR),
    },
    {
        path: 'admin/organigram',
        name: 'admin-organigram',
        component: Organigram,
        beforeEnter: beforeEnter(authService.ROLES.ADMINISTRATOR),
    },
    {
        path: 'admin/notifications',
        name: 'admin-notifications',
        component: Notifications,
        beforeEnter: beforeEnter(authService.ROLES.ADMINISTRATOR),
    },
    {
        path: 'admin/evaluationsHistory',
        name: 'admin-evaluationsHistory',
        component: EvaluationsHistory,
        beforeEnter: beforeEnter(authService.ROLES.ADMINISTRATOR),
    },
];
