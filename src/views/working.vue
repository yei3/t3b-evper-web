<template>
    <a-layout style="min-height: 100vh" >
        <a-layout-content>
            <a-row
                type="flex"
                justify="center"
                align="middle"
                style="min-height: 100vh"
            >
                <a-col :span=12>
                    <p><span style="font-size: 256px">;(</span>  Ooops!</p>
                    <h1 style="text-align: center; height: 120px;">
                        Está página aún no está disponible
                    </h1>
                    <a href="#"
                        style="color: #666; text-decoration: underline;"
                        @click="redirectToHome"
                    >
                        Regresar a casa <a-icon type='home' />
                    </a>
                </a-col>
            </a-row>
        </a-layout-content>
    </a-layout>
</template>

<script>
export default {
    methods: {
        redirectToHome() {
            this.loading = false;
            this.$router.push({ name: 'home' });
        },
    }
};
</script>

<style scoped>

</style>
