
<template>
    <div class="users">
        <a-row class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Administrador de usuarios</h1>
            </a-col>
            <a-col :span="24">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        Modificar información de empleado
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
        </a-row>
        <div class="collapse-content">
            <div>
                <a-row class="steps">
                    <span class="breadcrumb-header" style="font-weight: 400;">
                        Búsqueda
                    </span>
                    <span style="font-size: 16px;">hola que hace</span>
                </a-row>
                <a-divider />
                <a-row :gutter="20">
                    <a-col :span="4">
                        <a-select style="width: 100%" placeholder="Users">
                            <a-select-option v-for="item in users" :key="item.id">
                                {{ item.userName }}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :span="8">
                        <a-select style="width: 100%" placeholder="Users">
                            <a-select-option v-for="item in users" :key="item.id">
                                {{ item.fullName }}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :span="8">
                    </a-col>
                    <a-col :span="4">
                        <a-button type="primary" ghost @click="editUser()">
                            Editar Usuario <a-icon type="edit" />
                        </a-button>
                    </a-col>
                </a-row>
            </div>
            <a-divider />
            <div>
                <a-row class="steps">
                    <a-form 
                        @submit="handleSubmit"
                        :autoFormCreate="(form)=>{this.form = form}">
                        <a-form-item
                        label='Note'
                        :labelCol="{ span: 5 }"
                        :wrapperCol="{ span: 12 }"
                        >
                        <!-- <a-input
                            v-decorator="[
                            'note',
                            {rules: [{ required: true, message: 'Please input your note!' }]}
                            ]"
                        />
                        </a-form-item>
                        <a-form-item
                        label='Gender'
                        :labelCol="{ span: 5 }"
                        :wrapperCol="{ span: 12 }"
                        >
                        <a-select
                            v-decorator="[
                            'gender',
                            {rules: [{ required: true, message: 'Please select your gender!' }]}
                            ]"
                            placeholder='Select a option and change input text above'
                            @change="this.handleSelectChange"
                        >
                            <a-select-option value='male'>male</a-select-option>
                            <a-select-option value='female'>female</a-select-option>
                        </a-select>
                        </a-form-item>
                        <a-form-item
                        :wrapperCol="{ span: 12, offset: 5 }"
                        > -->
                        <a-button htmlType='submit' class="btn-green" :loading="view.loading">
                            Guardar
                        </a-button>
                        </a-form-item>
                    </a-form>
                </a-row>
            </div>
        </div>        
    </div>
</template>
<script>
/* eslint-disable */
import client3B from '@/api/client3B';
import { mapActions, mapGetters } from 'vuex';
import errorHandler from '@/views/errorHandler';
import Footer from '@/components/layout/Footer.vue';

export default {
    components: {
        Footer,
    },
    data() {
        return {
            spin: false,
            users: [],
            formLayout: 'horizontal',
            form: this.$form.createForm(this),
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
                console.log(this.users);
            } catch (error) {
                console.log(error);
            }
            this.spin = false;
        },
        editUser() {
            console.log("OK");
        },
        update() {
            this.loading = true;
        },
        onSearch (value) {
            console.log(value)
        },
        handleSubmit (e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                console.log('Received values of form: ', values)
                }
            })
        },
        handleSelectChange (value) {
            console.log(value)
            this.form.setFieldsValue({
                note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
            })
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