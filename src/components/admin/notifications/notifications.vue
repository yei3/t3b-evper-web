
<template>
    <div class="users">
        <a-row class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Administrador de avisos</h1>
            </a-col>
            <a-col :span="24">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        Crear avisos
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
        </a-row>
        <div class="collapse-content"
            style="background-color: white;
            margin: 30px 30px;"
        >
            <a-row class="collapse-title" style="margin: 16px 0;">
                <a-col :span="24">
                    <h2>Crear un aviso</h2>
                </a-col>

            </a-row>
            <a-row :gutter="16">
                <a-col :span="24">
                    <h2>Remitente:</h2>
                    <h3>Administrador</h3>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="24">
                    <h2>Destinatario(s):</h2>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" style="padding-bottom: 15px;">
                    <a-select mode="multiple" style="width: 100%" placeholder="Regiones"
                        v-model="form.regs"
                    >
                        <a-select-option v-for="(item, index) in regions" :key="index"
                            :value="item.id"
                        >
                            {{ item.displayName }}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" style="padding-bottom: 15px;">
                    <a-select mode="multiple" style="width: 100%" placeholder="Áreas"
                        v-model="form.areas"
                    >
                        <a-select-option v-for="(item, index) in areas" :key="index"
                            :value="item.id"
                        >
                            {{ item.displayName }}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" style="padding-bottom: 15px;">
                    <a-select mode="multiple" style="width: 100%" placeholder="Puestos"
                        v-model="form.employments"
                    >
                        <a-select-option v-for="(item, index) in employments" :key="index"
                            :value="item"
                        >
                            {{ item }}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" style="padding-bottom: 15px;">
                    <a-select mode="multiple" style="width: 100%" placeholder="Empleados"
                        v-model="form.users"
                    >
                        <a-select-option v-for="item in users" :key="item.id"
                        :value="item.userName">
                            {{ item.userName }}   {{ item.fullName }}
                        </a-select-option>
                    </a-select>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="24">
                    <h2>Mensaje:</h2>
                    <a-input v-model="form.message" placeholder="Mensaje"
                    />
                </a-col>
            </a-row>
            <a-row class="text-right" style="padding: 16px 0;">
                <a-button class="btn-green" @click="sendMessage()" :loading="loading" >
                    Enviar
                </a-button>
            </a-row>
            <a-row v-show="spin">
                <div style="text-align: center; margin-top: 20px;">
                    <a-spin tip="Cargando..." />
                </div>
            </a-row>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import client3B from '@/api/client3B';
import errorHandler from '@/views/errorHandler';
import { mapActions, mapGetters } from 'vuex';
import Footer from '@/components/layout/Footer.vue';

export default {
    components: {
        Footer,
    },
    beforeCreate () {
        this.form = this.$form.createForm(this)
    },
    data() {
        return {
            spin: false,
            loading: false,
            senders: [],
            users: [],
            regions: [],
            areas: [],
            employments: [],
            form: {
                sender: 'Administrador',
                regs: [],
                areas: [],
                employments: [],
                users: [],
                message: '',

            },
        };
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        this.getAllUsers();
        this.getAllRegions();
        this.getAllAreas();
        this.getAllEmployments();
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
        async getAllRegions() {
            const response = await client3B.organizationUnit.getAllRegions()
                .catch(error => errorHandler(this, error));
            this.regions = response.data.result;
        },
        async getAllAreas() {
            const response = await client3B.organizationUnit.getAllAreas()
                .catch(error => errorHandler(this, error));
            this.areas = response.data.result;
            this.spin = false;
        },
        async getAllEmployments() {
            const response = await client3B.user.getAllEmployments()
                .catch(error => errorHandler(this, error));
            this.employments = response.data.result;
            this.spin = false;
        },
        async sendMessage() {
            this.loading = true;
            const response = await client3B.notifications.publishGeneralMessageToMultipleUsers({
                senderName: this.form.sender,
                generalMessage: this.form.message,
                organizationUnitIds: [...this.form.areas, ...this.form.regs],
                jobDescriptions: [...this.form.employments],
                userIds: this.form.users,
            }).catch(error => errorHandler(this, error.response.data.error));
            if (response) {
                this.$message.success('Notificación enviada.');

            }
            this.loading = false;
        },
    },
};
</script>

<style>
    .collapse-content {
        margin: 32px;
        background: white;
    }
</style>
