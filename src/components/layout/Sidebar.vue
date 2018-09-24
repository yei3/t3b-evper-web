<template>
    <a-layout-sider
            breakpoint="sm"
            :trigger="null"
            collapsible
            v-model="sidebarCollapsed"
            theme="light"
        >
            <div class="logo"> <h1>Logo</h1> </div>
            <a-menu mode="inline" :defaultSelectedKeys="['1']">
                <a-menu-item key="1">
                    <router-link to="/"></router-link>
                    <a-icon type="video-camera" />
                    <span>Home</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <router-link to="/about"></router-link>
                    <a-icon type="user" />
                    <span>About</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <router-link to="/login"></router-link>
                    <a-icon type="Login" />
                    <span>login</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Sidebar',
    computed: {
        ...mapGetters({
            sidebarCollapsed: 'sidebarCollapsed',
        }),
    },
};
</script>
