<template>
    <div class="collapse">
        <a-row class="collapse-title">
            <a-col :span="12">
                Evaluaciones de Colaboradores Pendientes
            </a-col>
            <a-col :span="12" style="text-align: right;">
                <router-link
                    class="collapse-tittle-link"
                    :to="{ name: 'colaborator-assessments' }"
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
        <transition name="fade">
            <a-row class="collapse-content" v-show="!collapsed">
                <a-table :columns="columns" :dataSource="data" :pagination=false>
                    <span slot="status" slot-scope="status">
                        <a-tag :class="selectTagColor(status)">{{status}}</a-tag>
                    </span>
                    <span slot="evaluation" slot-scope="evaluation">
                        <p><a
                            class="table-link"
                            :to="{name: 'colaborator-assessments-apply' }"
                        >
                            {{evaluation.title}}
                        </a></p>
                        <p><small>{{evaluation.subtitle}}</small></p>
                    </span>
                    <span slot="action" slot-scope="action">
                        <router-link
                            class="table-link-light"
                            :to="{ name: 'colaborator-assessments-apply' }"
                        >
                            {{transformStatus(action)}}
                        </router-link>
                    </span>
                </a-table>
            </a-row>
        </transition>
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
        dataIndex: 'colaborator',
        key: 'colaborator',
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
            data: [
                {
                    key: '1',
                    status: 'No iniciado',
                    evaluation: {
                        title: 'Período 2018-1',
                        subtitle: 'Evaluación de Desempeño',
                    },
                    colaborator: 'Leonardo Juárez',
                    endDate: '13/07/2018',
                },
                {
                    key: '2',
                    status: 'No iniciado',
                    evaluation: {
                        title: 'Período 2018-1',
                        subtitle: 'Evaluación de Desempeño',
                    },
                    colaborator: 'Silvia Sánchez',
                    endDate: '13/07/2018',
                },
                {
                    key: '3',
                    status: 'No iniciado',
                    evaluation: {
                        title: 'Período 2018-1',
                        subtitle: 'Evaluación de Desempeño',
                    },
                    colaborator: 'Laura Alcántara',
                    endDate: '13/07/2018',
                },
                {
                    key: '4',
                    status: 'Pendiente',
                    evaluation: {
                        title: 'Período 2018-1',
                        subtitle: 'Evaluación de Desempeño',
                    },
                    colaborator: 'Leonardo Juárez',
                    endDate: '13/07/2018',
                },
                {
                    key: '5',
                    status: 'Pendiente',
                    evaluation: {
                        title: 'Período 2018-1',
                        subtitle: 'Evaluación de Desempeño',
                    },
                    colaborator: 'Silvia Sánchez',
                    endDate: '13/07/2018',
                },
                {
                    key: '6',
                    status: 'Finalizada',
                    evaluation: {
                        title: 'Período 2018-1',
                        subtitle: 'Evaluación de Desempeño',
                    },
                    colaborator: 'Leonardo Juárez',
                    endDate: '13/07/2018',
                },
            ],
            columns,
        };
    },
    methods: {
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
