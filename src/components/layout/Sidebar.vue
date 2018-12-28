<template>
    <a-layout-sider
        breakpoint="lg"
        :trigger="null"
        collapsible
        v-model="sidebarCollapsed"
        theme="dark"
        width=220
    >
        <a-row
            style="padding: 25px 0px 20px 15px; background-color: #ff0000"
            v-show="sidebarCollapsed"
        >
            <a-col class="ant-dropdown-link">
                <a-avatar
                    shape="square"
                    :size="48"
                    src="/favicon.ico"
                />
            </a-col>
        </a-row>
        <a-row
            style="padding: 35px 25px 23px 8px; background-color: #ff0000;
                   background-image: url('/img/header-profile-skin.png');"
            v-show="!sidebarCollapsed"
        >
            <a-col>
                <a-row
                    type="flex"
                    justify="space-around"
                    align="middle"
                >
                    <a-col>
                        <a-avatar
                            :size="60"
                            :src="imageUrl"
                            class="avatar--border"
                        />
                    </a-col>
                </a-row>
                <a-row
                    type="flex"
                    justify="space-around"
                    align="middle"
                >
                    <a-col style="margin-top: 5px;">
                        <strong
                            style="
                                font-size: 13px;
                                font-weight: 600;
                                color: #fff;"
                        >
                            {{username}}
                        </strong>
                    </a-col>
                </a-row>
                <a-row
                    type="flex"
                    justify="space-around"
                    align="middle"
                >
                    <a-col>
                        <a-dropdown>
                            <a class="ant-dropdown-link" href="#">
                                {{roleEs}} <a-icon type="down" />
                            </a>
                            <a-menu slot="overlay">
                                <a-menu-item>
                                    <a @click="updateProfile">
                                        <a-icon type="form" />
                                        Editar perfil
                                    </a>
                                </a-menu-item>
                                <a-menu-item
                                    :key="arole"
                                    v-for="arole in user.roles"
                                    v-show="arole !== userCurrentRole"
                                >
                                    <a @click="setCurrentRole(arole)">
                                        <a-icon type="user" />
                                        {{roleToEs(arole)}}
                                    </a>
                                </a-menu-item>
                                <a-menu-divider/>
                                <a-menu-item>
                                    <a @click="logout">
                                        <a-icon type="logout" />
                                        Cerrar Sesión
                                    </a>
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
        <a-row>
            <a-col>
                <a-menu
                    mode="inline"
                    theme="dark"
                    :selectedKeys="selectedKeys"
                >
                    <a-sub-menu key="sub2" v-show="sidebarCollapsed">
                        <span slot="title">
                            <a-icon type="safety-certificate" />
                            <span>Tipo de rol</span>
                        </span>
                        <a-menu-item>                            
                            <a @click="updateProfile">
                                <a-icon type="form" />
                                Editar perfil
                            </a>
                        </a-menu-item>
                        <a-menu-item
                            :key="arole"
                            v-for="arole in user.roles"
                            v-show="arole !== userCurrentRole"
                        >
                            <a @click="setCurrentRole(arole)">
                                <a-icon type="user" />
                                {{roleToEs(arole)}}
                            </a>
                        </a-menu-item>
                        <a-menu-divider style="background-color: #666;"/>
                        <a-menu-item>
                            <a @click="logout">
                                <a-icon type="logout" />
                                Cerrar Sesión
                            </a>
                        </a-menu-item>
                    </a-sub-menu>
                    <a-menu-item key="1" v-show="role == rolesAvailables.COLLABORATOR">
                        <router-link :to="{ name: 'collaborator-home' }">
                            <a-icon type="home" />
                            <span>Home</span>
                        </router-link>
                    </a-menu-item>
                    <a-menu-item key="2" v-show="role == rolesAvailables.COLLABORATOR">
                        <router-link :to="{ name: 'collaborator-reports' }" >
                            <a-icon type="line-chart" />
                            <span>Resultados</span>
                        </router-link>
                    </a-menu-item>
                    <!-- <a-menu-item key="2" v-show="role == rolesAvailables.COLLABORATOR">
                        <router-link :to="{ name: 'collaborator-assessments' }" >
                            <a-icon type="form" />
                            <span>Evaluaciones</span>
                        </router-link>
                    </a-menu-item> -->

                    <a-menu-item key="3" v-show="role == rolesAvailables.SUPERVISOR">
                        <router-link :to="{ name: 'boss-home' }">
                            <a-icon type="home" />
                            <span>Home Evaluador</span>
                        </router-link>
                    </a-menu-item>
                    <a-menu-item key="4" v-show="role == rolesAvailables.SUPERVISOR">
                        <router-link :to="{ name: 'onWork' }">
                            <a-icon type="form" />
                            <span>Evaluaciones</span>
                        </router-link>
                    </a-menu-item>
                    <!-- <a-menu-item key="5" v-show="role == rolesAvailables.SUPERVISOR">
                        <router-link :to="{ name: 'onWork' }">
                            <a-icon type="notification" />
                            <span>Avisos</span>
                        </router-link>
                    </a-menu-item> -->
                    <a-menu-item key="6" v-show="role == rolesAvailables.SUPERVISOR">
                        <router-link :to="{ name: 'boss-reports' }">
                            <a-icon type="line-chart" />
                            <span>Resultados</span>
                        </router-link>
                    </a-menu-item>
                    <a-menu-item key="8" v-show="role == rolesAvailables.ADMINISTRATOR">
                        <router-link :to="{ name: 'admin-home' }">
                            <a-icon type="file-text" />
                            <span>Formatos</span>
                        </router-link>
                    </a-menu-item>
                    <a-menu-item key="9" v-show="role == rolesAvailables.ADMINISTRATOR">
                        <router-link :to="{ name: 'admin-evaluations' }">
                            <a-icon type="form" />
                            <span>Evaluaciones</span>
                        </router-link>
                    </a-menu-item>
                    <a-menu-item key="10" v-show="role == rolesAvailables.ADMINISTRATOR">
                        <router-link :to="{ name: 'admin-organigram' }">
                            <a-icon type="cluster" />
                            <span>Organigrama</span>
                        </router-link>
                    </a-menu-item>
                    <!-- <a-menu-item key="11" v-show="role == rolesAvailables.ADMINISTRATOR">
                        <router-link :to="{ name: 'onWork' }">
                            <a-icon type="setting" />
                            <span>Configuración</span>
                        </router-link>
                    </a-menu-item>
                    <a-menu-item key="12" v-show="role == rolesAvailables.ADMINISTRATOR">
                        <router-link :to="{ name: 'onWork' }">
                            <a-icon type="notification" />
                            <span>Avisos</span>
                        </router-link>
                    </a-menu-item> -->
                    <a-menu-item key="13" v-show="role == rolesAvailables.ADMINISTRATOR">
                        <router-link :to="{ name: 'onWork' }">
                            <a-icon type="line-chart" />
                            <span>Resultados</span>
                        </router-link>
                    </a-menu-item>
                    <a-menu-item key="14" v-show="role == rolesAvailables.ADMINISTRATOR">
                        <router-link :to="{ name: 'admin-users' }">
                            <a-icon type="user" />
                            <span>Usuarios</span>
                        </router-link>
                    </a-menu-item>
                </a-menu>
            </a-col>
        </a-row>
    </a-layout-sider>
