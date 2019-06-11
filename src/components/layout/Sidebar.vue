<template>
    <a-layout-sider breakpoint="lg" :trigger="null" collapsible v-model="sidebarCollapsed" theme="dark" width="250">
        <a-row style="padding: 25px 0px 20px 15px; background-color: #ff0000" v-show="sidebarCollapsed">
            <a-col class="ant-dropdown-link">
                <a-avatar shape="square" :size="48" src="/favicon.ico" />
            </a-col>
        </a-row>
        <a-row
            style="padding: 35px 25px 23px 8px; background-color: #ff0000;
                    background-image: url('/img/header-profile-skin.png');"
            v-show="!sidebarCollapsed"
        >
            <a-col>
                <a-row type="flex" justify="space-around" align="middle">
                    <a-col>
                        <a-avatar :size="60" :src="imageUrl" class="avatar--border" :loadError="resetImageUrl" />
                    </a-col>
                </a-row>
                <a-row type="flex" justify="space-around" align="middle">
                    <a-col style="margin-top: 5px;">
                        <strong style=" font-size: 13px; font-weight: 600; color: #fff;">
                            {{ username }}
                        </strong>
                    </a-col>
                </a-row>
                <a-row type="flex" justify="space-around" align="middle">
                    <a-col>
                        <a-dropdown>
                            <a class="ant-dropdown-link" href="#"> {{ roleEs }} <a-icon type="down" /> </a>
                            <a-menu slot="overlay">
                                <a-menu-item
                                    v-for="arole in user.roles"
                                    :key="arole"
                                    v-show="arole !== userCurrentRole"
                                >
                                    <a @click="setCurrentRole(arole)"> <a-icon type="user" /> {{ roleToEs(arole) }} </a>
                                </a-menu-item>
                                <a-menu-divider />
                                <a-menu-item>
                                    <a @click="updateProfile"> <a-icon type="form" /> Editar perfil </a>
                                </a-menu-item>
                                <a-menu-divider />
                                <a-menu-item>
                                    <a @click="logout"> <a-icon type="logout" /> Cerrar Sesión </a>
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
        <a-row>
            <a-col>
                <a-menu mode="inline" theme="dark" :selectedKeys="selectedKeys">
                    <a-sub-menu key="sub2" v-show="sidebarCollapsed">
                        <span slot="title">
                            <a-icon type="safety-certificate" />
                            <span>Tipo de rol</span>
                        </span>
                        <a-menu-item v-for="arole in user.roles" :key="arole" v-show="arole !== userCurrentRole">
                            <a @click="setCurrentRole(arole)"> <a-icon type="user" /> {{ roleToEs(arole) }} </a>
                        </a-menu-item>
                        <a-menu-divider style="background-color: #666;" />
                        <a-menu-item>
                            <a @click="updateProfile"> <a-icon type="form" /> Editar perfil </a>
                        </a-menu-item>
                        <a-menu-divider style="background-color: #666;" />
                        <a-menu-item>
                            <a @click="logout"> <a-icon type="logout" /> Cerrar Sesión </a>
                        </a-menu-item>
                    </a-sub-menu>

                    <a-menu-item v-for="(item, index) in sidebarItems" :key="String(index)" v-show="role == item.role">
                        <router-link :to="{ name: item.to }">
                            <a-icon :type="item.icon" />
                            <span>{{ item.text }}</span>
                        </router-link>
                    </a-menu-item>
                </a-menu>
            </a-col>
        </a-row>
    </a-layout-sider>
</template>

<script>
import authService from "@/services/auth";
import { mapGetters } from "vuex";

