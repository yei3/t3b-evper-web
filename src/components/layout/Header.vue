<template>
    <a-layout-header class="header" style="background: #fff; padding: 0">
        <a-menu
            mode="horizontal"
            :defaultSelectedKeys="['2']"
            :style="{ lineHeight: '64px' }"
        >
            <a-menu-item key="0">
                <a-icon
                    class="trigger"
                    :type="sidebarCollapsed ? 'menu-unfold' : 'menu-fold'"
                    @click="toggleSidebar"
                />
            </a-menu-item>
            <a-menu-item key="1">nav 1</a-menu-item>
            <a-menu-item key="2">nav 2</a-menu-item>
            <a-menu-item key="3">nav 3</a-menu-item>
        </a-menu>
    </a-layout-header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    methods: {
        ...mapMutations({
            toggleSidebar: 'toggleSideBar',
        }),
    },
    computed: {
        ...mapGetters({
            sidebarCollapsed: 'sidebarCollapsed',
        }),
    },
};
</script>
