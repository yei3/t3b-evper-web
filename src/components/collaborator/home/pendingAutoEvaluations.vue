<template>
    <div class="collapse">
        <a-row class="collapse-title background--title">
            <a-col :span=18 class="text-padding">
                Mis evaluaciones
            </a-col>
            <a-col :span=5>
                <a-progress :percent="0" size="small" />
            </a-col>
            <a-col :span=1 style="text-align: right; color: #fff;">

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
                    <a-button size="small" class="btn--start-evaluations" @click="fillEvaluation()">
                        {{transformStatus(action)}}
                    </a-button>
                    <!-- <router-link
                        class="table-link-light"
                        :to="{ name: 'collaborator-assessments-apply' }"
                    >
                        {{transformStatus(action)}}
                    </router-link> -->
                </span>
            </a-table>
        </a-row>
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
        title: 'Evaluaciones',
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
            spin: false,
            evaluations: [],
            data: [],
            columns,
            
        };
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed        
        // this.getCurrentEvaluations();
    },
    methods: {
        async getCurrentEvaluations() {
            this.spin = true;
            let response = null;
            try {
                response = await client3B.dashboard.getCollaborator();
                console.log(response.data.result);
                const items = response.data.result.autoEvaluationSummary;
                this.data = [];
                for (let index = 0; index < items.length; index += 1) {
                    this.data.push({
                        key: items[index].id,
                        status: this.getStatus(items[index].status),
                        evaluation: {
                            title: items[index].name,
                            subtitle: items[index].description,
                        },
                        endDate: items[index].endDate,
                    });
                }
            } catch (error) {
                console.log(error);
            }
            this.spin = false;
        },
        fillEvaluation() {
            this.$router.push({ name: 'collaborator-assessments-apply' });
        },
        transformStatus(status) {
            if (status === 'En proceso' || status === 'Finalizado') {
                return 'Continuar';
            }
            return 'Iniciar';
        },
        selectTagColor(status) {
            switch (status) {
                case 'No iniciado':
                    return 'ant-tag-red';
                case 'En proceso':
                    return 'ant-tag-yellow';
                case 'Finalizado':
                    return 'ant-tag-green';
                case 'Validado':
                    return 'ant-tag-blue';
                default:
                    return 'ant-tag-gray';
            }
        },
    },
};
</script>

<style scoped>
    .text-padding {
        padding: 0 0 0 16em;
    }
    .btn--start-evaluations {
        border: none;
        background: #00d5af;
        color: #000;
        font-size: 11px;
        width: 82px;
    }
    .btn--start-evaluations:hover {
        background: #00af8f;
        color: #fff;
    }
</style>
