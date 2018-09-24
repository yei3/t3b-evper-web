<template>
    <div id="app">
        <a-layout id="components-layout" style="min-height: 100vh">
            <router-view name="Sidebar" />
            <a-layout>
                <router-view name="Header" />
                <a-layout-content
                    :style="{
                                margin: '24px 16px',
                                padding: '24px',
                                background: '#fff',
                                minHeight: '280px'
                            }"
                >
                    <router-view> </router-view>
                </a-layout-content>
                <router-view name="Footer" />
            </a-layout>
        </a-layout>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
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
