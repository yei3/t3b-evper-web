<template>
    <div class="collapse" v-show="!hideSection">
        <a-row class="collapse-title background--title">
            <a-col :xs="12" :sm="14" :md="16" :lg="18" class="text-padding">
                <span>Seguimiento a Objetivos Actuales</span>
            </a-col>
            <a-col :xs="11" :sm="9" :md="7" :lg="5">
                <a-progress :percent="objectivesPercet(data)" strokeColor="#1ab394" size="small" />
                {{ objectivesText(data) }}
            </a-col>
            <a-col :span="1" style="text-align: right;">
                <a>
                    <a-icon class="dropdown-icon" type="down" @click="collapsed = !collapsed" v-show="collapsed" />
                </a>
                <a>
                    <a-icon class="dropdown-icon" type="up" @click="collapsed = !collapsed" v-show="!collapsed" />
                </a>
            </a-col>
        </a-row>
        <a-row v-show="spin">
            <div style="text-align: center; margin-top: 20px;">
                <a-spin tip="Cargando..." size="small" />
            </div>
        </a-row>
        <a-row class="collapse-content" v-show="!collapsed">
            <a-table :columns="columns" :dataSource="data" :pagination="false" :scroll="{ x: true }">
                <span slot="status" slot-scope="status">
                    <a-tag :class="selectTagColor(status)">{{ status }}</a-tag>
                </span>
                <span slot="objective" slot-scope="objective">
                    <p style="font-size: 13px">
                        <!-- <a
                        class="table-link"
                        @click="toggleViewProgressModal"
                    > -->
                        {{ objective.title }}
                        <!-- </a> -->
                    </p>
                    <!-- <p><small>{{objective.subtitle}}</small></p> -->
                </span>
                <span slot="evaluable" slot-scope="evaluable" class="text-center">
                    <a-icon type="check" v-if="!evaluable" />
                    <a-icon type="minus" v-if="evaluable" />
                </span>
                <span slot="action" slot-scope="text, record">
                    <a-dropdown>
                        <a-menu slot="overlay">
                            <a-menu-item
                                key="1"
                                :disabled="record.status === 'Completado'"
                                @click="toggleRecordProgressModal(record)"
                            >
                                Registrar avances
                            </a-menu-item>
                            <a-menu-item key="2" @click="toggleViewProgressModal(record)">
                                Ver avances
                            </a-menu-item>
                            <a-menu-divider />
                            <a-menu-item
                                key="3"
                                :disabled="
                                    record.status === 'Completado' ||
                                        record.status === 'No iniciado' ||
                                        record.status === 'Validado'
                                "
                                @click="toggleFinishObjectiveModal(record)"
                            >
                                Completar objetivo
                            </a-menu-item>
                        </a-menu>
                        <a-button class="ant-btn-small" v-show="record.evaluable">
                            ...
                        </a-button>
                    </a-dropdown>
                </span>
            </a-table>
        </a-row>
        <a-modal v-model="recordProgressModal.show" onOk="toggleRecordProgressModal" width="600px">
            <template slot="title">
                <a-row>
                    <a-col :span="24" class="modal-icon-wrapper">
                        <a-icon type="edit" class="modal-icon" />
                    </a-col>
                    <a-col :span="24" class="modal-header">
                        <h1>Registrar avance</h1>
                        <small>{{ recordProgressModal.objectiveName }}</small>
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
                    <a-textarea placeholder="Avance del objetivo..." :rows="6" v-model="recordProgressModal.message" />
                </a-col>
            </a-row>
            <template slot="footer">
                <a-button key="back" @click="recordProgressModal.show = false" :disabled="recordProgressModal.loading">
                    Cancelar
                </a-button>
                <a-button
                    class="modal-button-ok"
                    key="submit"
                    type="primary"
                    @click="toggleRecordProgressModal"
                    :disabled="!recordProgressModal.enableButton"
                    :loading="recordProgressModal.loading"
                >
                    Guardar
                </a-button>
            </template>
        </a-modal>

        <a-modal v-model="viewProgressModal.show" onOk="toggleViewProgressModal" width="600px">
            <template slot="title">
                <a-row>
                    <a-col :span="24" class="modal-header" style="margin-top: 25px;">
                        <h1>Ver avances</h1>
                        <small>{{ viewProgressModal.objectiveName }}</small>
                    </a-col>
                </a-row>
            </template>
            <a-row class="modal-content">
                <a-col :span="24" style="padding: 0px 20px;">
                    <a-timeline>
                        <a-timeline-item
                            v-for="(item, index) in binnacle"
                            :key="index"
                            color="gray"
                            class="timeline-item"
                        >
                            <a-icon slot="dot" type="edit" style="font-size: 20px" />
                            <p style="padding-left: 20px; padding-top: 5px">
                                <a-avatar size="small" style="backgroundColor:#87d068" icon="user" />
                                {{ item.username }}
                                <small>{{ item.created }}</small>
                            </p>
                            <p style="padding-left: 20px; padding-top: 5px">
                                {{ item.message }}
                            </p>
                        </a-timeline-item>
                    </a-timeline>
                </a-col>
            </a-row>
            <template slot="footer">
                <a-button key="back" @click="toggleViewProgressModal" :v-bind="false">
                    Cerrar
                </a-button>
            </template>
        </a-modal>

        <a-modal v-model="finishObjectiveModal.show" onOk="toggleFinishObjectiveModal" width="600px">
            <template slot="title">
                <a-row>
                    <a-col :span="24" class="modal-icon-wrapper">
                        <a-icon type="check-square" class="modal-icon" />
                    </a-col>
                    <a-col :span="24" class="modal-header">
                        <h1>Completar Objetivo</h1>
                        <small>{{ finishObjectiveModal.objectiveName }}</small>
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
                    <a-textarea placeholder="Comentarios..." :rows="6" v-model="finishObjectiveModal.message" />
                </a-col>
                <a-col :span="24" class="modal-content-seccion-bottom">
                    ¿Está seguro que desea completar el objetivo indicado?
                </a-col>
            </a-row>

            <template slot="footer">
                <a-button
                    key="back"
                    @click="finishObjectiveModal.show = false"
                    :disabled="finishObjectiveModal.loading"
                >
                    Cancelar
                </a-button>
                <a-button
                    class="modal-button-ok"
                    key="submit"
                    type="primary"
                    @click="toggleFinishObjectiveModal"
                    :disabled="!finishObjectiveModal.enableButton"
                    :loading="finishObjectiveModal.loading"
                >
                    Si, completar objetivo
                </a-button>
            </template>
        </a-modal>
    </div>
