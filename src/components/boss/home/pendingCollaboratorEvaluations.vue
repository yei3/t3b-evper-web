<template>
    <div class="collapse">
        <a-row class="collapse-title">
            <a-col :span="12">
                Evaluaciones de Colaboradores Pendientes
            </a-col>
            <a-col :span="12" style="text-align: right;">
                <router-link
                    class="collapse-tittle-link"
                    :to="{ name: 'boss-assessments' }"
                >
                    Ver todas
                </router-link>
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
        <a-row class="collapse-content" v-show="!collapsed">
            <a-table :columns="columns" :dataSource="data" :pagination=false>
                <span slot="status" slot-scope="status">
                    <a-tag :class="selectTagColor(status)">{{status}}</a-tag>
                </span>
                <span slot="evaluation" slot-scope="evaluation">
                    <p>
                        <router-link
                            class="table-link"
                            :to="{name: 'boss-assessments-apply' }"
                        >
                            {{evaluation.title}}
                        </router-link>
                    </p>
                    <p><small>{{evaluation.subtitle}}</small></p>
                </span>
                <span slot="action" slot-scope="action">
                    <div v-show="transformStatus(action) !== 'Agendar revisión'">
                        <router-link
                            class="table-link-light"
                            :to="{ name: 'boss-assessments-apply' }"
                        >
                            {{transformStatus(action)}}
                        </router-link>
                    </div>
                    <a class="table-link-light"
                        @click="toggleScheduleReviewModal"
                        v-show="transformStatus(action) === 'Agendar revisión'"
                    >
                        {{transformStatus(action)}}
                    </a>
                </span>
            </a-table>
        </a-row>

        <a-modal
            v-model="scheduleReviewModal.show"
            onOk="toggleScheduleReviewModal"
            width="600px"
        >
            <template slot="title">
                <a-row>
                    <a-col :span="24" class="modal-icon-wrapper">
                        <a-icon type="calendar" class="modal-icon" />
                    </a-col>
                    <a-col :span="24" class="modal-header">
                        <h1>Agendar revisión</h1>
                        <small>(Nombre de la evaluacion) - (Nombre del colaborador)</small>
                    </a-col>
                </a-row>
            </template>

            <a-row class="modal-content">
                <a-col :span="24" class="modal-content-seccion-top">
                    <span>
                         Seleecione la fecha de la revisón:
                    </span>
                </a-col>
                <a-col :span="24" class="modal-content-seccion">
                    <a-date-picker style="width: 100%" />
                </a-col>
                <a-col :span="24" class="modal-content-seccion-bottom">
                    <span>
                        ¿Está seguro que desea agendar la revisión de la evaluación indicada?
                    </span>
                </a-col>
            </a-row>

            <template slot="footer">
                <a-button
                    key="back"
                    @click="toggleScheduleReviewModal"
                >
                    Cancelar
                </a-button>
                <a-button
                    class="modal-button-ok"
                    key="submit"
                    type="primary"
                    @click="toggleScheduleReviewModal"
                >
                    Agendar revisión
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
    },
    {
        title: 'Evaluación',
        dataIndex: 'evaluation',
        key: 'evaluation',
        scopedSlots: { customRender: 'evaluation' },
    },
    {
        title: 'Colaborador',
        dataIndex: 'collaborator',
        key: 'collaborator',
    },
    {
        title: 'Fecha fin',
        dataIndex: 'endDate',
        key: 'endDate',
    },
    {
        title: '',
        dataIndex: 'status',
        key: 'action',
        scopedSlots: { customRender: 'action' },
        align: 'right',
    },
];

export default {
    data() {
        return {
            collapsed: false,
            scheduleReviewModal: {
                show: false,
                enableButton: false,
            },
            data: [
                {
                    key: '1',
                    status: 'No iniciado',
                    evaluation: {
                        title: 'Período 2018-1',
                        subtitle: 'Evaluación de Desempeño',
                    },
                    collaborator: 'Leonardo Juárez',
                    endDate: '13/07/2018',
                },
                {
                    key: '2',
                    status: 'No iniciado',
                    evaluation: {
                        title: 'Período 2018-1',
                        subtitle: 'Evaluación de Desempeño',
                    },
                    collaborator: 'Silvia Sánchez',
                    endDate: '13/07/2018',
                },
                {
                    key: '3',
                    status: 'No iniciado',
                    evaluation: {
                        title: 'Período 2018-1',
                        subtitle: 'Evaluación de Desempeño',
                    },
                    collaborator: 'Laura Alcántara',
                    endDate: '13/07/2018',
                },
                {
                    key: '4',
                    status: 'Pendiente',
                    evaluation: {
                        title: 'Período 2018-1',
                        subtitle: 'Evaluación de Desempeño',
                    },
                    collaborator: 'Leonardo Juárez',
                    endDate: '13/07/2018',
                },
                {
                    key: '5',
                    status: 'Pendiente',
                    evaluation: {
                        title: 'Período 2018-1',
                        subtitle: 'Evaluación de Desempeño',
                    },
                    collaborator: 'Silvia Sánchez',
                    endDate: '13/07/2018',
                },
                {
                    key: '6',
                    status: 'Finalizada',
                    evaluation: {
                        title: 'Período 2018-1',
                        subtitle: 'Evaluación de Desempeño',
                    },
                    collaborator: 'Leonardo Juárez',
                    endDate: '13/07/2018',
                },
            ],
            columns,
        };
    },
    methods: {
        toggleScheduleReviewModal() {
            this.scheduleReviewModal.show = !this.scheduleReviewModal.show;
        },
        transformStatus(status) {
            if (status === 'Pendiente') {
                return 'Continuar';
            }
            if (status === 'Finalizada') {
                return 'Agendar revisión';
            }
            return 'Iniciar';
        },
        selectTagColor(status) {
            if (status === 'No iniciado') {
                return 'ant-tag-red';
            }
            if (status === 'Pendiente') {
                return 'ant-tag-yellow';
            }
            if (status === 'Finalizada') {
                return 'ant-tag-green';
            }
            return 'ant-tag-gray';
        },
    },
};
</script>

<style scoped>

</style>