</template>

<script>
import authService from '@/services/auth';

export default {
    name: 'Sidebar',
    data() {
        return {
            selectedKeys: [],
            user: authService.getUserData(),
            userCurrentRole: authService.getCurrentRole(),
            rolesAvailables: authService.ROLES,
        };
    },
    created() {
        this.getSelectedItem();
        setTimeout(() => {
            this.sidebarCollapsed = false;
        }, 10000);
    },
    watch: {
        $route: 'getSelectedItem',
    },
    methods: {
        getSelectedItem() {
            const mapRouteItem = {
                'collaborator-home': 1,
                'collaborator-assessments': 2,
                'boss-home': 3,
                'boss-reports': 6,
                'admin-home': 8,
                'admin-evaluations': 9,
                'admin-organigram': 10,
            };
            const selectedkey = mapRouteItem[this.$route.name];
            if (selectedkey) {
                this.selectedKeys = [String(selectedkey)];
            }
        },
        onOpenChange(openKeys) {
            const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
            if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                this.openKeys = openKeys;
            } else {
                this.openKeys = latestOpenKey ? [latestOpenKey] : [];
            }
        },
        updateProfile() {
            this.$router.push({ name: 'update-profile' });
        },
        setCurrentRole(role) {
            authService.setCurrentRole(role);
            this.userCurrentRole = role;
            this.$router.push({ name: 'home' });
        },
        logout() {
            authService.removeAuthData();
            authService.removeUserData();
            console.log('logout');
            this.$router.push({ name: 'login' });
            console.log('end logout');
        },
        roleToEs(role) {
            if (role === authService.ROLES.ADMINISTRATOR) {
                return 'Administrador';
            }
            if (role === authService.ROLES.SUPERVISOR) {
                return 'Evaluador';
            }
            if (role === authService.ROLES.COLLABORATOR) {
                return 'Evaluado';
            }

            return 'Evaluado';
        },
    },
    computed: {
        sidebarCollapsed: {
            get() {
                return this.$store.getters.sidebarCollapsed;
            },
            set(value) {
                return this.$store.dispatch('toggleSideBar', value);
            },
        },
        imageUrl() {
            return `${process.env.VUE_APP_PROFILES_IMG_URL}/${this.user.userName}.png`;
        },
        username() {
            return `${this.user.name}`;
            // return `${this.user.name} ${this.user.surname}`;
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
    background: #565656;;
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
.ant-menu-vertical .ant-menu-item:not(:last-child)
.ant-menu-item:hover,
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
    cursor: pointer;
    font-size: 12px;
    text-decoration:none;
}

.ant-menu.ant-menu-dark .ant-menu-item-selected {
    border-left: 2px solid #1890ff;
}

.ant-dropdown-menu-item >>> a:hover {
    color: #333;
}
</style>
