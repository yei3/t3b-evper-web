<template>
    <a-layout-header class="header" style="background: #fff; padding: 0px; height: 60px;">
        <a-row>
            <a-col :span="12">
                <a-icon
                    class="trigger"
                    :type="sidebarCollapsed ? 'menu-unfold' : 'menu-fold'"
                    @click="toggleSidebar"
                />
            </a-col>
            <a-col :span="12">
                <a-row>
                    <a-col :span="12" style="text-align: right;">
                        <!--     <a-badge :count="5">
                            <a-icon type="bell" />
                        </a-badge> -->
                    </a-col>
                    <a-col :span="12" style="text-align: right;">
                        <a-button
                            type="dashed"
                            icon="logout"
                            style="border-style: none; margin-right: 20px;"
                            class="logout-buttom"
                            @click="logout()"
                        >
                            Cerrar sesión
                        </a-button>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </a-layout-header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import authService from '@/services/auth';

export default {
    methods: {
        ...mapActions({
            toggleSidebar: 'toggleSideBar',
        }),
        logout() {
            console.log('logout');
            authService.removeAuthData();
            authService.removeUserData();
            this.$router.push({ name: 'login' });
        },
    },
    computed: {
        ...mapGetters({
            sidebarCollapsed: 'sidebarCollapsed',
        }),
    },
};
</script>

<style>
    .logout-buttom:hover {
        color: #000;
    }
</style>
