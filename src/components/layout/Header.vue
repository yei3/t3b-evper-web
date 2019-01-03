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
                   <a-col  style="text-align: right;">
                       <a-button @click="showModalPanel">
                            <a-badge :count="1">
                                <a-icon type="bell" theme="filled" style="font-size: 25px;" />
                            </a-badge>
                        </a-button>
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
        <a-modal
            v-model="showModal"

            width="600px"
        >
            <template slot="title">
                <a-row>
                    <a-col :span="24" class="modal-header">
                        <h1>Notificaciones</h1>

                    </a-col>
                </a-row>
            </template>

            <a-row class="modal-content">
                <a-col :span="24" class="modal-content-seccion-top">
                    {{ data }}
                </a-col>
                <a-col :span="24" class="modal-content-seccion">

                </a-col>
                <a-col :span="24" class="modal-content-seccion">

                </a-col>
                <a-col class="modal-content-seccion-bottom">
                    <span>

                    </span>
                </a-col>
            </a-row>

            <template slot="footer">
                <a-button
                    key="back"
                    @click="showModal = false"
                >
                    Cerrar
                </a-button>

            </template>
        </a-modal>
    </a-layout-header>

</template>

<script>
import client3B from '@/api/client3B';
import errorHandler from '@/views/errorHandler';
import { mapActions, mapGetters } from 'vuex';
import authService from '@/services/auth';
// Importing Component
import NotificationBell from 'vue-notification-bell';

export default {
    data() {
        return {
            countNotif: 10,
            showModal: false,
            enableButton: false,
            data: []
            }
    },
    created(){
        this.getNotifications();
    },
    methods: {
        ...mapActions({
            toggleSidebar: 'toggleSideBar',
        }),
        logout() {
            authService.removeAuthData();
            authService.removeUserData();
            this.$router.push({ name: 'login' });
        },
        showModalPanel(){
            console.log('show modal');
            this.showModal = true;
            enableButton: true;
        },
        async getNotifications() {
            console.log('getNotifications');
            let response = null;
            try {
                response = await client3B.dashboard.getSupervisor();
                const items = response.data.result.collaboratorRevisionSummary;
                this.data = [];
                for (let index = 0; index < items.length; index += 1) {
                    this.data.push({
                        key: index++,
                        id: items[index].id,
                        status: 'OK',
                        evaluation: {
                            title: items[index].name,
                            subtitle: items[index].description
                        },
                        collaborator: items[index].collaboratorName,
                        endDate: new Date(items[index].endDateTime).toLocaleDateString()
                    });
                }
            } catch (error) {
                console.log(error);
            } finally {
                this.spin = false;
            }
        }
    },
    computed: {
        ...mapGetters({
            sidebarCollapsed: 'sidebarCollapsed',
        }),
    },
    components: {
    NotificationBell // Registering Component
  }
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
