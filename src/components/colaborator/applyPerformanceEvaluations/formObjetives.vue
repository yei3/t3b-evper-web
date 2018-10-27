<template>
    <a-col class="form-autoevaluation">
        <a-row class="form-tittle">
            <a-col :span="24">
                <h1>Objetivos del periodo evaluado</h1>
            </a-col>
            <a-col :span="24" class="">
                <a-table :columns="columns" :dataSource="data" :pagination=false>
                    <span slot="status" slot-scope="status">
                        <a-tag color="red">{{status}}</a-tag>
                    </span>
                    <span slot="objective" slot-scope="objective">
                        <p><a href="">
                            {{objective.title}}
                        </a></p>
                        <p><small>{{objective.subtitle}}</small></p>
                    </span>
                    <span slot="action" slot-scope="text, record">
                        <a-dropdown>
                            <a-menu slot="overlay">
                                <a-menu-item key="1">Registrar avances</a-menu-item>
                                <a-menu-item key="2">Ver avances</a-menu-item>
                                <a-menu-divider />
                                <a-menu-item key="3">Completar objectivo</a-menu-item>
                            </a-menu>
                            <a-button style="margin-left: 8px">
                                ...
                            </a-button>
                        </a-dropdown>
                    </span>
                </a-table>
            </a-col>
        </a-row>
    </a-col>
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
            data: [
                {
                    key: '1',
                    status: 'No iniciado',
                    objective: {
                        title: 'Período 2017-1',
                        subtitle: 'Evaluación de Desempeño',
                    },
                    endDate: '13/07/2017',
                },
                {
                    key: '2',
                    status: 'No iniciado',
                    objective: {
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

</style>
