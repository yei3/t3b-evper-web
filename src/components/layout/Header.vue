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
                    <a-col style="text-align: right;">
                        <a-button
                            icon="user"
                            style="border-style: none; cursor: unset;"
                            class="logout-buttom"
                        >
                            {{ userProfile }}
                        </a-button>
                        <a-button @click="showDrawer">
                            <a-badge :count="countNotif">
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
        <a-drawer
            title="Notificaciones"
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="visible"
        >
            <div v-for="item in data" :key="item.id">
                <a-icon type="bell" theme="filled" style="font-size: 14px;" />
                <strong> {{ item.id }}</strong>
                <br />
                {{ item.status }}
                <br />
                <p style="text-align:right;">{{ item.endDate }}</p>
            </div>
            <br /><br />
            <div class="text-lg-right">
                <a-button @click="onClose">Cerrar</a-button>
            </div>
        </a-drawer>
    </a-layout-header>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import client3B from "@/api/client3B";
import authService from "@/services/auth";
import errorHandler from "@/views/errorHandler";

export default {
    data() {
        return {
            countNotif: 0,
            enableButton: false,
            visible: false,
            data: [],
        };
    },
    created() {
        this.getNotifications();
    },
    methods: {
        ...mapActions({
            toggleSidebar: "toggleSideBar",
        }),
        logout() {
            authService.removeAuthData();
            authService.removeUserData();
            this.$router.push({ name: "login" });
        },
        showDrawer() {
            this.visible = true;
            this.countNotif = 0;
        },
        onClose() {
            this.visible = false;
        },
        async getNotifications() {
            let response = null;
            try {
                response = await client3B.notifications.getAllNotifications();
                const items = response.data.result;
                this.countNotif = items.length;
                this.data = [];
                for (let index = 0; index < items.length; index += 1) {
                    this.data.push({
                        key: index,
                        id: items[index].notification.data.senderUserName,
                        status: items[index].notification.data.generalMessage,
                        evaluation: {
                            title: items[index].userId,
                            subtitle: items[index].state,
                        },
                        collaborator: items[index].userId,
                        endDate: new Date(
                            `${items[index].notification.creationTime}Z`,
                        ).toLocaleDateString(),
                    });
                }
            } catch (error) {
                errorHandler(this, error);
            } finally {
                this.spin = false;
            }
        },
    },
    computed: {
        ...mapGetters({
            sidebarCollapsed: "sidebarCollapsed",
            userProfile: "userProfile",
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
