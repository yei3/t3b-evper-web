
<template>
    <div class="users">
        <a-row :gutter="32"  class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Administrado de usuarios</h1>
            </a-col>
            <a-col :span="24">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        Modificar información de empleado
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
        </a-row>
        <a-row class="main-content" style="margin-top: 30px;">
            <a-col :span="24" style="padding-bottom: 30px;">
            </a-col>
        </a-row>
        <br /><br />
        <a-input-search
            placeholder="Ingrese número o nombre del empleado"
            @search="onSearch"
            enterButton="Search"
        />
    </div>
</template>
<script>
/* eslint-disable */
import Footer from '@/components/layout/Footer.vue';
export default {
        components: {
            Footer,
    },
    data() {
            return {
                loading: false,
        };
    },
    methods: {
            update() {
                this.loading = true;
        },
        onSearch (value) {
                console.log(value)
        },
    },
};
</script>

<style>
</style>