export default {
    name: "Sidebar",
    data() {
        return {
            useDefaultAvatar: false,
            selectedKeys: [],
            user: authService.getUserData(),
            userCurrentRole: authService.getCurrentRole(),
            sidebarItems: [
                {
                    role: authService.ROLES.COLLABORATOR,
                    to: "collaborator-home",
                    icon: "home",
                    text: "Home",
                },
                {
                    role: authService.ROLES.COLLABORATOR,
                    to: "collaborator-reports",
                    icon: "line-chart",
                    text: "Resultados",
                },
                {
                    role: authService.ROLES.COLLABORATOR,
                    to: "collaborator-evaluationsHistory",
                    icon: "search",
                    text: "Historial",
                },
                {
                    role: authService.ROLES.COLLABORATOR,
                    to: "collaborator-help",
                    icon: "question",
                    text: "Ayuda",
                },
                {
                    role: authService.ROLES.SUPERVISOR,
                    to: "boss-home",
                    icon: "home",
                    text: "Home",
                },
                {
                    role: authService.ROLES.SUPERVISOR,
                    to: "boss-reports",
                    icon: "line-chart",
                    text: "Resultados",
                },
                {
                    role: authService.ROLES.SUPERVISOR,
                    to: "boss-closedEvaluationsHistory",
                    icon: "search",
                    text: "Historial",
                },
                /*
                {
                    role: authService.ROLES.SUPERVISOR,
                    to: 'onWork',
                    icon: 'form',
                    text: 'Evaluaciones',
                },
                {
                    role: authService.ROLES.SUPERVISOR,
                    to: 'boss-reports',
                    icon: 'line-chart',
                    text: 'Resultados',
                },
                */
                {
                    role: authService.ROLES.ADMINISTRATOR,
                    to: "admin-home",
                    icon: "file-text",
                    text: "Formatos",
                },
                {
                    role: authService.ROLES.ADMINISTRATOR,
                    to: "admin-evaluations",
                    icon: "form",
                    text: "Evaluaciones",
                },
                {
                    role: authService.ROLES.ADMINISTRATOR,
                    to: "admin-reports",
                    icon: "line-chart",
                    text: "Resultados",
                },
                {
                    role: authService.ROLES.ADMINISTRATOR,
                    to: "admin-organigram",
                    icon: "cluster",
                    text: "Organigrama",
                },
                {
                    role: authService.ROLES.ADMINISTRATOR,
                    to: "admin-users",
                    icon: "user",
                    text: "Usuarios",
                },
                {
                    role: authService.ROLES.ADMINISTRATOR,
                    to: "admin-notifications",
                    icon: "bell",
                    text: "Avisos",
                },
            ],
        };
    },
    created() {
        this.getSelectedItem();
        setTimeout(() => {
            this.sidebarCollapsed = false;
        }, 10000);
    },
    watch: {
        $route: "getSelectedItem",
    },
    methods: {
        getSelectedItem() {
            const selectedkey = this.sidebarItems.findIndex((item) => item.to === this.$route.name);
            if (selectedkey !== -1) {
                this.selectedKeys = [String(selectedkey)];
            }
        },
        updateProfile() {
            this.$router.push({ name: "update-profile" });
        },
        setCurrentRole(role) {
            authService.setCurrentRole(role);
            this.userCurrentRole = role;
            this.$store.state.userProfile = this.roleToEs(role);
            this.$router.push({ name: "home" });
        },
        logout() {
            authService.removeAuthData();
            authService.removeUserData();
            this.$router.push({ name: "login" });
        },
        roleToEs(role) {
            if (role === authService.ROLES.ADMINISTRATOR) {
                return "Administrador";
            }
            if (role === authService.ROLES.SUPERVISOR) {
                return "Evaluador";
            }
            if (role === authService.ROLES.COLLABORATOR) {
                return "Evaluado";
            }

            return "Evaluado";
        },
        resetImageUrl() {
            console.log("falló");
            this.useDefaultAvatar = true;
            return false;
        },
    },
    computed: {
        sidebarCollapsed: {
            get() {
                return this.$store.getters.sidebarCollapsed;
            },
            set(value) {
                return this.$store.dispatch("toggleSideBar", value);
            },
        },
        imageUrl() {
            if (this.useDefaultAvatar) {
                return "/user2.png";
            }
            return `${process.env.VUE_APP_PROFILES_IMG_URL}/${this.user.userName}.png`;
        },
        username() {
            return `${this.user.name}`;
        },
        role() {
            return this.userCurrentRole;
        },
        roleEs() {
            const role = this.userCurrentRole;
            return this.roleToEs(role);
        },
    },
};
</script>

<style>
.avatar--border {
    border: solid 2px;
    background: #565656;
}

.ant-layout-sider,
.ant-menu,
.ant-menu-dark .ant-menu-inline.ant-menu-sub,
.ant-menu-dark .ant-menu-item,
.ant-menu .ant-menu-submenu-title {
    background: #333;
    color: #93a6b9;
    font-weight: 600;
    font-size: 13px;
}

.ant-menu-submenu-arrow,
.ant-menu.ant-menu-dark .ant-menu-item-selected,
.ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected,
.ant-menu-dark .ant-menu-submenu-title:hover,
.ant-menu-dark .ant-menu-item:hover,
.ant-menu-vertical .ant-menu-item:hover,
.ant-menu-vertical .ant-menu-item:not(:last-child) .ant-menu-item:hover,
.ant-menu-item-active:hover {
    color: #fff;
    background-color: #000;
}

.ant-menu-vertical .ant-menu-submenu-title,
.ant-menu-inline .ant-menu-submenu-title {
    height: 40px;
    padding-top: 0px;
    padding-bottom: 8px;
    margin-top: 0px;
    margin-bottom: 0px;
}

.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
    line-height: 48px;
    height: 48px;
}

.ant-menu-item,
.ant-menu-inline .ant-menu-item,
.ant-menu-vertical .ant-menu-item,
.ant-menu-vertical .ant-menu-item:not(:last-child),
.ant-menu-inline .ant-menu-item:not(:last-child) {
    margin-top: 0px;
    margin-bottom: 0px;
}

/*
.ant-menu-vertical.ant-menu-sub .ant-menu-item:first-child {
    margin-top: 15px;
}

.ant-menu-vertical.ant-menu-sub .ant-menu-item:last-child {
    margin-bottom: 15px;
}

.ant-menu-vertical.ant-menu-sub .ant-menu-item {
    margin-right: 15px;
    margin-left: 15px;
}
*/

.ant-menu-vertical,
.ant-menu-vertical .ant-menu-item,
.ant-menu-dark .ant-menu-sub {
    font-weight: normal;
    background-color: #333;
    background: #333;
}

.ant-menu-submenu-vertical > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after,
.ant-menu-submenu-vertical-left > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after,
.ant-menu-submenu-vertical-right > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after,
.ant-menu-submenu-inline > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after,
.ant-menu-submenu-vertical > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before,
.ant-menu-submenu-vertical-left > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before,
.ant-menu-submenu-vertical-right > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before,
.ant-menu-submenu-inline > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before {
    background: #fff;
}

.ant-dropdown-link,
.ant-dropdown-link:hover {
    color: #fff;
    opacity: 0.8;
    font-size: 12px;
    text-decoration: none;
}

.ant-menu.ant-menu-dark .ant-menu-item-selected {
    border-left: 2px solid #1890ff;
}

.ant-dropdown-menu-item >>> a:hover {
    color: #333;
}
</style>
