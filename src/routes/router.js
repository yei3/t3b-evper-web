import Vue from 'vue';
import Router from 'vue-router';

import collaboratorRoutes from '@/routes/collaborator';
import bossRoutes from '@/routes/boss';
import adminRoutes from '@/routes/admin';

import Layout from '@/components/layout/Layout.vue';
import Login from '@/views/Login.vue';
import NotFound from '@/views/404.vue';

import authService from '@/services/auth';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: Layout,
            children: [
                {
                    path: '',
                    name: 'home',
                    beforeEnter: (to, from, next) => {
                        if (!authService.validateAccessToken()) {
                            return next({ name: 'login' });
                        }
                        // Validate that the role for the user and redirect
                        // to the correct home
                        const userRole = authService.getCurrentRole();
                        if (userRole === authService.ROLES.COLLABORATOR) {
                            return next({ name: 'collaborator-home' });
                        }
                        if (userRole === authService.ROLES.SUPERVISOR) {
                            return next({ name: 'boss-home' });
                        }
                        if (userRole === authService.ROLES.ADMINISTRATOR) {
                            return next({ name: 'admin-home' });
                        }

                        return next();
                    },
                },
                ...collaboratorRoutes,
                ...bossRoutes,
                ...adminRoutes,
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter: (to, from, next) => {
                // Validate that the user is not login
                if (authService.validateAccessToken()) {
                    return next({ name: 'home' });
                }
                return next();
            },
        },
        {
            path: '/profile',
            name: 'profile',
            component: Login,
            beforeEnter: (to, from, next) => {
                // Validate that the user is not login
                if (authService.validateAccessToken()) {
                    return next({ name: 'home' });
                }
                return next();
            },
        },
        {
            path: '*',
            component: NotFound,
        },
    ],
});
