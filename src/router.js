import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/layout/Layout.vue';
import Login from '@/views/Login.vue';

import colaboratorHome from '@/components/colaborator/home/layout.vue';
import performanceEvaluations from '@/components/colaborator/performanceEvaluations/layout.vue';
import performanceEvaluation from '@/components/colaborator/performanceEvaluation/layout.vue';
import applyPerformanceEvaluations from '@/components/colaborator/applyPerformanceEvaluations/layout.vue';
import bossHome from '@/components/boss/home/home.vue';


Vue.use(Router);


export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: { name: 'colaborator-home' },
            component: Layout,
            children: [
                {
                    path: 'colaborator/home',
                    name: 'colaborator-home',
                    component: colaboratorHome,
                },
                {
                    path: 'colaborator/assessments',
                    name: 'colaborator-assessments',
                    component: performanceEvaluations,
                },
                {
                    path: 'colaborator/assessments/:id',
                    name: 'colaborator-assessment',
                    component: performanceEvaluation,
                },
                {
                    path: 'colaborator/assessments/apply',
                    name: 'colaborator-assessments-apply',
                    component: applyPerformanceEvaluations,
                },
                {
                    path: 'boos/home',
                    name: 'boss-home',
                    component: bossHome,
                },
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
    ],
});
