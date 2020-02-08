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
                    <a-row :gutter="20">
                        <a-col :span="4">
                            <a-select
                                style="width: 100%"
                                @change="handleSelectUserChange"
                                placeholder="Usuarios"
                            >
                                <a-select-option
                                    v-for="item in users"
                                    :value="item.userName"
                                    :key="item.id"
                                    >{{ `${item.userName} - ${item.name}` }}
                                </a-select-option>
                            </a-select>
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
                    <user-form v-if="userData" :userData="userData" />
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
/* eslint-disable */
import client3B from "@/api/client3B";
import { mapActions, mapGetters } from "vuex";
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
            users: [],
            userData: null,
            selectedUserName: "",
        };
    },
    created() {
        this.getAllUsers();
    },
    methods: {
        async getAllUsers() {
            this.spin = true;
            let response = null;
            try {
                response = await client3B.user.getAll();
                this.users = response.data.result.items;
            } catch (error) {
                errorHandler(this, error);
            }
            this.spin = false;
        },
        async fetchUserData() {
            try {
                this.spin = true;
                const apiResponse = await client3B.user.getUserByUserName(this.selectedUserName);
                const { data } = apiResponse;
                const { result } = data;

                this.userData = result;
            } catch (error) {
                errorHandler(this, error);
            } finally {
                this.spin = false;
            }
        },
        handleSelectUserChange(value) {
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
