<template>
    <a-layout id="login-layout" style="min-height: 100vh" >
        <a-layout-content class="login-back">
            <a-row
                type="flex"
                justify="center"
                align="middle"
                style="min-height: 90vh"
            >
                <a-col><a-row
                    type="flex"
                    justify="center"
                    align="middle"
                >
                        <a-col :span="11" class="login-img">
                        <img
                            alt="image"
                            src="@/assets/img/login-imagen.png"
                            style="max-width: 80%; height: auto;"
                        >
                    </a-col>
                    <a-col :span="5" class="login-form">
                        <a-row>
                            <a-col :span="24">
                                <img
                                    alt="image"
                                    src="@/assets/img/logo-tipografia.png"
                                    style="max-width: 100%; height: auto; padding-top: 80px;"
                                >
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col style="text-align: center;">
                                <label style="font-size: 16px; font-weight: 900; color: red;">
                                    E
                                </label>
                                <label style="font-size: 16px; font-weight: 900; color: black;">
                                    valuación de
                                </label>
                                <label style="font-size: 16px; font-weight: 900; color: red;">
                                    D
                                </label >
                                <label style="font-size: 16px; font-weight: 900; color: black;">
                                    esempeño
                                </label>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col>
                                <a-form
                                    @submit="handleSubmit"
                                    :autoFormCreate="(form)=>{this.form = form}"
                                >
                                    <a-form-item>
                                        <a-input />
                                    </a-form-item>
                                    <a-form-item>
                                        <a-input />
                                    </a-form-item>
                                    <a-form-item
                                        :wrapperCol="{ span: 12, offset: 5 }"
                                    >
                                        <a-button htmlType='submit' class="login-buttom">
                                            Submit
                                        </a-button>
                                    </a-form-item>
                                </a-form>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a href="#">¿Olvidó su número de empleado o contraseña?</a>
                        </a-row>
                    </a-col>
                </a-row>
                <a-row
                    type="flex"
                    justify="center"
                    align="middle"
                >
                    <a-col :span="17">
                        <strong style="font-weight: 700;">Tiendas 3B</strong> © 2018
                    </a-col>
                </a-row></a-col>
            </a-row>
        </a-layout-content>
    </a-layout>
</template>

<script>
import Footer from '@/components/layout/Footer.vue';

export default {
    components: {
        Footer,
    },
    data() {
        return {
        };
    },
};
</script>


<style scoped>
#login-layout {
    padding: 0px 46px 0px 46px;
    background: white;
}

.login-back {
    background-image: url('../../src/assets/img/login-background.png');
    background-color: white;
    background-repeat: no-repeat;
    background-position: center;
    max-width: 100%;
    height: auto;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    padding: 10px;
}

.login-img {
    min-height: 1px;
}

.login-form {
    text-aling: center;
}

.login-buttom {

}
</style>
