<template>
    <div class="collapse">
        <a-row class="collapse-title">
            <a-col :span="21" style="text-align: center;">
                Autoevaluaciones En procesos
            </a-col>
            <a-col :span="3" style="text-align: right;">
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
        <a-row class="collapse-content" v-show="!collapsed">
            <a-table :columns="columns" :dataSource="data" :pagination=false>
                <span slot="status" slot-scope="status">
                    <a-tag :class="selectTagColor(status)">{{status}}</a-tag>
                </span>
                <span slot="evaluation" slot-scope="evaluation">
                    <p>
                        <router-link
                            class="table-link"
                            :to="{ name: 'collaborator-assessment', params: { id: 123 }}"
                        >
                            {{evaluation.title}}
                        </router-link>
                    </p>
                    <p><small>{{evaluation.subtitle}}</small></p>
                </span>
                <span slot="action" slot-scope="text, record">
                    <router-link
                        class="table-link"
                        :to="{ name: 'collaborator-assessment', params: { id: 123 }}"
                    >
                        Ver
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
                    status: 'Cerrada',
                    evaluation: {
                        title: 'Período 2017-1',
                        subtitle: 'Evaluación de Desempeño',
                    },
                    endDate: '13/07/2017',
                },
                {
                    key: '2',
                    status: 'Cerrada',
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
        selectTagColor(status) {
            if (status === 'No iniciado') {
                return 'ant-tag-red';
            }
            if (status === 'En proceso') {
                return 'ant-tag-yellow';
            }
            if (status === 'Completado') {
                return 'ant-tag-green';
            }
            if (status === 'Cerrada') {
                return 'ant-tag-blue';
            }
            return 'ant-tag-gray';
        },
    },
};
</script>

<style scoped>

</style>
