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
                        <span style="font-size: 16px;">de usuarios</span>
                    </a-row>
                    <a-divider />
                    <a-row :gutter="20">
                        <a-col :span="4">
                            <a-select style="width: 100%" placeholder="Users">
                                <a-select-option v-for="item in users" :key="item.id">{{
                                    item.userName
                                }}</a-select-option>
                            </a-select>
                        </a-col>
                        <a-col :span="8">
                            <a-select style="width: 100%" placeholder="Users">
                                <a-select-option v-for="item in users" :key="item.id">{{
                                    item.fullName
                                }}</a-select-option>
                            </a-select>
                        </a-col>
                        <a-col :span="8"></a-col>
                        <a-col :span="4">
                            <a-button type="primary" :ghost="true" @click="editUser()">
                                Editar Usuario
                                <a-icon type="edit" />
                            </a-button>
                        </a-col>
                    </a-row>
                    <a-divider />
                    <a-row class="steps">
                        <span class="breadcrumb-header breadcrumb-header--fw-400">Editar</span>
                        <span style="font-size: 16px;">información de usuario</span>
                    </a-row>
                    <a-row class>
                        <a-form
                            @submit="handleSubmit"
                            :autoFormCreate="
                                (form) => {
                                    this.form = form;
                                }
                            "
                        >
                            <a-form-item v-bind="formItemLayout" label="E-mail">
                                <a-input
                                    v-decorator="[
                                        'email',
                                        {
                                            rules: [
                                                {
                                                    type: 'email',
                                                    message: 'The input is not valid E-mail!',
                                                },
                                                {
                                                    required: true,
                                                    message: 'Please input your E-mail!',
                                                },
                                            ],
                                        },
                                    ]"
                                />
                            </a-form-item>
                            <a-form-item v-bind="formItemLayout" label="Escolaridad">
                                <a-input
                                    v-decorator="[
                                        'escolaridad',
                                        {
                                            rules: [
                                                {
                                                    type: 'text',
                                                    message: 'The input is not valid!',
                                                },
                                                {
                                                    required: true,
                                                    message: 'Por favor llena este campo',
                                                },
                                            ],
                                        },
                                    ]"
                                />
                            </a-form-item>
                            <a-form-item v-bind="tailFormItemLayout">
                                <a-button type="btn-green" htmlType="submit">Guardar</a-button>
                            </a-form-item>
                        </a-form>
                    </a-row>
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
    },
    beforeCreate() {
        this.form = this.$form.createForm(this);
    },
    data() {
        return {
            spin: false,
            users: [],
        };
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
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
        editUser() {
            console.log("OK");
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
