<template>
    <div>
        <a-row :gutter="32" class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Administración de Formatos de Evaluaciones</h1>
            </a-col>
            <a-col :span="12">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-home' }" class="breadcrumb-path">
                            Formatos
                        </router-link>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
            <a-col class="buttons-container" :span="12">
                <a-button
                    class="button-container__button"
                    type="primary"
                    ghost
                    @click="initNewFormatForm"
                >
                    Crear formato <a-icon type="plus" />
                </a-button>
                <a-button
                    class="button-container__button"
                    type="primary"
                    ghost
                    @click="uploadObjectives"
                >
                    Cargar objetivos <a-icon type="upload" />
                </a-button>
            </a-col>
        </a-row>
        <div class="collapse-content" style="background-color: white; margin: 30px 30px;">
            <a-row class="main-content" style="margin-top: 30px;">
                <search-formats />
            </a-row>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import searchFormats from "@/components/admin/search/formats.vue";

export default {
    components: {
        searchFormats,
    },
    methods: {
        ...mapActions({
            clearFormatForm: "clearFormatForm",
        }),
        initNewFormatForm() {
            this.clearFormatForm();
            this.$router.push({ name: "create-format" });
        },
        uploadObjectives() {
            this.clearFormatForm();
            this.$router.push({ name: "upload-objectives" });
        },
    },
};
</script>

<style scoped>
.buttons-container {
    display: flex;
    justify-content: flex-end;
}

.button-container__button {
    margin: 0 0.5rem;
}
</style>
