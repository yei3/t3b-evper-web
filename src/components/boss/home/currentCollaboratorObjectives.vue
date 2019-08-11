<template>
    <div class="collapse">
        <a-row class="collapse-title-boss">
            <a-col :span="23" class="text-center">
                Seguimiento a Objetivos Actuales
            </a-col>
            <a-col :span="1" style="text-align: right;">
                <a>
                    <a-icon
                        class="dropdown-icon"
                        type="down"
                        @click="collapsed = !collapsed"
                        v-show="collapsed"
                    />
                </a>
                <a>
                    <a-icon
                        class="dropdown-icon"
                        type="up"
                        @click="collapsed = !collapsed"
                        v-show="!collapsed"
                    />
                </a>
            </a-col>
        </a-row>
        <a-row v-show="spin">
            <div style="text-align: center; margin-top: 20px;">
                <a-spin tip="Cargando..." size="small" />
            </div>
        </a-row>
        <div v-show="!collapsed" style="margin: 25px 26px; padding-bottom: 30px;">
            <a-row
                :key="collaborator.id"
                v-for="(collaborator, index) in data"
                class="collapse-single-wrapper"
            >
                <a-col :span="24" class="collapse-single-header">
                    <a-col :span="20">
                        <a-avatar shape="circle" :src="collaboratorImgUrl(collaborator.number)" />
                        <a
                            class="table-link"
                            style="margin-left: 5px;"
                            @click="
                                currentCollaborator = index !== currentCollaborator ? index : -1
                            "
                        >
                            {{ collaborator.name }}
                        </a>
                    </a-col>
                    <a-col :span="4">
                        <p>
                            <a-progress
                                strokeColor="#1ab394"
                                :percent="objectivesPercet(collaborator.objectives)"
                                :showInfo="false"
                                size="small"
                            />
                        </p>
                        <p>
                            <small>({{ objectivesCount(collaborator.objectives) }})</small>
                        </p>
                    </a-col>
                </a-col>
                <a-col
                    :span="24"
                    class="collapse-single-content"
                    v-show="currentCollaborator == index"
                >
                    <a-table
                        :columns="columns"
                        :dataSource="collaborator.objectives"
                        :pagination="false"
                        :scroll="{ x: true }"
                    >
                        <span slot="status" slot-scope="status">
                            <a-tag :class="selectTagColor(status)">{{ status }}</a-tag>
                        </span>
                        <span slot="objective" slot-scope="objective, record">
                            <p>
                                <!-- <a
                                class="table-link"
                                @click="toggleViewProgressModal(record)"
                            > -->
                                {{ objective.title }}
                                <!-- </a> -->
                            </p>
                            <p>
                                <small>{{ objective.subtitle }}</small>
                            </p>
                        </span>
                        <span slot="action" slot-scope="text, record">
                            <a-dropdown>
                                <a-menu slot="overlay">
                                    <a-menu-item key="1" @click="toggleViewProgressModal(record)">
                                        Ver avances
                                    </a-menu-item>
                                    <a-menu-divider />
                                    <a-menu-item
                                        key="2"
                                        :disabled="
                                            record.status === 'En proceso' ||
                                                record.status === 'No iniciado'
                                        "
                                        @click="toggleFinishObjectiveModal(record)"
                                    >
                                        {{ transformStatus(record.status) }}
                                    </a-menu-item>
                                </a-menu>
                                <a-button class="ant-btn-small" v-show="record.evaluable">
                                    ...
                                </a-button>
                            </a-dropdown>
                        </span>
                    </a-table>
                </a-col>
            </a-row>
        </div>

        <a-modal v-model="viewProgressModal.show" onOk="toggleViewProgressModal" width="600px">
            <template slot="title">
                <a-row>
                    <a-col :span="24" class="modal-header">
                        <h1>Ver avances</h1>
                        <small
                            >{{ viewProgressModal.objectiveName }} -
                            {{ viewProgressModal.evaluatedName }}</small
                        >
                    </a-col>
                </a-row>
            </template>
            <a-row class="modal-content">
                <a-col :span="24" style="padding: 0px 20px;">
                    <a-timeline>
                        <a-timeline-item
                            v-for="(item, index) in viewProgressModal.binnacle"
                            :key="index"
                            color="gray"
                            class="timeline-item"
                        >
                            <a-icon slot="dot" type="edit" style="font-size: 20px" />
                            <p style="padding-left: 20px; padding-top: 5px">
                                <a-avatar
                                    size="small"
                                    style="backgroundColor:#87d068"
                                    icon="user"
                                />
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
                <a-button
                    class="modal-button-ok"
                    key="submit"
                    type="primary"
                    @click="viewProgressModal.show = false"
                >
                    OK
                </a-button>
            </template>
        </a-modal>

        <a-modal
            v-model="finishObjectiveModal.show"
            onOk="toggleFinishObjectiveModal"
            width="600px"
        >
            <template slot="title">
                <a-row>
                    <a-col :span="24" class="modal-icon-wrapper">
                        <a-icon type="check-square" class="modal-icon" />
                    </a-col>
                    <a-col :span="24" class="modal-header">
                        <h1>Validar o Reabrir Objetivo</h1>
                        <small>
                            {{ finishObjectiveModal.objectiveName }} -
                            {{ finishObjectiveModal.evaluatedName }}
                        </small>
                    </a-col>
                </a-row>
            </template>

            <a-row class="modal-content">
                <a-col :span="24" class="modal-content-seccion-top">
                    <span>
                        Agregue un comentario con respecto al cumplimiento del objetivo por parte
                        del evaluado.
                    </span>
                </a-col>
                <a-col :span="24" class="modal-content-seccion">
                    <a-textarea
                        placeholder="Comentarios..."
                        :rows="6"
                        v-model="finishObjectiveModal.message"
                    />
                </a-col>
                <a-col :span="24" class="modal-content-seccion-bottom">
                    ¿Está seguro que desea validar o reabrir el objetivo indicado?
                </a-col>
            </a-row>

            <template slot="footer">
                <a-button
                    key="open"
                    type="danger"
                    @click="toggleOpenOrValidateObjective(false)"
                    :disabled="finishObjectiveModal.loading"
                >
                    No, reabrir objetivo
                </a-button>
                <a-button
                    class="modal-button-ok"
                    key="submit"
                    type="primary"
                    @click="toggleOpenOrValidateObjective(true)"
                >
                    Si, validar objetivo
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
        title: "Objetivo",
        dataIndex: "objective",
        key: "objective",
        scopedSlots: { customRender: "objective" },
    },
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
            hideSection: false,
            currentCollaborator: -1,
            columns,
            viewProgressModal: {
                show: false,
                enableButton: true,
                objectiveName: "",
                evaluatedName: "",
                binnacle: [],
            },
            finishObjectiveModal: {
                show: false,
                enableButton: true,
                objectiveId: 0,
                objectiveName: "",
                evaluatedName: "",
                message: "",
            },
            data: [],
        };
    },
    created() {
        this.getCollaboratorsObjectives();
    },
    methods: {
        async openOrValidateObjective(objectiveId, status) {
            await client3B.objective
                .updateStatus({
                    id: objectiveId,
                    status,
                })
                .catch((error) => errorHandler(this, error));
            const action = status === 2 ? "reabierto" : "validado";
            this.$message.success(`El objetivo se ha ${action} correctamente`);
        },
        async addObjetiveMessage(objectiveId, message) {
            await client3B.binnacle
                .createMessage({
                    evaluationQuestionId: objectiveId,
                    text: message,
                })
                .catch((error) => errorHandler(this, error));
            this.message = "";
            this.$message.success("El mensaje se ha guardado correctamente");
        },
        async getCollaboratorsObjectives() {
            this.spin = true;
            let response = null;
            try {
                response = await client3B.dashboard.getSupervisor();
                const items = response.data.result.collaboratorsObjectivesSummary;
                this.data = [];
                for (let index = 0; index < items.length; index += 1) {
                    const objectives = [];
                    const objectivesAux = items[index].objectivesSummary;

                    for (let jndex = 0; jndex < objectivesAux.length; jndex += 1) {
                        const binnacle = [];
                        const binnacleAux = objectivesAux[jndex].binnacle;
                        for (let hndex = 0; hndex < binnacleAux.length; hndex += 1) {
                            binnacle.push({
                                message: binnacleAux[hndex].text,
                                username: binnacleAux[hndex].userName,
                                created: new Date(
                                    `${binnacleAux[hndex].creationTime}Z`,
                                ).toLocaleDateString(),
                            });
                        }
                        objectives.push({
                            key: jndex + 1,
                            id: objectivesAux[jndex].id,
                            name: items[index].collaboratorFullName,
                            status: this.selectStatusName(objectivesAux[jndex].status),
                            evaluable: objectivesAux[jndex].isNotEvaluable,
                            objective: {
                                title: objectivesAux[jndex].name,
                                binnacle,
                            },
                            endDate: new Date(
                                `${objectivesAux[jndex].deliveryDate}Z`,
                            ).toLocaleDateString(),
                        });
                        if (objectivesAux[jndex].isNotEvaluable === false) {
                            this.hideSection = true;
                        }
                    }
                    this.data.push({
                        key: index + 1,
                        name: items[index].collaboratorFullName,
                        number: items[index].collaboratorEmployeeNumber,
                        objectives,
                        totalPendingObjectives: items[index].totalPendingObjectives,
                    });
                    if (this.data.length <= 0) {
                        this.hideSection = true;
                    }
                }
            } catch (error) {
                errorHandler(this, error);
            }
            this.spin = false;
        },
        async toggleViewProgressModal(input) {
            this.viewProgressModal.evaluatedName = input.name;
            this.viewProgressModal.binnacle = input.objective.binnacle;
            this.viewProgressModal.objectiveName = input.objective.title;
            this.viewProgressModal.show = !this.viewProgressModal.show;
        },
        async toggleFinishObjectiveModal(input) {
            this.finishObjectiveModal.evaluatedName = input.name;
            this.finishObjectiveModal.objectiveId = input.id;
            this.finishObjectiveModal.objectiveName = input.objective.title;
            this.finishObjectiveModal.show = !this.finishObjectiveModal.show;
        },
        async toggleOpenOrValidateObjective(input) {
            if (input) {
                await this.addObjetiveMessage(
                    this.finishObjectiveModal.objectiveId,
                    `Objetivo validado: ${this.finishObjectiveModal.message}`,
                ).catch((error) => errorHandler(this, error));
                await this.openOrValidateObjective(this.finishObjectiveModal.objectiveId, 4).catch(
                    (error) => errorHandler(this, error),
                );
                let obj = null;
                for (let i = 0; i < this.data.length; i += 1) {
                    if (
                        typeof this.data[i].objectives.find(
                            (tmp) => tmp.id === this.finishObjectiveModal.objectiveId,
                        ) !== "undefined"
                    ) {
                        obj = this.data[i].objectives.find(
                            (tmp) => tmp.id === this.finishObjectiveModal.objectiveId,
                        );
                    }
                }
                obj.status = this.selectStatusName(4);
            } else {
                await this.addObjetiveMessage(
                    this.finishObjectiveModal.objectiveId,
                    `Objetivo Reabierto: ${this.finishObjectiveModal.message}`,
                ).catch((error) => errorHandler(this, error));
                await this.openOrValidateObjective(this.finishObjectiveModal.objectiveId, 2).catch(
                    (error) => errorHandler(this, error),
                );
                let obj = null;
                for (let i = 0; i < this.data.length; i += 1) {
                    if (
                        typeof this.data[i].objectives.find(
                            (tmp) => tmp.id === this.finishObjectiveModal.objectiveId,
                        ) !== "undefined"
                    ) {
                        obj = this.data[i].objectives.find(
                            (tmp) => tmp.id === this.finishObjectiveModal.objectiveId,
                        );
                    }
                }
                obj.status = this.selectStatusName(2);
            }
            this.finishObjectiveModal.show = false;
            this.finishObjectiveModal.message = "";
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
                return "No iniciado";
            }
        },
        transformStatus(status) {
            return status === "Validado" ? "Reabrir objetivo" : "Validar objetivo";
        },
        objectivesCount(objectives) {
            let completed = 0;
            objectives.forEach((objective) => {
                if (objective.status === "Validado") {
                    completed += 1;
                }
            });

            return `${completed} de ${objectives.length} objetivos cumplidos`;
        },
        objectivesPercet(objectives) {
            let completed = 0;
            objectives.forEach((objective) => {
                if (objective.status === "Validado") {
                    completed += 1;
                }
            });
            return (completed * 100) / objectives.length;
        },
        collaboratorImgUrl(employeeNumber) {
            return `${process.env.VUE_APP_IMAGES_URL}/profile/${employeeNumber}.png`;
        },
    },
};
</script>

<style scoped></style>