</template>

<script>
import client3B from "@/api/client3B";
import errorHandler from "@/views/errorHandler";

const columns = [
    {
        title: "Estatus",
        dataIndex: "status",
        key: "status",
        scopedSlots: { customRender: "status" },
    },
    {
        title: "Objetivos",
        dataIndex: "objective",
        key: "objective",
        scopedSlots: { customRender: "objective" },
    },
    /*{
        title: 'Evaluable',
        dataIndex: 'evaluable',
        key: 'evaluable',
        scopedSlots: { customRender: 'evaluable' },
        align: 'center',
    },*/
    {
        title: "Fecha fin",
        dataIndex: "endDate",
        key: "endDate",
    },
    {
        title: "",
        key: "action",
        scopedSlots: { customRender: "action" },
        align: "right",
    },
];

export default {
    data() {
        return {
            spin: false,
            collapsed: false,
            loaded: false,
            hideSection: false,
            data: [],
            columns,
            username: "",
            binnacle: [],
            recordProgressModal: {
                loading: false,
                show: false,
                enableButton: true,
                objectiveId: 0,
                objectiveName: "",
                message: "",
            },
            viewProgressModal: {
                loading: false,
                show: false,
                enableButton: true,
                objectiveId: 0,
                objectiveName: "",
            },
            finishObjectiveModal: {
                loading: false,
                show: false,
                enableButton: true,
                objectiveId: 0,
                objectiveName: "",
                message: "",
            },
        };
    },
    watch: {
        $route: "getCurrentObjectives",
    },
    async created() {
        await this.getCurrentObjectives();
    },
    methods: {
        async getBinnacle(objectiveId) {
            this.loaded = false;
            let response = null;
            try {
                response = await client3B.binnacle.getBinnacle({
                    evaluationMeasuredQuestionId: objectiveId,
                });
                this.binnacle = [];
                const { items } = response.data.result;

                for (let i = 0; i < items.length; i += 1) {
                    this.binnacle.push({
                        message: items[i].text,
                        username: items[i].userName,
                        created: new Date(items[i].creationTime + "Z").toLocaleDateString(),
                    });
                }
                // this.loaded = true;
            } catch (error) {
                errorHandler(this, error);
            }
        },
        async completeObjective(objectiveId) {
            // this.loaded = false;
            await client3B.objective
                .updateStatus({
                    id: objectiveId,
                    status: 3,
                })
                .catch((error) => errorHandler(this, error));
            this.sendBossNotification(objectiveId);
            this.$message.success("El objetivo se ha completado correctamente");
        },
        async addObjetiveMessage(objectiveId, message) {
            await client3B.binnacle
                .createMessage({
                    evaluationQuestionId: objectiveId,
                    text: message,
                })
                .catch((error) => errorHandler(this, error));
            this.$message.success("El mensaje se ha guardado correctamente");
        },
        async getCurrentObjectives() {
            this.spin = true;
            let response = null;
            try {
                response = await client3B.dashboard.getCollaborator();
                const items = response.data.result.objectiveSummary;
                this.data = [];
                for (let index = 0; index < items.length; index += 1) {
                    this.data.push({
                        key: index + 1,
                        id: items[index].id,
                        status: this.selectStatusName(items[index].status),
                        objective: {
                            title: items[index].name,
                            subtitle: "sin descripción",
                        },
                        evaluable: items[index].isNotEvaluable,
                        endDate: new Date(items[index].deliveryDate + "Z").toLocaleDateString(),
                    });
                    if (items[index].isNotEvaluable === false) {
                        this.hideSection = true;
                    }
                }
            } catch (error) {
                errorHandler(this, error);
            }
            this.spin = false;
        },
        async toggleRecordProgressModal(objective) {
            if (!this.recordProgressModal.show) {
                this.recordProgressModal.objectiveId = objective.id;
                this.recordProgressModal.objectiveName = objective.objective.title;
                this.recordProgressModal.show = !this.recordProgressModal.show;
            } else {
                this.recordProgressModal.loading = true;
                await this.addObjetiveMessage(
                    this.recordProgressModal.objectiveId,
                    this.recordProgressModal.message,
                ).catch((error) => errorHandler(this, error));
                const obj = this.data.find((tmp) => tmp.id === this.recordProgressModal.objectiveId);
                obj.status = this.selectStatusName(2);
                this.recordProgressModal.show = !this.recordProgressModal.show;
                this.recordProgressModal.loading = false;
            }
            this.recordProgressModal.message = "";
        },
        async toggleViewProgressModal(objective) {
            if (!this.viewProgressModal.show) {
                this.viewProgressModal.objectiveName = objective.objective.title;
                await this.getBinnacle(objective.id);
                this.viewProgressModal.show = !this.viewProgressModal.show;
            } else {
                // this.loaded = true;
                this.viewProgressModal.show = !this.viewProgressModal.show;
            }
        },
        async toggleFinishObjectiveModal(objective) {
            if (!this.finishObjectiveModal.show) {
                this.finishObjectiveModal.objectiveId = objective.id;
                this.finishObjectiveModal.objectiveName = objective.objective.title;
                this.finishObjectiveModal.show = !this.finishObjectiveModal.show;
            } else {
                this.finishObjectiveModal.show = true;
                await this.addObjetiveMessage(
                    this.finishObjectiveModal.objectiveId,
                    `Objetivo completado: ${this.finishObjectiveModal.message}`,
                ).catch((error) => errorHandler(this, error));
                await this.completeObjective(this.finishObjectiveModal.objectiveId).catch((error) =>
                    errorHandler(this, error),
                );
                const obj = this.data.find((tmp) => tmp.id === this.finishObjectiveModal.objectiveId);
                obj.status = this.selectStatusName(3);
                this.finishObjectiveModal.show = !this.finishObjectiveModal.show;
                this.finishObjectiveModal.show = false;
            }
            this.finishObjectiveModal.message = "";
        },
        async sendBossNotification(_objectiveId) {
            await client3B.notifications
                .sendBossNotification({
                    objectiveId: _objectiveId,
                })
                .catch((error) => errorHandler(this, error));
        },
        objectivesPercet(objectives) {
            let completed = 0;
            objectives.forEach((objective) => {
                if (objective.status === "Validado") {
                    completed += 1;
                }
            });
            return Math.ceil((completed * 100) / objectives.length);
        },
        objectivesText(objectives) {
            let completed = 0;
            let total = 0;
            objectives.forEach((objective) => {
                if (objective.status === "Validado") {
                    completed += 1;
                }
                total += 1;
            });
            return `${completed} de ${total} objetivos cumplidos.`;
        },
        selectTagColor(status) {
            switch (status) {
                case "No iniciado":
                    return "ant-tag-red";
                case "En proceso":
                    return "ant-tag-yellow";
                case "Completado":
                    return "ant-tag-green";
                case "Validado":
                    return "ant-tag-blue";
                default:
                    return "ant-tag-gray";
            }
        },
        selectStatusName(status) {
            switch (status) {
                case 0:
                    return "No iniciado";
                case 1:
                    return "No iniciado";
                case 2:
                    return "En proceso";
                case 3:
                    return "Completado";
                case 4:
                    return "Validado";
                default:
                    return "error";
            }
        },
    },
};
</script>

<style scoped>
@media only screen and (max-width: 660px) {
    .text-padding {
        text-align: center;
        padding: 0px;
    }
}
</style>
