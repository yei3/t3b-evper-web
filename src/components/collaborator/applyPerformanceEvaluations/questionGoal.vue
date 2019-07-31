<template>
    <a-col :span="24" style="padding: 5px 0px 0px 0px; margin-bottom: 0px;">
        <a-row :gutter="16">
            <a-col :md="4" :lg="2">
                <a-tag :class="tagColorClass">{{ objectiveStatus }}</a-tag>
            </a-col>
            <a-col :md="6" :lg="8">
                <strong>{{ objective.text }}</strong>
            </a-col>
            <a-col :md="6" :lg="8">
                {{ objective.notEvaluableAnswer.text }}
            </a-col>
            <a-col :md="6" :lg="4">
                {{ new Date(objective.terminationDateTime).toLocaleString() }}
            </a-col>
            <a-col :md="2" :lg="2">
                <a-dropdown>
                    <a-menu slot="overlay">
                        <a-menu-item key="2" @click="modals.modalViewProgress.show = true">
                            Ver avances
                        </a-menu-item>
                        <a-menu-item
                            key="1"
                            :disabled="objective.status === 3"
                            v-if="isCollaborator"
                            @click="
                                modals.modalRecordProgress.show = true;
                                modals.input = '';
                            "
                        >
                            Registrar avances
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item
                            key="3"
                            @click="
                                modals.modalComplete.show = true;
                                modals.input = '';
                            "
                            v-if="isCollaborator"
                            :disabled="objective.status !== 2"
                        >
                            Completar objetivo
                        </a-menu-item>
                        <a-menu-item
                            key="3"
                            @click="
                                modals.modalValidate.show = true;
                                modals.input = '';
                            "
                            v-if="isBoss"
                            :disabled="objective.status !== 3"
                        >
                            Validar objetivo
                        </a-menu-item>
                    </a-menu>
                    <a-button class="ant-btn-small">
                        ...
                    </a-button>
                </a-dropdown>
            </a-col>
        </a-row>
        <a-divider style="margin-top: 10px; background: #d5d5d5;" />
        <!-- Record Progress -->
        <a-modal v-model="modals.modalRecordProgress.show" width="600px">
            <template slot="title">
                <a-row>
                    <a-col :span="24" class="modal-icon-wrapper">
                        <a-icon type="edit" class="modal-icon" />
                    </a-col>
                    <a-col :span="24" class="modal-header">
                        <h1>Registrar avance</h1>
                        <small>{{ objective.name }}</small>
                    </a-col>
                </a-row>
            </template>

            <a-row class="modal-content">
                <a-col :span="24" class="modal-content-seccion-top">
                    <span>
                        Agregue un comentario referente a las acciones realizadas para cumplir el objetivo indicado.
                    </span>
                </a-col>
                <a-col :span="24" modal-content-seccion-bottom>
                    <a-textarea placeholder="Avance del objetivo..." :rows="6" v-model="modals.input" />
                </a-col>
            </a-row>
            <template slot="footer">
                <a-button key="back" @click="modals.modalRecordProgress.show = false">
                    Cancelar
                </a-button>
                <a-button
                    class="modal-button-ok"
                    key="submit"
                    type="primary"
                    @click="updateObjectiveStatus(modals.modalRecordProgress, STATUS.IN_PROGRESS)"
                    :loading="modals.modalRecordProgress.loading"
                    :disabled="modals.input === '' || modals.modalRecordProgress.loading"
                >
                    Guardar
                </a-button>
            </template>
        </a-modal>
        <!-- View Progress -->
        <a-modal v-model="modals.modalViewProgress.show" width="600px">
            <template slot="title">
                <a-row>
                    <a-col :span="24" class="modal-header" style="margin-top: 25px;">
                        <h1>Ver avances</h1>
                        <small>{{ objective$.name }}</small>
                    </a-col>
                </a-row>
            </template>
            <a-row class="modal-content">
                <a-col :span="24" style="text-align: center;">
                    <span v-if="binnacle.items.length === 0">No hay avances</span>
                </a-col>
                <a-col :span="24" style="padding: 0px 20px;">
                    <a-timeline>
                        <a-timeline-item
                            v-for="(item, index) in binnacle.items"
                            :key="index"
                            color="gray"
                            class="timeline-item"
                        >
                            <a-icon slot="dot" type="edit" style="font-size: 20px" />
                            <p style="padding-left: 20px; padding-top: 5px">
                                <a-avatar size="small" style="backgroundColor:#87d068" icon="user" />
                                {{ item.userName }}
                                <small>{{ item.creationTime }}</small>
                            </p>
                            <p style="padding-left: 20px; padding-top: 5px">
                                {{ item.text }}
                            </p>
                        </a-timeline-item>
                    </a-timeline>
                </a-col>
            </a-row>
            <template slot="footer">
                <a-button key="back" @click="modals.modalViewProgress.show = false">
                    Cerrar
                </a-button>
            </template>
        </a-modal>
        <!-- Complete Objective -->
        <a-modal v-model="modals.modalComplete.show" width="600px">
            <template slot="title">
                <a-row>
                    <a-col :span="24" class="modal-icon-wrapper">
                        <a-icon type="check-square" class="modal-icon" />
                    </a-col>
                    <a-col :span="24" class="modal-header">
                        <h1>Completar Objetivo</h1>
                        <small>{{ objective.name }}</small>
                    </a-col>
                </a-row>
            </template>

            <a-row class="modal-content">
                <a-col :span="24" class="modal-content-seccion-top">
                    <span>
                        Agregue un comentario referente a las acciones realizadas para cumplir el objetivo indicado.
                    </span>
                </a-col>
                <a-col :span="24" class="modal-content-seccion">
                    <a-textarea placeholder="Comentarios..." :rows="6" v-model="modals.input" />
                </a-col>
                <a-col :span="24" class="modal-content-seccion-bottom">
                    ¿Está seguro que desea completar el objetivo indicado?
                </a-col>
            </a-row>

            <template slot="footer">
                <a-button key="back" @click="modals.modalComplete.show = false">
                    Cancelar
                </a-button>
                <a-button
                    class="modal-button-ok"
                    key="submit"
                    type="primary"
                    :loading="modals.modalComplete.loading"
                    :disabled="modals.input === ''"
                    @click="updateObjectiveStatus(modals.modalComplete, STATUS.COMPLETED)"
                >
                    Si, completar objetivo
                </a-button>
            </template>
        </a-modal>
        <!-- Validate Objective -->
        <a-modal v-model="modals.modalValidate.show" width="600px">
            <template slot="title">
                <a-row>
                    <a-col :span="24" class="modal-icon-wrapper">
                        <a-icon type="check-square" class="modal-icon" />
                    </a-col>
                    <a-col :span="24" class="modal-header">
                        <h1>Validar Objetivo</h1>
                        <small>{{ objective.name }}</small>
                    </a-col>
                </a-row>
            </template>

            <a-row class="modal-content">
                <a-col :span="24" class="modal-content-seccion-top">
                    <span>
                        Agregue un comentario con respecto al cumplimiento del objetivo por parte del evaluado.
                    </span>
                </a-col>
                <a-col :span="24" class="modal-content-seccion">
                    <a-textarea placeholder="Comentarios..." :rows="6" v-model="modals.input" />
                </a-col>
                <a-col :span="24" class="modal-content-seccion-bottom">
                    ¿Está seguro que desea validar el objetivo indicado?
                </a-col>
            </a-row>

            <template slot="footer">
                <a-button key="back" @click="modals.modalValidate.show = false">
                    Cancelar
                </a-button>
                <a-button
                    class="btn-red"
                    type="danger"
                    :loading="modals.modalValidate.loading"
                    :disabled="modals.input === ''"
                    @click="updateObjectiveStatus(modals.modalValidate, STATUS.IN_PROGRESS)"
                >
                    No, reabrir objetivo
                </a-button>
                <a-button
                    class="modal-button-ok"
                    key="submit"
                    type="primary"
                    :loading="modals.modalValidate.loading"
                    :disabled="modals.input === ''"
                    @click="updateObjectiveStatus(modals.modalValidate, STATUS.VALIDATED)"
                >
                    Si, completar objetivo
                </a-button>
            </template>
        </a-modal>
    </a-col>
