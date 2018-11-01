import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/layout/Layout.vue';
import Login from '@/views/Login.vue';

import colaboratorHome from '@/components/colaborator/home/layout.vue';
import performanceEvaluations from '@/components/colaborator/performanceEvaluations/layout.vue';
import performanceEvaluation from '@/components/colaborator/performanceEvaluation/layout.vue';
import applyPerformanceEvaluations from '@/components/colaborator/applyPerformanceEvaluations/layout.vue';
import bossHome from '@/components/boss/home/home.vue';

import authService from '@/services/auth';

Vue.use(Router);

function beforeEnter(role) {
    return (to, from, next) => {
        // Validate that the user can access to the route
        if (!authService.validateAccessToken()) {
            return next({ name: 'login' });
        }

        const userData = authService.getUserData();
        if (userData.roles[0] === role) {
            return next();
        }
        console.log(userData.roles[0], role);

        // Otherwise redirect to home
        return next({ name: 'home' });
    };
}


export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Layout,
            beforeEnter: (to, from, next) => {
                // Validate that the role for the user and redirect
                // to the correct home
                console.log('asdasd1');
                console.log(authService.validateAccessToken());
                console.log('asdasd2');
                if (!authService.validateAccessToken()) {
                    return next({ name: 'login' });
                }

                if (to.name !== 'home') {
                    return next();
                }

                const userData = authService.getUserData();
                const role = userData.roles[0];
                if (role === authService.ROLES.COLLABORATOR) {
                    console.log('Redirect to Collaborator home');
                    return next({ name: 'colaborator-home' });
                }
                if (role === authService.ROLES.SUPERVISOR) {
                    console.log('Redirect to boss home');
                    return next({ name: 'boss-home' });
                }

                return next();
            },
            children: [
                {
                    path: 'colaborator/home',
                    name: 'colaborator-home',
                    component: colaboratorHome,
                    beforeEnter: beforeEnter(authService.ROLES.COLLABORATOR),
                },
                {
                    path: 'colaborator/assessments',
                    name: 'colaborator-assessments',
                    component: performanceEvaluations,
                    beforeEnter: beforeEnter(authService.ROLES.COLLABORATOR),
                },
                {
                    path: 'colaborator/assessments/apply',
                    name: 'colaborator-assessments-apply',
                    component: applyPerformanceEvaluations,
                    beforeEnter: beforeEnter(authService.ROLES.COLLABORATOR),
                },
                {
                    path: 'colaborator/assessments/:id',
                    name: 'colaborator-assessment',
                    component: performanceEvaluation,
                    beforeEnter: beforeEnter(authService.ROLES.COLLABORATOR),
                },
                {
                    path: 'boos/home',
                    name: 'boss-home',
                    component: bossHome,
                    beforeEnter: beforeEnter(authService.ROLES.SUPERVISOR),
                },
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
    ],
});
