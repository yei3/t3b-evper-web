<template>
    <a-collapse defaultActiveKey="1" :bordered="false" class="collapse-mod">
        <a-collapse-panel header="Autoevaluaciones pendientes" key="1" style="
            font-family: 'Open Sans';
            font-weight: 600;
            font-size: 14px;"
        >
            <a-table :columns="columns" :dataSource="data">
                <span slot="status" slot-scope="status">
                    <a-tag color="red">{{status}}</a-tag>
                </span>
                <span slot="evaluation" slot-scope="evaluation">
                    <p>{{evaluation.subtitle}}</p>
                    <p>{{evaluation.title}}</p>
                </span>
                <span slot="action" slot-scope="text, record">
                    <a href="javascript:;">Delete</a>
                    <a-divider type="vertical" />
                    <a href="javascript:;" class="ant-dropdown-link">
                        More actions <a-icon type="down" />
                    </a>
                </span>
            </a-table>
        </a-collapse-panel>
    </a-collapse>
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
    }, {
        title: '',
        key: 'tags',
        dataIndex: 'tags',
        scopedSlots: { customRender: 'tags' },
    },
    {
        title: 'Action',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
];

export default {
    data() {
        return {
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
            ],
            columns,
        };
    },
};
</script>

<style scoped>
.collapse-mod {
    font-family: 'Open Sans';
    font-weight: 600;
    font-size: 14px;
}

.collapse-mod >>> .ant-collapse-content {
    border-top: 0;
}

.collapse-mod >>> .ant-collapse-header {
    color: #676a6c;
}
</style>
