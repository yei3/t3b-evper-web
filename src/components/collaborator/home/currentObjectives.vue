<template>
    <div class="collapse">
        <a-row class="collapse-title background--title">
            <a-col :xs="12" :sm="14" :md="16" :lg="18" class="text-padding">
                <span>Seguimiento</span>
            </a-col>
            <a-col :xs="11" :sm="9" :md="7" :lg="5">
                <a-progress :percent="0" size="small" />
            </a-col>
            <a-col :span=1 style="text-align: right;">
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
        <a-row class="collapse-content" v-show="!collapsed">
            <a-table :columns="columns" :dataSource="data" :pagination="false">
                <span slot="status" slot-scope="status">
                    <a-tag :class="selectTagColor(status)">{{status}}</a-tag>
                </span>
                <span slot="objective" slot-scope="objective">
                    <p>
                    <!-- <a
                        class="table-link"
                        @click="toggleViewProgressModal"
                    > -->
                        {{objective.title}}
                    <!-- </a> -->
                    </p>
                    <p><small>{{objective.subtitle}}</small></p>
                </span>
                <span slot="action" slot-scope="text, record">
                    <a-dropdown >
                        <a-menu slot="overlay">
                            <a-menu-item key="1" @click="toggleRecordProgressModal(record)">
                                Registrar avances
                            </a-menu-item>
                            <a-menu-item key="2" @click="toggleViewProgressModal(record)">
                                Ver avances
                            </a-menu-item>
                            <a-menu-divider />
                            <a-menu-item key="3" @click="toggleFinishObjectiveModal(record)">
                                Completar objectivo
                            </a-menu-item>
                        </a-menu>
                        <a-button class="ant-btn-small">
                            ...
                        </a-button>
                    </a-dropdown>
                </span>
            </a-table>
        </a-row>
        <a-modal
            v-model="recordProgressModal.show"
            onOk="toggleRecordProgressModal"
            width="600px"
        >
            <template slot="title">
                <a-row>
                    <a-col :span="24" class="modal-icon-wrapper">
                        <a-icon type="edit" class="modal-icon" />
                    </a-col>
                    <a-col :span="24" class="modal-header">
                        <h1>Registrar avance</h1>
                        <small>{{recordProgressModal.objectiveName}}</small>
                    </a-col>
                </a-row>
            </template>

            <a-row class="modal-content">
                <a-col :span="24" class="modal-content-seccion-top">
                    <span>
                        Agregue un comentario referente a las acciones realizadas
                        para cumplir el objetivo indicado.
                    </span>
                </a-col>
                <a-col :span="24" modal-content-seccion-bottom>
                    <a-textarea placeholder="Avance del objetivo..." :rows="6" v-model="message"/>
                </a-col>
            </a-row>
            <template slot="footer">
                <a-button
                    key="back"
                    @click="toggleRecordProgressModal"
                >
                    Cancelar
                </a-button>
                <a-button
                    class="modal-button-ok"
                    key="submit"
                    type="primary"
                    @click="toggleRecordProgressModal"
                    :disabled="!recordProgressModal.enableButton"
                >
                    Guardar
                </a-button>
            </template>
        </a-modal>

        <a-modal
            v-model="viewProgressModal.show"
            onOk="toggleViewProgressModal"
            width="600px"
        >
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
                    <a-timeline mode="alternate">
                        <a-timeline-item v-for="(item, index) in binnacle" :key="index" color="gray" class="timeline-item">
                            <a-icon slot="dot" type="edit" style="font-size: 20px" />
                            <p style="padding-left: 20px; padding-top: 5px">
                                <a-avatar size="small" style="backgroundColor:#87d068" icon="user"/>
                                {{ item.username }}
                                <small>{{ item.created }}</small>
                            </p>
                            <p style="padding-left: 20px; padding-top: 5px">
                                {{ item.message }}
                            </p>
                        </a-timeline-item>
                    </a-timeline>
                </a-col>
            </a-row>            <template slot="footer">
                <a-button
                    key="back"
                    @click="toggleViewProgressModal"
                    :v-bind="false"
                >
                    Cerrar
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
                        <h1>Completar Objetivo</h1>
                        <small>{{ finishObjectiveModal.objectiveName }}</small>
                    </a-col>
                </a-row>
            </template>

            <a-row class="modal-content">
                <a-col :span="24" class="modal-content-seccion-top">
                    <span>
                        Agregue un comentario referente a las acciones
                        realizadas para cumplir el objetivo indicado.
                    </span>
                </a-col>
                <a-col :span="24" class="modal-content-seccion">
                    <a-textarea placeholder="Comentarios..." :rows="6"/>
                </a-col>
                <a-col :span="24" class="modal-content-seccion-bottom">
                     ¿Está seguro que desea completar el objetivo indicado?
                </a-col>
            </a-row>

            <template slot="footer">
                <a-button
                    key="back"
                    @click="toggleFinishObjectiveModal"
                >
                    Cancelar
                </a-button>
                <a-button
                    class="modal-button-ok"
                    key="submit"
                    type="primary"
                    @click="toggleFinishObjectiveModal"
                    :disabled="!finishObjectiveModal.enableButton"
                >
                    Si, completar objetivo
                </a-button>
            </template>
        </a-modal>

    </div>
