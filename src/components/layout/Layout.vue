<template>
    <a-layout id="components-layout" style="min-height: 100vh">
        <Sidebar/>
        <a-layout>
            <Header/>
            <a-layout-content
                :style="{
                            minHeight: '280px',
                            'background-color': '#f4f6fa'
                        }"
            >
                <transition name="fade" appear mode="out-in">
                    <router-view> </router-view>
                </transition>
            </a-layout-content>
            <Footer/>
        </a-layout>
    </a-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '@/components/layout/Header.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import Footer from '@/components/layout/Footer.vue';

export default {
    components: {
        Header,
        Sidebar,
        Footer,
    },
    computed: {
        ...mapGetters({
            sidebarCollapsed: 'sidebarCollapsed',
        }),
    },
};
</script>

<style>
#components-layout .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}

#components-layout .trigger:hover {
  color: #1890ff;
}

#components-layout .logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}
</style>
