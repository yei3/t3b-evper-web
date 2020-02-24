<template>
    <div class="upload-component">
        <a-row :gutter="32" class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Cargar Objetivos</h1>
            </a-col>
            <a-col :span="24">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-home' }" class="breadcrumb-path">
                            Formatos
                        </router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <strong class="breadcrumb-path-active">
                            Cargar objetivos
                        </strong>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
        </a-row>
        <upload-component url="api/ImportObjectives">
            <template v-slot:info-message>
                Haga click o arrastre el archivo de
                <b>Excel</b> para importar los objetivos.
            </template>
        </upload-component>
    </div>
</template>

<script>
export default {
    components: {
        "upload-component": () => import("../../shared/uploadComponent"),
    },
};
</script>