</template>

<script>
import client3B from '@/api/client3B';
import errorHandler from '@/views/errorHandler';

const columns = [
    {
        title: 'Estatus',
        dataIndex: 'status',
        key: 'status',
        scopedSlots: { customRender: 'status' },
    },
    {
        title: 'Objetivos',
        dataIndex: 'objective',
        key: 'objective',
        scopedSlots: { customRender: 'objective' },
    },
    {
        title: 'Fecha fin',
        dataIndex: 'endDate',
        key: 'endDate',
    },
    {
        title: '',
        key: 'action',
        scopedSlots: { customRender: 'action' },
        align: 'right',
    },
];

export default {
    data() {
        return {
            spin: false,
            collapsed: false,
            loaded: false,
            data: [],
            columns,
            message: '',
            username: '',
            binnacle: [],
            recordProgressModal: {
                show: false,
                enableButton: true,
                objectiveId: 0,
                objectiveName: ''
            },
            viewProgressModal: {
                show: false,
                enableButton: true,
                objectiveId: 0,
                objectiveName: '',
            },
            finishObjectiveModal: {
                show: false,
                enableButton: true,
                objectiveId: 0,
                objectiveName: '',
            },

        };
    },
    async created() {
        await this.getCurrentObjectives();
    },
    methods: {
        async getBinnacle(objectiveId) {
            this.loaded = false;
            let response = null;
            try {
                response = await client3B.binnacle.getBinnacle({ evaluationMeasuredQuestionId: objectiveId, });
                this.binnacle = [];
                const items = response.data.result.items;

                for (let i = 0; i < items.length; i++) {
                    this.binnacle.push({
                        message: items[i].text,
                        username: items[i].userName,
                        created: new Date(items[i].creationTime).toLocaleDateString(),
                    });
                }
                // this.loaded = true;
            } catch (error) {
                console.log(error);
            }
        },
        async completeObjective(objectiveId) {
            // this.loaded = false;
            await client3B.objective.updateStatus
            (
                {
                    id: objectiveId,
                    status: 3,
                }
            ).catch(error => errorHandler(this, error));
            this.$message.success('El objetivo se ha completado correctamente');
        },
        async addObjetiveMessage(objectiveId, message) {
            await client3B.binnacle.createMessage
            (
                {
                    evaluationQuestionId: objectiveId,
                    text: message,
                }
            ).catch(error => errorHandler(this, error));
            this.message = '';
            this.$message.success('El mensaje se ha guardado correctamente');
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
                            subtitle: 'sin descripción',
                        },
                        endDate: new Date(items[index].deliveryDate).toLocaleString(),
                    });
                }
            } catch (error) {
                console.log(error);
            }
            this.spin = false;
        },
        async toggleRecordProgressModal(input) {

            if (!this.recordProgressModal.show) {
                this.recordProgressModal.objectiveId = input.id;
                this.recordProgressModal.objectiveName = input.objective.title;
                this.recordProgressModal.show = !this.recordProgressModal.show;
            } else {
                await this.addObjetiveMessage(this.recordProgressModal.objectiveId, this.message);
                this.recordProgressModal.show = !this.recordProgressModal.show;
            }
        },
        async toggleViewProgressModal(input) {
            if (!this.viewProgressModal.show) {
                this.viewProgressModal.objectiveName = input.objective.title;
                await this.getBinnacle(input.id);
                this.viewProgressModal.show = !this.viewProgressModal.show;
            }
            else {
                // this.loaded = true;
                this.viewProgressModal.show = !this.viewProgressModal.show;
            }
        },
        async toggleFinishObjectiveModal(input) {
            if (!this.finishObjectiveModal.show) {
                this.finishObjectiveModal.objectiveId = input.id;
                this.finishObjectiveModal.objectiveName = input.objective.title;
                this.finishObjectiveModal.show = !this.finishObjectiveModal.show;
            } else {
                await this.completeObjective(this.finishObjectiveModal.objectiveId);
                this.finishObjectiveModal.show = !this.finishObjectiveModal.show;
            }
        },
        selectTagColor(status) {
            switch (status) {
            case 'No iniciado':
                return 'ant-tag-red';
            case 'En proceso':
                return 'ant-tag-yellow';
            case 'Completado':
                return 'ant-tag-green';
            case 'Validado':
                return 'ant-tag-blue';
            default:
                return 'ant-tag-gray';
            }
        },
        selectStatusName(status) {
            switch (status) {
            case 0:
                return 'No iniciado';
            case 1:
                return 'No iniciado';
            case 2:
                return 'En proceso';
            case 3:
                return 'Completado';
            case 4:
                return 'Validado';
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
