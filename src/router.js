import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Login from '@/views/Login.vue';
import Header from '@/components/layout/Header.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import Footer from '@/components/layout/Footer.vue';

Vue.use(Router);


export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            components: {
                default: Home,
                Header,
                Sidebar,
                Footer,
            },
        },
        {
            path: '/login',
            name: 'login',
            components: {
                default: Login,
                Footer,
            },
        },
        {
            path: '/about',
            name: 'about',
            components: {
                default: About,
                Header,
                Sidebar,
                Footer,
            },
        },
    ],
});
