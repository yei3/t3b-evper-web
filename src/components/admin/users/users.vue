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
                                :loading="spin"
                                @click="fetchUserData()"
                            >
                                Buscar Usuario
                            </a-button>
                        </a-col>
                    </a-row>
                    <a-divider />
                    <user-form v-if="userData" :userData="userData" :isFetchingUser="spin" />
                    <a-empty v-if="fetchError" description="Usuario no encontrado" />
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
import client3B from "@/api/client3B";
import Footer from "@/components/layout/Footer.vue";
import errorHandler from "@/views/errorHandler";

export default {
    components: {
        Footer,
        "upload-component": () => import("../../shared/uploadComponent"),
        "user-form": () => import("./userForm"),
    },
    data() {
        return {
            spin: false,
            userData: null,
            selectedUserName: "",
            fetchError: false,
        };
    },
    methods: {
        async fetchUserData() {
            try {
                this.spin = true;
                this.userData = null;
                const apiResponse = await client3B.user.getUserByUserName(this.selectedUserName);

                const { data } = apiResponse;
                const { result } = data;

                this.fetchError = false;
                this.userData = result;
            } catch (error) {
                this.fetchError = true;
                errorHandler(this, error.message);
            } finally {
                this.spin = false;
            }
        },
        handleSelectedUserChange({ target }) {
            const { value } = target;
            this.selectedUserName = value;
        },
        isButtonDisabled() {
            return this.selectedUserName === "";
        },
        update() {
            this.loading = true;
        },
        onSearch(value) {
            console.log(value);
        },
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log("Received values of form: ", values);
                }
                console.log(values);
            });
        },
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
