
<template>
    <div class="users">
            <H1>Modificar información de empleado</H1>
        <div>
            <br /><br />
            <a-input-search placeholder="Ingrese número o nombre del empleado" @search="onSearch" enterButton="Search" />
        </div>
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