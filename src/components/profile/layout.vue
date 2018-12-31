
<template>
    <div class="users">
        <a-row class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Editar perfil</h1>
            </a-col>
            <a-col :span="24">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        Modifica tu información de empleado
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
        </a-row>
        <div class="collapse-content">
            <a-row class="steps">
                <a-row style="padding: 0 0 16px 0">
                    <span class="breadcrumb-header" >
                        Edita tu foto de perfil
                    </span>
                </a-row>
                <a-row>
                    <a-col :sm="{ span:24 }">
                        <a-upload-dragger name="file" :multiple="false" >
                            <p class="ant-upload-drag-icon">
                                <a-icon type="cloud-upload" />
                            </p>
                            <p class="ant-upload-text">Da click o arrastra tu selfie <a-icon type="camera" /> a esta área para subirla</p>
                            <p class="ant-upload-hint">Estrictamente prohibido la carga de datos de la empresa u otros archivos maliciosos</p>
                        </a-upload-dragger>
                    </a-col>
                </a-row>
                <!-- <span style="font-size: 16px;">de usuarios</span> -->
            </a-row>
            <a-divider />
            <a-row class="steps">
                <span class="breadcrumb-header" style="font-weight: 400;">
                    Editar
                </span>
                <span style="font-size: 16px;">información de perfil de usuario</span>
            </a-row>
            <a-row class="">
                <a-col :sm="{ span:24 }" :md="{ span:18 }" :lg="{ span:12 }">
                    <a-form >
                        <a-form-item
                            label='E-mail'                            
                        >
                            <a-input
                                v-model="user.email"
                                v-decorator="[
                                    'email',
                                    {
                                    rules: [{
                                        type: 'email', message: '¡Escribe un email válido, por favor!',
                                    }]
                                    }
                                ]"
                            />
                        </a-form-item>
                        <a-form-item
                            label='Escolaridad'                            
                        >
                            <a-input
                                v-model="user.scholarship"
                                v-decorator="[
                                    'escolaridad',
                                    {
                                    rules: [{
                                        type: 'text', message: 'The input is not valid!',
                                    }]
                                    }
                                ]"
                            />
                        </a-form-item>
                        <a-form-item style="text-align: right">
                            <a-button 
                                class="btn--start-evaluations"
                                htmlType='submit'
                                :loading="loading"
                                @click="updateProfile"
                            >
                                Guardar <a-icon type="save" />
                            </a-button>
                        </a-form-item>
                    </a-form>
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script>
import client3B from '@/api/client3B';
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
            user: {
                email: '',
                scholarship: '',
            },
            loading: false,

        };
    },
    created() {
    },
    methods: {
        handleChange(info) {

            console.log(info.file)

            // if (status === 'done') {
                this.$message.success(`${info.file.name} file uploaded successfully.`);
            // } else if (status === 'error') {
            //     this.$message.error(`${info.file.name} file upload failed.`);
            // }
        },
        async updateProfile() {
            this.loading = true;
            const update = {
                emailAddress: this.user.email,
                scholarship: this.user.scholarship,
            };
            try {
                await client3B.user.updateScholarshipAndEmail(update);
                this.$message.success('¡Tu información fue guardada con éxito!');
            } catch (error) {
                this.handleError(error.response.data.error);
                this.loading = false;
                return;
            }
        },
        handleError(error) {
            const time = 10;
            this.errors = [];
            if (error.validationErrors) {
                error.validationErrors.forEach((err) => {
                    this.$message.error(err.message, time);
                    this.errors.push(err.message);
                });
            } else if (error.details) {
                this.$message.error(error.details, time);
                this.errors.push(error.details);
            } else if (error.message) {
                this.$message.error(error.message, time);
                this.errors.push(error.message);
            } else {
                this.$message.error(error, time);
                this.errors.push(error);
            }
        },
    },
};
</script>

<style>
    .collapse-content {
        margin: 32px;
        background: white;        
    }
    .btn--start-evaluations {
        border: none;
        background: #00d5af;
        color: #000;
        font-size: 11px;
        width: 128px;
    }
    .btn--start-evaluations:hover {
        background: #00af8f;
        color: #fff;
    }
</style>