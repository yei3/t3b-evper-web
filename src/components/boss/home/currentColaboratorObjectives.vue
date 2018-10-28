<template>
    <div class="collapse">
        <a-row class="collapse-title">
            <a-col :span="12">
                Seguimiento a Objetivos Actuales de Colaboradores
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
        <div v-show="!collapsed">
            <a-row :key="colaborator.id" v-for="colaborator in data">
                <a-col :span="24">
                    <a-col :span="20">
                        <a-avatar shape="square" icon="user" />
                        <a
                            @click="currentColaborator = (colaborator.id !== currentColaborator)?
                                colaborator.id:0">
                            {{colaborator.name}}
                        </a>
                    </a-col>
                    <a-col :span="4">
                        <p><a-progress :percent="50" :showInfo="false" /></p>
                        <p>(3 de 4 objetivos cumplidos)</p>
                    </a-col>
                </a-col>
                <a-col :span="24" v-show="currentColaborator == colaborator.id">
                    <a-table
                        :columns="columns"
                        :dataSource="colaborator.objetives"
                        :pagination=false
                    >
                        <span slot="status" slot-scope="status">
                            <a-tag color="red">{{status}}</a-tag>
                        </span>
                        <span slot="objective" slot-scope="objective">
                            <p><a @click="toggleViewProgressModal">
                                {{objective.title}}
                            </a></p>
                            <p><small>{{objective.subtitle}}</small></p>
                        </span>
                        <span slot="action" slot-scope="text, record">
                            <a-dropdown>
                                <a-menu slot="overlay">
                                    <a-menu-item key="1" @click="toggleViewProgressModal">
                                        Ver avances
                                    </a-menu-item>
                                </a-menu>
                                <a-button style="margin-left: 8px">
                                    ...
                                </a-button>
                            </a-dropdown>
                        </span>
                    </a-table>
                </a-col>
            </a-row>
        </div>

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
                        <small>(Nombre del Objetivo) - (Nombre del colaborador)</small>
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
                                se están revisando actualmente.
                            </p>
                        </a-timeline-item>
                        <a-timeline-item color="red">
                            <a-icon slot="dot" type="clock-circle-o" style="fontSize: '16px'" />
                            <p> Karen Villanueva <small>13/07/2018 01:32:40 pm</small> </p>
                            <p>  Se ha seleccionado el proveedor, ya contamos con a
                                muestra del producto.
                            </p>
                        </a-timeline-item>
                        <a-timeline-item>
                            <p> Karen Villanueva <small>13/07/2018 01:32:40 pm</small> </p>
                            <p> Se ha revisado el producto, se procede a la compra. </p>
                        </a-timeline-item>
                        <a-timeline-item>
                            <p> Karen Villanueva <small>13/07/2018 01:32:40 pm</small> </p>
                            <p> Se ha completado el objetivo, ya
                                contamos con el producto en operación.
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
    },
];

export default {
    data() {
        return {
            collapsed: false,
            currentColaborator: 0,
            columns,
            viewProgressModal: {
                show: false,
                enableButton: true,
            },
            data: [
                {
                    id: 1,
                    name: 'Leonardo Juárez',
                    objetives: [
                        {
                            key: '1',
                            status: 'Validado',
                            objective: {
                                title: 'Planes de sucesión en Barrientos',
                                subtitle: 'Entregable: Documento con plan detallado ',
                            },
                            endDate: '13/07/2018',
                        },
                        {
                            key: '2',
                            status: 'Validado',
                            objective: {
                                title: 'Portal de Beneficios',
                                subtitle: 'Entregable: Sitio productivo con la información de beneficios',
                            },
                            endDate: '13/07/2018',
                        },
                        {
                            key: '3',
                            status: 'Completado',
                            objective: {
                                title: 'Sistema de Evaluación de Desempeño',
                                subtitle: 'Entregable: Sistema productivo',
                            },
                            endDate: '13/07/2018',
                        },
                        {
                            key: '4',
                            status: 'Validado',
                            objective: {
                                title: 'Plan de formación',
                                subtitle: 'Entregable: Documento con plan detallado',
                            },
                            endDate: '13/07/2018',
                        },
                    ],
                },
                {
                    id: 2,
                    name: 'Silvia Sánchez',
                    objetives: [
                        {
                            key: '1',
                            status: 'No iniciado',
                            objective: {
                                title: 'Planes de sucesión en Barrientos',
                                subtitle: 'Entregable: Documento con plan detallado ',
                            },
                            endDate: '13/07/2018',
                        },
                        {
                            key: '2',
                            status: 'Validado',
                            objective: {
                                title: 'Portal de Beneficios',
                                subtitle: 'Entregable: Sitio productivo con la información de beneficios',
                            },
                            endDate: '13/07/2018',
                        },
                        {
                            key: '3',
                            status: 'Completado',
                            objective: {
                                title: 'Sistema de Evaluación de Desempeño',
                                subtitle: 'Entregable: Sistema productivo',
                            },
                            endDate: '13/07/2018',
                        },
                        {
                            key: '4',
                            status: 'Validado',
                            objective: {
                                title: 'Plan de formación',
                                subtitle: 'Entregable: Documento con plan detallado',
                            },
                            endDate: '13/07/2018',
                        },
                    ],
                },
                {
                    id: 3,
                    name: 'Laura Alcántara',
                    objetives: [
                        {
                            key: '1',
                            status: 'No iniciado',
                            objective: {
                                title: 'Planes de sucesión en Barrientos',
                                subtitle: 'Entregable: Documento con plan detallado ',
                            },
                            endDate: '13/07/2018',
                        },
                        {
                            key: '2',
                            status: 'Pendiente',
                            objective: {
                                title: 'Portal de Beneficios',
                                subtitle: 'Entregable: Sitio productivo con la información de beneficios',
                            },
                            endDate: '13/07/2018',
                        },
                        {
                            key: '3',
                            status: 'Completado',
                            objective: {
                                title: 'Sistema de Evaluación de Desempeño',
                                subtitle: 'Entregable: Sistema productivo',
                            },
                            endDate: '13/07/2018',
                        },
                        {
                            key: '4',
                            status: 'Validado',
                            objective: {
                                title: 'Plan de formación',
                                subtitle: 'Entregable: Documento con plan detallado',
                            },
                            endDate: '13/07/2018',
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        toggleViewProgressModal() {
            this.viewProgressModal.show = !this.viewProgressModal.show;
        },
        selectTagColor(status) {
            if (status === 'No iniciado') {
                return 'ant-tag-red';
            }
            if (status === 'Pendiente') {
                return 'ant-tag-yellow';
            }
            if (status === 'Finalizado') {
                return 'ant-tag-green';
            }
            return 'ant-tag-gray';
        },
    },
};
</script>

<style scoped>

</style>
