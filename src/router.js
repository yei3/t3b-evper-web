import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/layout/Layout.vue';
import Login from '@/views/Login.vue';

import colaboratorHome from '@/components/colaborator/home/home.vue';
import performanceEvaluations from '@/components/colaborator/performanceEvaluations/home.vue';
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
