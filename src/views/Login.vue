<template>
    <a-layout id="login-layout" style="min-height: 100vh">
        <a-layout-content class="login-back">
            <a-row type="flex" justify="center" align="middle" style="min-height: 90vh">
                <a-col>
                    <a-row type="flex" justify="center" align="middle">
                        <a-col :md="{ span: 12 }" :lg="{ span: 9 }" class="login-img">
                            <img
                                alt="image"
                                src="@/assets/img/login-imagen2.png"
                                style="max-width: 80%; height: auto"
                            />
                        </a-col>
                        <a-col :md="{ span: 12 }" :lg="{ span: 9 }" class="login-form">
                            <a-row>
                                <a-col :span="24" style="text-aling: center">
                                    <img
                                        alt="image"
                                        src="@/assets/img/logo-tipografia.png"
                                        style="max-width: 30%; height: auto; padding-top: 80px"
                                    />
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col style="text-align: center">
                                    <label style="font-size: 30px; font-weight: 900; color: black"
                                        >Evaluación de desempeño</label
                                    >
                                    <a-divider />
                                </a-col>
                            </a-row>
                            <a-row type="flex" justify="center" align="middle">
                                <a-col
                                    :md="{ span: 14 }"
                                    :sm="{ span: 24 }"
                                    v-if="!showFormConfirmPassword && !showRecovPass"
                                >
                                    <a-form>
                                        <a-form-item
                                            hasFeedback
                                            :validateStatus="errors.length ? 'error' : ''"
                                        >
                                            <a-input
                                                v-model="user.id"
                                                class="form-input"
                                                placeholder="Número de Empleado"
                                            />
                                        </a-form-item>
                                        <a-form-item
                                            hasFeedback
                                            :validateStatus="errors.length ? 'error' : ''"
                                        >
                                            <a-input
                                                type="password"
                                                v-model="user.password"
                                                class="form-input"
                                                placeholder="Contraseña"
                                            />
                                        </a-form-item>
                                        <a-form-item>
                                            <a-button
                                                block
                                                htmlType="submit"
                                                class="login-buttom"
                                                :loading="loading"
                                                @click="login"
                                                >Ingresar</a-button
                                            >
                                        </a-form-item>
                                    </a-form>
                                </a-col>
                                <a-col
                                    :md="{ span: 14 }"
                                    :sm="{ span: 24 }"
                                    v-if="showFormConfirmPassword && !showRecovPass"
                                >
                                    <a-form>
                                        <a-form-item style="margin: 0px">
                                            <label for>
                                                <h4 style="color: red; margin: 0px">
                                                    Para continuar actualiza tus datos
                                                </h4>
                                            </label>
                                        </a-form-item>
                                        <a-form-item
                                            hasFeedback
                                            :validateStatus="errors.length ? 'error' : ''"
                                        >
                                            <a-input
                                                v-model="user.email"
                                                class="form-input"
                                                placeholder="Email de la empresa"
                                                type="email"
                                            />
                                        </a-form-item>
                                        <a-form-item
                                            hasFeedback
                                            :validateStatus="errors.length ? 'error' : ''"
                                        >
                                            <a-input
                                                type="password"
                                                v-model="user.newPassword"
                                                class="form-input"
                                                placeholder="Nueva Contraseña"
                                            />
                                        </a-form-item>
                                        <a-form-item
                                            hasFeedback
                                            :validateStatus="errors.length ? 'error' : ''"
                                        >
                                            <a-input
                                                type="password"
                                                v-model="user.newPasswordConfirmation"
                                                class="form-input"
                                                placeholder="Confirma tu nueva contraseña"
                                            />
                                        </a-form-item>
                                        <a-form-item style="margin-bottom: 0px">
                                            <a-button
                                                block
                                                htmlType="submit"
                                                class="login-buttom"
                                                :loading="loading"
                                                @click="updatePassword"
                                                >Actualizar datos</a-button
                                            >
                                        </a-form-item>
                                        <a-form-item>
                                            <a
                                                style="color: #666; text-decoration: underline"
                                                @click="redirectToHome"
                                                >Cancelar</a
                                            >
                                        </a-form-item>
                                    </a-form>
                                </a-col>
                                <a-col :md="{ span: 14 }" :sm="{ span: 24 }" v-if="showRecovPass">
                                    <a-form>
                                        <a-form-item
                                            hasFeedback
                                            :validateStatus="errors.length ? 'error' : ''"
                                        >
                                            <a-input
                                                v-model="user.id"
                                                class="form-input"
                                                placeholder="Número de Empleado"
                                            />
                                        </a-form-item>
                                        <a-form-item
                                            hasFeedback
                                            :validateStatus="errors.length ? 'error' : ''"
                                        >
                                            <a-input
                                                type="email"
                                                v-model="user.email"
                                                class="form-input"
                                                placeholder="Correo Eletrónico"
                                            />
                                        </a-form-item>
                                        <a-form-item>
                                            <a-button
                                                block
                                                htmlType="submit"
                                                class="login-buttom"
                                                :loading="loading"
                                                @click="passwordRecovery"
                                                >Enviar correo de recuperación</a-button
                                            >
                                        </a-form-item>
                                    </a-form>
                                </a-col>
                            </a-row>
                            <a-row v-show="!showFormConfirmPassword && !showRecovPass">
                                <a-col>
                                    <a
                                        @click="showRecovPass = true"
                                        style="color: #666; text-decoration: underline"
                                        >¿Olvidó su contraseña?</a
                                    >
                                </a-col>
                            </a-row>
                            <a-row v-show="showRecovPass">
                                <a-col>
                                    <a
                                        @click="showRecovPass = false"
                                        style="color: #666; text-decoration: underline"
                                        >Iniciar Sesión</a
                                    >
                                </a-col>
                            </a-row>
                        </a-col>
                    </a-row>
                    <a-divider />
                    <a-row type="flex" justify="center" align="middle">
                        <a-col :span="17">
                            <small>Tiendas 3B © {{ new Date().getFullYear() }}</small>
                        </a-col>
                        <a-col style="text-align: rigth">
                            <a href style="color: #666">
                                <small>
                                    Yei
                                    <b>3</b> Software
                                </small>
                            </a>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
        </a-layout-content>
    </a-layout>
