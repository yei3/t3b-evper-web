<template>
    <div class="users">
        <a-row class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Administrar usuarios</h1>
            </a-col>
        </a-row>
        <div class="collapse-content">
            <a-tabs defaultActiveKey="1">
                <a-tab-pane key="1">
                    <div slot="tab">
                        <a-icon type="search" />Búsqueda y modificación de usuarios
                    </div>

                    <a-row class="steps">
                        <span class="breadcrumb-header breadcrumb-header--fw-400">Búsqueda</span>
                        <span style="font-size: 16px;"> de usuarios</span>
                    </a-row>
                    <a-divider />
                    <a-row type="flex" justify="center" :gutter="20">
                        <a-col :span="4">
                            <a-input
                                style="width: 100%"
                                @change="handleSelectedUserChange"
                                :value="selectedUserName"
                                placeholder="ID Usuario"
                            />
                        </a-col>
                        <a-col :span="4">
                            <a-button
                                type="primary"
                                icon="search"
                                :ghost="true"
                                :disabled="isButtonDisabled()"
                                :loading="loading"
                                @click="fetchUserData()"
                            >
                                Buscar Usuario
                            </a-button>
                        </a-col>
                    </a-row>
                    <a-divider />
                    <user-form v-if="user" />
                    <a-empty
                        v-if="errors.length > 0"
                        description="Usuario no encontrado, intente con otro ID."
                    />
                </a-tab-pane>
                <a-tab-pane key="2">
                    <div slot="tab"><a-icon type="upload" />Carga masiva</div>
                    <upload-component url="api/ImportUsers" />
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import Footer from "@/components/layout/Footer.vue";

export default {
    components: {
        Footer,
        "upload-component": () => import("../../shared/uploadComponent"),
        "user-form": () => import("./userForm"),
    },
    data() {
        return {
            selectedUserName: "",
        };
    },
    methods: {
        fetchUserData() {
            if (!this.user) {
                this.getUserAsync(this.selectedUserName);
            } else {
                this.setUserData(null);
                this.getUserAsync(this.selectedUserName);
            }
        },
        handleSelectedUserChange({ target }) {
            const { value } = target;
            this.selectedUserName = value;
        },
        isButtonDisabled() {
            return this.selectedUserName === "";
        },
        ...mapActions(["getUserAsync"]),
        ...mapMutations(["setUserData"]),
    },
    computed: {
        ...mapGetters(["user", "loading", "errors"]),
    },
};
</script>

<style>
.collapse-content {
    margin: 32px;
    background: white;
}
.breadcrumb-header--fw-400 {
    font-weight: 400;
}
</style>
