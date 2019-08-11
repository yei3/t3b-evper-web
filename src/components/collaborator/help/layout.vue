<template>
    <div class="users">
        <a-row class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Ayuda</h1>
            </a-col>
        </a-row>
        <div
            class="collapse-content"
            style="background-color: white;
            margin: 30px 30px; padding-left:30px;"
        >
            <a-row class="collapse-title" style="margin: 16px 0;">
                <a-col :span="24">
                    <h2>Guía de estados</h2>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <h2>Evaluaciones:</h2>
                <br />
                <a-col :span="2">
                    <span>
                        <a-tag class="ant-tag-red">No iniciada</a-tag>
                    </span>
                </a-col>
                <a-col :span="22">
                    <span>
                        El primer estado de una evaluación, es el estado que tendrá una vez
                        programada la evaluación.
                    </span>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <br />
                <a-col :span="2">
                    <span>
                        <a-tag class="ant-tag-yellow">En proceso</a-tag>
                    </span>
                </a-col>
                <a-col :span="22">
                    <span>
                        Al presionar "Iniciar" una evaluación, cambiará al estado "En proceso". Al
                        estar en este estado, la acción permitida en la sección de "Mis
                        evaluaciones" será "Continuar".
                    </span>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <br />
                <a-col :span="2">
                    <span>
                        <a-tag class="ant-tag-green">Finalizada</a-tag>
                    </span>
                </a-col>
                <a-col :span="22">
                    <span>
                        Al terminar de responder una evaluación o una auto evaluación, se podrá
                        "Finalizar evaluación" y pasará a este estado. La acción disponible será
                        "Agendar revisión"
                    </span>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <br />
                <a-col :span="2">
                    <span>
                        <a-tag class="ant-tag-gray">Pte. revisión</a-tag>
                    </span>
                </a-col>
                <a-col :span="22">
                    <span>
                        Una vez que el evaluador presione la acción de "Agendar revisión", la
                        evaluación pasará al estado "Pendiente de revisión", se dejará de mostrar en
                        la sección de "Mis evaluaciones" y se mostrará en la sección de "Cierre de
                        evaluaciones" con la acción disponible de "Cerrar". Una vez que la
                        evaluación tenga el estado de "Pendiente de revisión", el evaluado podrá
                        verla desde su home en la sección de "Cierre de mi evaluación" y la única
                        acción disponible será la de "Cerrar" que no hará otra cosa más que abrir la
                        evaluación para editar la sección de "Próximos objetivos" en caso de que
                        tenga esta sección.
                    </span>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <br />
                <a-col :span="2">
                    <span>
                        <a-tag class="ant-tag-blue">Cerrada</a-tag>
                    </span>
                </a-col>
                <a-col :span="22">
                    <span>
                        Cuando un evaluador presiona el botón "Cerrar" revisará los próximos
                        objetivos y confirmará si desea pasar a "Cerrada la evaluación". La única
                        opción disponible será "Ver"
                    </span>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <br />
                <br />
                <h2>Objetivos:</h2>
                <br />
                <a-col :span="2">
                    <span>
                        <a-tag class="ant-tag-red">No iniciado</a-tag>
                    </span>
                </a-col>
                <a-col :span="22">
                    <span>
                        Es el estado de origen, tendrá ese estado al cargarse por primera vez en el
                        seguimiento o en la auto evaluación o evalución.
                    </span>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <br />
                <a-col :span="2">
                    <span>
                        <a-tag class="ant-tag-yellow">En proceso</a-tag>
                    </span>
                </a-col>
                <a-col :span="22">
                    <span>
                        Cuando a un objetivo se le registra algún avance, pasa a este estado o
                        cuando se reabre por un evaluador.
                    </span>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <br />
                <a-col :span="2">
                    <span>
                        <a-tag class="ant-tag-green">Completado</a-tag>
                    </span>
                </a-col>
                <a-col :span="22">
                    <span>
                        El evaluado indica que ha concluido el objetivo.
                    </span>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <br />
                <a-col :span="2">
                    <span>
                        <a-tag class="ant-tag-blue">Validado</a-tag>
                    </span>
                </a-col>
                <a-col :span="22">
                    <span>
                        El evaluador podrá validar el objetivo en cualquier momento (lo más común es
                        que lo haga una vez que el evaluado lo haya completado de manera
                        satisfactoria). En este estado, ya no se permitirán agregar avances.
                    </span>
                </a-col>
            </a-row>
        </div>
        <div
            class="collapse-content"
            style="background-color: white;
            margin: 30px 30px;"
        >
            <a-row class="collapse-title" style="margin: 16px 0;">
                <a-col :span="24">
                    <h2>Contactar al administrador</h2>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="24">
                    <h2>Mensaje:</h2>
                    <a-input v-model="form.message" placeholder="Mensaje" />
                </a-col>
            </a-row>
            <a-row class="text-right" style="padding: 16px 0;">
                <a-button class="btn-green" @click="sendMessage()" :loading="loading">
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
import client3B from "@/api/client3B";
import errorHandler from "@/views/errorHandler";

export default {
    components: {},
    data() {
        return {
            spin: false,
            loading: false,
            form: {
                message: "",
            },
        };
    },
    methods: {
        async sendMessage() {
            this.loading = true;
            const response = await client3B.notifications
                .publishGeneralMessageToAdminMail({
                    generalMessage: this.form.message,
                })
                .catch((error) => errorHandler(this, error.response.data.error));
            if (response) {
                this.$message.success("Mensaje enviado.");
            }
            this.loading = false;
        },
    },
};
</script>

<style scoped>
.dropdown-icon {
    color: #fff;
}
</style>
