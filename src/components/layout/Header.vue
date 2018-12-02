<template>
    <a-layout-header class="header" style="background: white; padding: 0px; height: 60px;">
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
                    <a-col :span="17" style="text-align: right;">
                        <b class="beta-tag">B E T A</b>
                        <!--     <a-badge :count="5">
                            <a-icon type="bell" />
                        </a-badge> -->
                    </a-col>
                    <a-col :span="7" style="text-align: right;">                        
                        <a-button
                            icon="logout"
                            style="border-style: none"
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
    .beta-tag {
        font-size: 10px;
        padding: 2px 8px;
        text-align: center;
        background: #dddddd;
        border-radius: 2px;        
    }
    .logout-buttom:hover {
        color: #000;
    }
</style>
