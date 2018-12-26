<template>
    <div class="collapse">
        <a-row class="collapse-title background--title">
            <a-col :span="23" style="text-align: center;">
                Seguimiento
            </a-col>
            <a-col :span="1" style="text-align: right;">
                <a>
                    <a-icon
                        class="dropdown-icon"
                        type="down"
                        @click="collapsed = !collapsed"
                        v-show="!collapsed"
                    />
                </a>
                <a>
                    <a-icon
                        class="dropdown-icon"
                        type="up"
                        @click="collapsed = !collapsed"
                        v-show="collapsed"
                    />
                </a>
            </a-col>
        </a-row>
        <a-row v-show="spin">
            <div style="text-align: center; margin-top: 20px;">
                <a-spin size="small" />
            </div>
        </a-row>
        <a-row class="collapse-content" v-show="!collapsed">
            <a-table :columns="columns" :dataSource="data" :pagination=false>
                <span slot="status" slot-scope="status">
                    <a-tag :class="selectTagColor(status)">{{status}}</a-tag>
                </span>
                <span slot="objective" slot-scope="objective">
                    <p><a
                        class="table-link"
                        @click="toggleViewProgressModal"
                    >
                        {{objective.title}}
                    </a></p>
                    <p><small>{{objective.subtitle}}</small></p>
                </span>
                <!-- <span slot="action" slot-scope="text, record">
                    <a-dropdown>
                        <a-menu slot="overlay">
                            <a-menu-item key="1" @click="toggleRecordProgressModal">
                                Registrar avances
                            </a-menu-item>
                            <a-menu-item key="2" @click="toggleViewProgressModal">
                                Ver avances
                            </a-menu-item>
                            <a-menu-divider />
                            <a-menu-item key="3" @click="toggleFinishObjectiveModal">
                                Completar objectivo
                            </a-menu-item>
                        </a-menu>
                        <a-button class="ant-btn-small">
                            ...
                        </a-button>
                    </a-dropdown>
                </span> -->
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
                        <small>(Nombre del Objetivo)</small>
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
                    <a-textarea placeholder="Avance del objetivo..." :rows="6"/>
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
                        <small>(Nombre del Objetivo)</small>
                    </a-col>
                </a-row>
            </template>

            <a-row class="modal-content">
                <a-col :span="24" style="padding: 0px 20px;">
                    <a-timeline>
                        <a-timeline-item color="gray" class="timeline-item">
                            <a-icon slot="dot" type="edit" style="font-size: 20px" />
                            <p style="padding-left: 20px; padding-top: 5px">
                                <a-avatar size="small" src="/user.jpg"/> Karen Villanueva
                                <small>13/07/2018 01:32:40 pm</small>
                            </p>
                            <p style="padding-left: 20px; padding-top: 5px">
                                Se han definido las características del producto.
                            </p>
                        </a-timeline-item>
                        <a-timeline-item color="gray" class="timeline-item">
                            <a-icon slot="dot" type="edit" style="font-size: 20px" />
                            <p style="padding-left: 20px; padding-top: 5px">
                                <a-avatar size="small" src="/user.jpg"/> Karen Villanueva
                                <small>13/07/2018 01:32:40 pm</small>
                            </p>
                            <p style="padding-left: 20px; padding-top: 5px">
                                Se han revisado propuestas de 3 proveedores,
                                se están revisando actualmente.
                            </p>
                        </a-timeline-item>
                        <a-timeline-item color="gray" class="timeline-item">
                            <a-icon slot="dot" type="edit" style="font-size: 20px" />
                            <p style="padding-left: 20px; padding-top: 5px">
                                <a-avatar size="small" src="/user.jpg"/> Karen Villanueva
                                <small>13/07/2018 01:32:40 pm</small>
                            </p>
                            <p style="padding-left: 20px; padding-top: 5px">
                                Se ha seleccionado el proveedor, ya contamos
                                con a muestra del producto.
                            </p>
                        </a-timeline-item >
                        <a-timeline-item color="gray" class="timeline-item">
                            <a-icon slot="dot" type="edit"
                                style="font-size: 20px; backgroud: #f8fafb"
                            />
                            <p style="padding-left: 20px; padding-top: 5px">
                                <a-avatar size="small"
                                    src="/user.jpg"
                                /> Karen Villanueva
                                <small>13/07/2018 01:32:40 pm</small>
                            </p>
                            <p style="padding-left: 20px; padding-top: 5px">
                                Se ha revisado el producto, se procede a la compra.
                            </p>
                        </a-timeline-item>
                        <a-timeline-item color="gray" class="timeline-item">
                            <a-icon slot="dot" type="check-circle"
                                style="font-size: 20px; color: #1ab394"
                            />
                            <p style="padding-left: 20px; padding-top: 5px">
                                <a-avatar size="small"
                                    src="/user.jpg"
                                /> Karen Villanueva
                                <small>13/07/2018 01:32:40 pm</small>
                            </p>
                            <p style="padding-left: 20px; padding-top: 5px">
                                Se ha completado el objetivo, ya contamos con
                                el producto en operación.
                            </p>
                        </a-timeline-item>
                    </a-timeline>
                </a-col>
            </a-row>

            <template slot="footer">
                <a-button
                    key="back"
                    @click="toggleViewProgressModal"
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
                        <small>(Nombre del Objetivo)</small>
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
    }, {
        title: 'Objectivos',
        dataIndex: 'objective',
        key: 'objective',
        scopedSlots: { customRender: 'objective' },
    }, {
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
            recordProgressModal: {
                show: false,
                enableButton: true,
            },
            viewProgressModal: {
                show: false,
                enableButton: true,
            },
            finishObjectiveModal: {
                show: false,
                enableButton: true,
            },
            data: [],
            columns,
        };
    },
    created() {
        this.getCurrentObjectives();
    },
    methods: {
        async getCurrentObjectives() {
            this.spin = true;
            let response = null;
            try {
                response = await client3B.dashboard.getCollaborator();
                const items = response.data.result.objectiveSummary;
                this.data = [];
                for (let index = 0; index < items.length; index += 1) {
                    this.data.push({
                        key: index+1,
                        status: this.selectStatusName(items[index].status),
                        objective: {
                            title: items[index].name,
                            subtitle: 'sin descripción'
                        },
                        endDate: new Date(items[index].deliveryDate).toLocaleDateString()
                    });
                }
            } catch (error) {
                console.log(error);
            }
            this.spin = false;
        },
        toggleRecordProgressModal() {
            this.recordProgressModal.show = !this.recordProgressModal.show;
        },
        toggleViewProgressModal() {
            this.viewProgressModal.show = !this.viewProgressModal.show;
        },
        toggleFinishObjectiveModal() {
            this.finishObjectiveModal.show = !this.finishObjectiveModal.show;
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

</style>
