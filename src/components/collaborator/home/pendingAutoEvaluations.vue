<template>
    <div class="collapse">
        <a-row class="collapse-title background--title">
            <a-col :span="21">
                Autoevaluaciones pendientes
            </a-col>
            <a-col :span="3" style="text-align: right; color: #fff;">
                <router-link
                    class="collapse-tittle-link"
                    :to="{ name: 'collaborator-assessments' }"
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
                            :to="{name: 'collaborator-assessments-apply' }"
                        >
                            {{evaluation.title}}
                        </router-link>
                    </p>
                    <p><small>{{evaluation.subtitle}}</small></p>
                </span>
                <span slot="action" slot-scope="action">
                    <router-link
                        class="table-link-light"
                        :to="{ name: 'collaborator-assessments-apply' }"
                    >
                        {{transformStatus(action)}}
                    </router-link>
                </span>
            </a-table>
        </a-row>
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
        title: 'Evaluación',
        dataIndex: 'evaluation',
        key: 'evaluation',
        scopedSlots: { customRender: 'evaluation' },
    }, {
        title: 'Fecha fin',
        dataIndex: 'endDate',
        key: 'endDate',
    },
    {
        title: '',
        key: 'action',
        dataIndex: 'status',
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
                        title: 'Período 2017-1',
                        subtitle: 'Evaluación de Desempeño',
                    },
                    endDate: '13/07/2017',
                },
                {
                    key: '2',
                    status: 'Pendiente',
                    evaluation: {
                        title: 'Período 2017-1',
                        subtitle: 'Evaluación de Desempeño',
                    },
                    endDate: '13/07/2017',
                },
                {
                    key: '3',
                    status: 'Finalizado',
                    evaluation: {
                        title: 'Período 2017-1',
                        subtitle: 'Evaluación de Desempeño',
                    },
                    endDate: '13/07/2017',
                },
            ],
            columns,
        };
    },
    methods: {
        transformStatus(status) {
            if (status === 'Pendiente' || status === 'Finalizado') {
                return 'Continuar';
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
            if (status === 'Finalizado') {
                return 'ant-tag-green';
            }
            return 'ant-tag-gray';
        },
    },
};
</script>

<style scoped>
    .background--title {
        color: #fff;
        background: #e00000;
        text-align: center;
    }    
</style>
