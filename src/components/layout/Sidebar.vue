<template>
    <a-layout-sider
            breakpoint="sm"
            :trigger="null"
            collapsible
            v-model="sidebarCollapsed"
            @collapse="resetOpenKeys"
            theme="dark"
            width=220
        >
            <a-row
                style="padding: 25px 0px 20px 15px; background-color: #ff0000"
                v-show="sidebarCollapsed"
            >
                <a-col v-show="sidebarCollapsed">
                    <a-avatar
                        shape="square"
                        :size="48"
                        src="/favicon.ico"
                    />
                </a-col>
            </a-row>
            <a-row
                style="padding: 35px 25px 23px 25px; background-color: #ff0000"
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
                                shape="square"
                                :size="48"
                                src="@/assets/img/logo-tipografia.png"/>
                        </a-col>
                    </a-row>
                    <a-row
                        type="flex"
                        justify="space-around"
                        align="middle"
                    >
                        <a-col style="margin-top: 5px;">
                            <strong
                                style="font-family: 'Open Sans';
                                    font-size: 13px;
                                    font-weight: 600;
                                    color: #fff;"
                            >
                                Karen Villanueva
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
                                    Analista <a-icon type="down" />
                                </a>
                                <a-menu slot="overlay">
                                    <a-menu-item>
                                    <a href="javascript:;">Logout</a>
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
                        :openKeys="openKeys"
                        @openChange="onOpenChange"
                        theme="dark"
                    >
                        <a-sub-menu key="sub1" class="custom-sub-menu">
                            <span slot="title">
                                <a-icon type="user"/>
                                <span>Colaborador</span>
                            </span>
                            <a-menu-item key="1">
                                <router-link :to="{ name: 'colaborator-home' }"></router-link>
                                <span>Home Colaborador</span>
                            </a-menu-item>
                            <a-menu-item key="2">
                                <router-link
                                    :to="{ name: 'colaborator-assessments' }"
                                ></router-link>
                                <span>Evaluaciones</span>
                            </a-menu-item>
                        </a-sub-menu>
                        <a-sub-menu key="sub2">
                            <span slot="title">
                                <a-icon type="user"/>
                                <span>Jefe</span>
                            </span>
                            <a-menu-item key="3">
                                <router-link :to="{ name: 'boss-home' }"></router-link>
                                <span>Home Jefe</span>
                            </a-menu-item>
                            <a-menu-item key="4">
                                <router-link to="/"></router-link>
                                <span>Evaluaciones</span>
                            </a-menu-item>
                            <a-menu-item key="5">
                                <router-link to="/"></router-link>
                                <span>Avisos</span>
                            </a-menu-item>
                            <a-menu-item key="6">
                                <router-link to="/"></router-link>
                                <span>Resultados</span>
                            </a-menu-item>
                        </a-sub-menu>
                        <a-sub-menu key="sub3">
                            <span slot="title">
                                <a-icon type="user" />
                                <span>Administrador</span>
                            </span>
                            <a-menu-item key="7">
                                <router-link to="/"></router-link>
                                <span>Home </span>
                            </a-menu-item>
                            <a-menu-item key="8">
                                <router-link to="/"></router-link>
                                <span>Formatos</span>
                            </a-menu-item>
                            <a-menu-item key="9">
                                <router-link to="/"></router-link>
                                <span>Evaluaciones</span>
                            </a-menu-item>
                            <a-menu-item key="10">
                                <router-link to="/-chart"></router-link>
                                <span>Organigrama</span>
                            </a-menu-item>
                            <a-menu-item key="11">
                                <router-link to="/"></router-link>
                                <span>Configuración</span>
                            </a-menu-item>
                            <a-menu-item key="12">
                                <router-link to="/"></router-link>
                                <span>Avisos</span>
                            </a-menu-item>
                            <a-menu-item key="13">
                                <router-link to="/"></router-link>
                                <span>Resultados</span>
                            </a-menu-item>
                        </a-sub-menu>
                    </a-menu>
                </a-col>
            </a-row>
        </a-layout-sider>
</template>

<script>
export default {
    name: 'Sidebar',
    data() {
        return {
            rootSubmenuKeys: ['sub1', 'sub2', 'sub3'],
            openKeys: [],
            lastOpenKeys: [],
        };
    },
    methods: {
        resetOpenKeys(collapsed, type) {
            this.openKeys = [];
        },
        onOpenChange(openKeys) {
            const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
            if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                this.openKeys = openKeys;
            } else {
                this.openKeys = latestOpenKey ? [latestOpenKey] : [];
            }
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
    },
    watch: {
        sidebarCollapsed(value) {
            if (value) {
                this.lastOpenKeys = this.openKeys;
                this.openKeys = [];
            } else {
                this.openKeys = this.lastOpenKeys;
                this.lastOpenKeys = [];
            }
        }
    }
};
</script>


<style>

.ant-layout-sider,
.ant-menu,
.ant-menu-dark .ant-menu-inline.ant-menu-sub,
.ant-menu-dark .ant-menu-item,
.ant-menu .ant-menu-submenu-title {
    background: #333;
    color: #93a6b9;
    font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
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
    font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 12px;
    text-decoration:none;
}
</style>
