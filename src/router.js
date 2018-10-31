import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/layout/Layout.vue';
import Login from '@/views/Login.vue';
import userUpdate from '@/components/user/Update.vue';

import colaboratorHome from '@/components/colaborator/home/layout.vue';
import performanceEvaluations from '@/components/colaborator/performanceEvaluations/layout.vue';
import performanceEvaluation from '@/components/colaborator/performanceEvaluation/layout.vue';
import applyPerformanceEvaluations from '@/components/colaborator/applyPerformanceEvaluations/layout.vue';
import bossHome from '@/components/boss/home/home.vue';

Vue.use(Router);

<<<<<<< HEAD
=======
function beforeEnter(to, from, next) {
    // Validate that the user can access to the route
    next();

    // Otherwise redirect to home
    // next({ name: 'home' });
}


>>>>>>> develop
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: { name: 'colaborator-home' },
            component: Layout,
            beforeEnter: (to, from, next) => {
                // Validate that the role for the user and redirect
                // to the correct home
                next();
            },
            children: [
                {
                    path: 'colaborator/home',
                    name: 'colaborator-home',
                    component: colaboratorHome,
                    beforeEnter,
                },
                {
                    path: 'colaborator/assessments',
                    name: 'colaborator-assessments',
                    component: performanceEvaluations,
                    beforeEnter,
                },
                {
                    path: 'colaborator/assessments/apply',
                    name: 'colaborator-assessments-apply',
                    component: applyPerformanceEvaluations,
                    beforeEnter,
                },
                {
                    path: 'colaborator/assessments/:id',
                    name: 'colaborator-assessment',
                    component: performanceEvaluation,
                    beforeEnter,
                },
                {
                    path: 'boos/home',
                    name: 'boss-home',
                    component: bossHome,
                    beforeEnter,
                },
                {
                    path: '/user/update',
                    name: 'user',
                    component: userUpdate
                }
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter: (to, from, next) => {
                // Validate that the user is not login
                next();

                // Otherwise redirect to home
                // next({ name: 'home' });
            },
        },
    ],
});