</template>

<script>
import errorHandler from "@/views/errorHandler";
import client3B from "@/api/client3B";
import authService from "@/services/auth";

export default {
    props: {
        onlyLecture: {
            type: Boolean,
            default: false,
        },
        index: {
            type: Number,
            required: true,
        },
        objective: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            objective$: null,
            binnacle: { items: [] },
            modals: {
                input: "",
                modalRecordProgress: {
                    show: false,
                    loading: false,
                },
                modalViewProgress: {
                    show: false,
                    loading: false,
                },
                modalComplete: {
                    show: false,
                    loading: false,
                },
                modalValidate: {
                    show: false,
                    loading: false,
                },
            },
            STATUS: {
                NOT_STARTED: 1,
                IN_PROGRESS: 2,
                COMPLETED: 3,
                VALIDATED: 4,
            },
        };
    },
    async created() {
        this.init();
    },
    methods: {
        async init() {
            this.objective$ = this.objective;
            this.binnacle = await this.getBinnacle(this.objective$.id);
        },
        async getBinnacle(objectiveId) {
            const response = await client3B.binnacle
                .getBinnacle({
                    EvaluationMeasuredQuestionId: objectiveId,
                })
                .catch((error) => errorHandler(this, error));

            return response.data.result;
        },
        async updateObjectiveStatus(_modal, status) {
            const modal = _modal;
            modal.loading = true;

            let response = await client3B.binnacle
                .createMessage({
                    evaluationQuestionId: this.objective.id,
                    text: this.modals.input,
                })
                .catch((error) => errorHandler(this, error));

            modal.loading = false;
            modal.show = false;

            if (!response) return;

            this.binnacle.items.push({
                id: response.data.result.id,
                evaluationQuestionId: response.data.result.evaluationQuestionId,
                text: response.data.result.text,
                creationTime: response.data.result.creationTime,
                userName: authService.getUserData().name,
            });

            response = await client3B.objective
                .updateStatus({
                    id: this.objective$.id,
                    status,
                })
                .catch((error) => errorHandler(this, error));

            modal.loading = false;
            if (!response) return;
            modal.show = false;
            this.objective$.status = status;
            this.$message.success("El objetivo se ha actualizado correctamente");
        },
    },
    computed: {
        tagColorClass() {
            const statuses = {
                0: "ant-tag-red", // No status
                1: "ant-tag-red", // No iniciado
                2: "ant-tag-yellow", // En progreso
                3: "ant-tag-green", // Completado
                4: "ant-tag-blue", // Validado
            };

            return statuses[this.objective$.status];
        },
        objectiveStatus() {
            const statuses = {
                0: "No iniciado",
                1: "No iniciado",
                2: "En proceso",
                3: "Completado",
                4: "Validado",
            };

            return statuses[this.objective$.status];
        },
        isCollaborator() {
            return authService.ROLES.COLLABORATOR === authService.getCurrentRole();
        },
        isBoss() {
            return authService.ROLES.SUPERVISOR === authService.getCurrentRole();
        },
    },
};
</script>

<style src="@/assets/styles/evaluationForm.css" scoped></style>
<style scoped>
div >>> .ant-form-item-label {
    text-align: left;
}

div >>> .ant-form-item-required {
    font-size: 15px;
}

div >>> .ant-form-item {
    margin-bottom: 5px;
}

.input-save {
    color: green;
}

.input-save:hover {
    color: #005f00;
    cursor: pointer;
}
</style>
