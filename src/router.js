import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/layout/Layout.vue';
import About from '@/views/About.vue';
import Login from '@/views/Login.vue';

import colaboratorHome from '@/components/colaborator/home.vue';


Vue.use(Router);


export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: { name: 'home' },
            component: Layout,
            children: [
                {
                    path: '/colaborator/home',
                    name: 'home',
                    component: colaboratorHome,
                },
                {
                    path: 'about',
                    name: 'about',
                    component: About,
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
