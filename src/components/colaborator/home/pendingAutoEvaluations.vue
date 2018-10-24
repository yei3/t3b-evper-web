<template>
    <div class="collapse">
        <a-row class="collapse-title">
            <a-col :span="12">
                Autoevaluaciones pendientes
            </a-col>
            <a-col :span="12" style="text-align: right;">
                <router-link class="collapse-tittle-link" to="/foo">Ver todas</router-link>
                <a>
                    <a-icon type="down" @click="collapsed = !collapsed" v-show="!collapsed"/>
                </a>
                <a>
                    <a-icon type="up" @click="collapsed = !collapsed" v-show="collapsed"/>
                </a>
            </a-col>
        </a-row>
        <transition name="fade">
            <a-row class="collapse-content" v-show="!collapsed">
                <a-table :columns="columns" :dataSource="data" :pagination=false>
                    <span slot="status" slot-scope="status">
                        <a-tag color="red">{{status}}</a-tag>
                    </span>
                    <span slot="evaluation" slot-scope="evaluation">
                        <p><a href="">
                            {{evaluation.title}}
                        </a></p>
                        <p><small>{{evaluation.subtitle}}</small></p>
                    </span>
                    <span slot="action" slot-scope="text, record">
                        <a href="javascript:;">Delete</a>
                        <a-divider type="vertical" />
                        <a href="javascript:;" class="ant-dropdown-link">
                            More actions <a-icon type="down" />
                        </a>
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

.collapse {
    background-color: #fff;
    border-top: solid 2px #ddd;
}

.collapse-title, .collapse-content {
    padding: 15px 15px 7px;
}

.collapse-title {
    font-family: 'Open Sans';
    font-weight: 600;
    font-size: 14px;
    color: #676a6c;
    margin-bottom: 10px;
    border-bottom: solid 1px #e7eaec;
    border-bottom-width: 1px;
    border-bottom-color: #e7eaec;
}

.collapse-tittle-link {
    font-family: "Open Sans";
    font-style: normal;
    color: #7e8082;
    font-size: 12px;
    text-decoration: underline;
    margin-right: 13px;
}

.ant-tag-red {
    color: #fff;
    background: #ed5565;
    border-color: #ffa39e;
    font-family: "Open Sans";
    font-weight: 600;
    text-shadow: none;
    font-size: 10px;
}
</style>