</template>

<script>
import Footer from "@/components/layout/Footer.vue";
import client3B from "@/api/client3B";
import authService from "@/services/auth";
import loginDates from "@/services/loginDates";

export default {
    components: {
        Footer,
    },
    data() {
        return {
            user: {
                id: "",
                password: "",
                email: "",
                newPassword: "",
                newPasswordConfirmation: "",
            },
            showFormConfirmPassword: false,
            showRecovPass: false,
            loading: false,
            errors: [],
            authData: null,
            userData: null,
        };
    },
    methods: {
        redirectToHome() {
            this.loading = false;
            this.$router.go("/");
        },
        async login() {
            this.loading = true;
            this.errors = [];
            const auth = {
                userNameOrEmailAddress: this.user.id,
                password: this.user.password,
            };

            let response = null;
            try {
                response = await client3B.auth.authenticate(auth);
            } catch (error) {
                if (error.response) {
                    this.handleError(error.response.data.error);
                } else {
                    this.handleError(error);
                }
                this.loading = false;
                return;
            }
            this.authData = response.data.result;

            // Neccessary to get the session information
            authService.storeAuthData(this.authData);
            try {
                response = await client3B.session.getSession();
            } catch (error) {
                this.handleError(error.response.data.error);
                this.loading = false;
                return;
            }
            authService.removeAuthData();
            this.userData = response.data.result.user;
            this.userData.roles = response.data.result.roles;
            if (
                this.authData.isFirstTimeLogin &&
                this.userData.roles[0] !== authService.ROLES.ADMINISTRATOR
            ) {
                this.showFormConfirmPassword = true;
                this.loading = false;
                return;
            }

            this.saveSession();
        },
        saveSession() {
            loginDates.storeLastLoginDate();
            authService.storeAuthData(this.authData);
            authService.storeUserData(this.userData);
            this.redirectToHome();
        },
        async updatePassword() {
            this.loading = true;
            const update = {
                employeeNumber: this.user.id,
                email: this.user.email,
                password: this.user.newPassword,
                confirmPassword: this.user.newPasswordConfirmation,
            };
            if (this.validatePass(update.password)) {
                authService.storeAuthData(this.authData);
                try {
                    await client3B.account.firstTimeLogin(update);
                } catch (error) {
                    this.handleError(error.response.data.error);
                    this.loading = false;
                    authService.removeAuthData();
                    return;
                }
                this.saveSession();
            } else {
                this.$message.error(
                    "La contraseña debe tener al menos un número, una mayúscula y un símbolo.",
                );
                this.loading = false;
            }
        },
        async passwordRecovery() {
            this.loading = true;
            const response = await client3B.user
                .recoverPassword({
                    employeeNumber: this.user.id,
                    emailAddress: this.user.email,
                })
                .catch((error) => this.handleError(error));
            this.loading = false;
            if (!response) return;
            this.showRecovPass = false;
            this.$message.success("Se ha enviado el correo de recuperación");
        },
        validatePass(password) {
            const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\d]).{5,}$/;
            return regex.test(password);
        },
        handleError(error) {
            const time = 10;
            this.errors = [];
            if (error.response) {
                this.handleError(error.response.data.error);
            }
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

<style scoped>
#login-layout {
    padding: 0px 46px 0px 46px;
    background: white;
}

.login-back {
    background-image: url("../../src/assets/img/login-background.png");
    background-color: white;
    background-repeat: no-repeat;
    background-position: center;
    max-width: 100%;
    height: auto;
    -webkit-background-size: contain;
    -moz-background-size: contain;
    -o-background-size: contain;
    background-size: contain;
    padding: 10px;
}

.login-img {
    min-height: 1px;
    text-align: center;
}

@media only screen and (max-width: 768px) {
    .login-img {
        display: none;
    }
}

.login-form {
    text-align: center;
}

.form-input {
    text-align: center;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
}

.form-input:focus {
    border-color: #1ab394;
    box-shadow: 0 0 0 1px rgb(26, 179, 148);
}

.form-input:hover {
    border-color: #1ab394;
}

.login-buttom {
    text-align: center;
    background: #1ab394;
    color: #fff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    border-color: transparent;
}

.login-buttom:hover {
    border-color: #1ab394;
    box-shadow: 0 0 0 1px rgb(26, 179, 148);
}
</style>
