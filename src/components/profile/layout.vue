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
                    <span class="breadcrumb-header">
                        Edita tu foto de perfil
                    </span>
                </a-row>
                <a-row>
                    <a-col :sm="{ span: 24 }">
                        <input type="file" id="fileinput" />
                        <button id="upload-button" @click="updateImgProfile">
                            <a-icon type="cloud-upload" />
                            Subir imagen
                        </button>
                        <!-- <a-upload-dragger name="file" :multiple="false" change="handleChange">
                            <p class="ant-upload-drag-icon">
                                <a-icon type="cloud-upload" />
                            </p>
                            <p class="ant-upload-text">
                                Da click o arrastra tu selfie
                                <a-icon type="camera" /> a esta área para subirla
                            </p>
                            <p class="ant-upload-hint">
                                Estrictamente prohibido la carga de datos de
                                la empresa u otros archivos maliciosos
                            </p>
                        </a-upload-dragger> -->
                    </a-col>
                </a-row>
                <a-row v-show="spin">
                    <div style="text-align: center; margin-top: 20px;">
                        <a-spin tip="Subiendo imagen..." size="small" />
                    </div>
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
                <a-col :sm="{ span: 24 }" :md="{ span: 18 }" :lg="{ span: 12 }">
                    <a-form>
                        <a-form-item label="E-mail">
                            <a-input
                                v-model="user.email"
                                v-decorator="[
                                    'email',
                                    {
                                        rules: [
                                            {
                                                type: 'email',
                                                message: '¡Escribe un email válido, por favor!',
                                            },
                                        ],
                                    },
                                ]"
                            />
                        </a-form-item>
                        <a-form-item label="Escolaridad">
                            <a-input
                                v-model="user.scholarship"
                                v-decorator="[
                                    'escolaridad',
                                    {
                                        rules: [
                                            {
                                                type: 'text',
                                                message: 'The input is not valid!',
                                            },
                                        ],
                                    },
                                ]"
                            />
                        </a-form-item>
                        <a-form-item style="text-align: right">
                            <a-button
                                class="btn--start-evaluations"
                                htmlType="submit"
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
import authService from "@/services/auth";
import client3B from "@/api/client3B";
import Footer from "@/components/layout/Footer.vue";
import errorHandler from "@/views/errorHandler";
import "@/assets/scripts/azure-storage.blob.min";

export default {
    components: {
        Footer,
    },
    beforeCreate() {
        this.form = this.$form.createForm(this);
    },
    data() {
        return {
            spin: false,
            userInfo: authService.getUserData(),
            userData: "",
            user: {
                id: 0,
                email: "",
                scholarship: "",
            },
            loading: false,
            headers: {
                authorization: "authorization-text",
            },
            account: {
                name: "t3bevper", // esto es algo temporal se tiene que crear un mecanismo para obtener el SAS Token
                sas:
                    "?sv=2018-03-28&ss=bf&srt=sco&sp=rwdlac&se=2020-07-31T05:17:21Z&st=2019-07-07T21:17:21Z&sip=0.0.0.0-255.255.255.255&spr=https&sig=DSQ%2BTtRQZ%2ByDyeae0iwvXwGcxmdNZsQ5EGYsDwMomow%3D",
            },
        };
    },
    created() {
        this.getUserInfo();
    },
    methods: {
        updateImgProfile() {
            this.spin = true;
            const file = document.getElementById("fileinput").files[0];
            const blobUri = "https://" + this.account.name + ".blob.core.windows.net";
            const blobService = AzureStorage.Blob.createBlobServiceWithSas(
                blobUri,
                this.account.sas,
            );

            if (typeof file != "undefined") {
                blobService.createBlockBlobFromBrowserFile(
                    "evper",
                    "images/profile/" + this.user.id + ".png",
                    file,
                    (error, result) => {
                        if (error) {
                            this.$message.error(
                                "Hubo un problema al cargar tu imagen, vuele a intentarlo",
                            );
                        } else {
                            this.spin = false;
                            this.$message.success("Tu imagen fue cargada con éxito.");
                        }
                    },
                );
            } else {
                this.$message.error("¡Selecciona una imagen por favor!");
            }
        },
        handleChange(info) {
            // updateImgProfile must be here
        },
        async updateProfile() {
            this.loading = true;
            const update = {
                emailAddress: this.user.email,
                scholarship: this.user.scholarship,
            };
            try {
                await client3B.user.updateScholarshipAndEmail(update);
                this.$message.success("¡Tu información fue guardada con éxito!");
                this.loading = false;
            } catch (error) {
                this.handleError(error.response.data.error);
                this.loading = false;
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
        async getUserInfo() {
            let response = null;
            try {
                response = await client3B.user.get(this.userInfo.id);
                this.userData = response.data.result;
                this.user.id = this.userData.userName;
                this.user.email = this.userData.emailAddress;
                this.user.scholarship = this.userData.scholarship;
            } catch (error) {
                errorHandler(this, error);
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
