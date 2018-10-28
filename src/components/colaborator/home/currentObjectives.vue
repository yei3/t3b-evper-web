<template>
    <div class="collapse">
        <a-row class="collapse-title">
            <a-col :span="12">
                Seguimiento a mis objectivos actuales
            </a-col>
            <a-col :span="12" style="text-align: right;">
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
        <transition name="fade">
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
                    <span slot="action" slot-scope="text, record">
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
                            <a-button style="margin-left: 8px">
                                ...
                            </a-button>
                        </a-dropdown>
                    </span>
                </a-table>
            </a-row>
        </transition>
        <a-modal
            v-model="recordProgressModal.show"
            onOk="toggleRecordProgressModal"
            width="600px"
        >
            <template slot="title">
                <a-row>
                    <a-col :span="24">
                        <h1>Registrar avance</h1>
                    </a-col>
                    <a-col :span="24">
                        <small>(Nombre del Objetivo)</small>
                    </a-col>
                </a-row>
            </template>

            <a-row>
                <a-col :span="24">
                    <span>
                        Agregue un comentario referente a las acciones realizadas
                        para cumplir el objetivo indicado.
                    </span>
                </a-col>
                <a-col :span="24">
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
                    <a-col :span="24">
                        <h1>Ver avances</h1>
                    </a-col>
                    <a-col :span="24">
                        <small>(Nombre del Objetivo)</small>
                    </a-col>
                </a-row>
            </template>

            <a-row>
                <a-col :span="24">
                    <a-timeline>
                        <a-timeline-item>
                            <p> Karen Villanueva <small>13/07/2018 01:32:40 pm</small> </p>
                            <p> Se han definido las características del producto. </p>
                        </a-timeline-item>
                        <a-timeline-item>
                            <p> Karen Villanueva <small>13/07/2018 01:32:40 pm</small> </p>
                            <p> Se han revisado propuestas de 3 proveedores,
                                se están revisando actualmente.</p>
                        </a-timeline-item>
                        <a-timeline-item color="red">
                            <a-icon slot="dot" type="clock-circle-o" style="fontSize: '16px'" />
                            <p> Karen Villanueva <small>13/07/2018 01:32:40 pm</small> </p>
                            <p>  Se ha seleccionado el proveedor, ya contamos
                                con a muestra del producto. </p>
                        </a-timeline-item>
                        <a-timeline-item>
                            <p> Karen Villanueva <small>13/07/2018 01:32:40 pm</small> </p>
                            <p> Se ha revisado el producto, se procede a la compra. </p>
                        </a-timeline-item>
                        <a-timeline-item>
                            <p> Karen Villanueva <small>13/07/2018 01:32:40 pm</small> </p>
                            <p> Se ha completado el objetivo, ya contamos con
                                el producto en operación. </p>
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
                    <a-col :span="24">
                        <h1>Completar Objetivo</h1>
                    </a-col>
                    <a-col :span="24">
                        <small>(Nombre del Objetivo)</small>
                    </a-col>
                </a-row>
            </template>

            <a-row>
                <a-col :span="24">
                    <span>
                        Agregue un comentario referente a las acciones
                        realizadas para cumplir el objetivo indicado.
                    </span>
                </a-col>
                <a-col :span="24">
                    <a-textarea placeholder="Comentarios..." :rows="6"/>
                </a-col>
                <a-col :span="24">
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
const columns = [
    {
        title: 'Estatus',
        dataIndex: 'status',
        key: 'status',
        scopedSlots: { customRender: 'status' },
    }, {
        title: 'Objectivo',
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
            data: [
                {
                    key: '1',
                    status: 'No iniciado',
                    objective: {
                        title: 'Planes de sucesión en Barrientos',
                        subtitle: 'Entregable: Documento con plan detallado',
                    },
                    endDate: '30/09/2018',
                },
                {
                    key: '2',
                    status: 'Pendiente',
                    objective: {
                        title: 'Portal de Beneficios',
                        subtitle: 'Entregable: Sitio productivo con la información de beneficios',
                    },
                    endDate: '15/10/2018',
                },
                {
                    key: '3',
                    status: 'Completado',
                    objective: {
                        title: 'Sistema de Evaluación de Desempeño',
                        subtitle: 'Entregable: Sistema productivo',
                    },
                    endDate: '15/12/2018',
                },
                {
                    key: '4',
                    status: 'Validado',
                    objective: {
                        title: 'Plan de formación',
                        subtitle: 'Entregable: Documento con plan detallado',
                    },
                    endDate: '15/12/2018',
                },
            ],
            columns,
        };
    },
    methods: {
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
            if (status === 'No iniciado') {
                return 'ant-tag-red';
            }
            if (status === 'Pendiente') {
                return 'ant-tag-yellow';
            }
            if (status === 'Completado') {
                return 'ant-tag-green';
            }
            if (status === 'Validado') {
                return 'ant-tag-blue';
            }
            return 'ant-tag-gray';
        },
    },
};
</script>

<style scoped>

</style>
