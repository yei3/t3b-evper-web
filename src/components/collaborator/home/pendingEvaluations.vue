<template>
    <div class="collapse">

        <a-row v-show="spin">
            <div style="text-align: center; margin-top: 20px;">
                <a-spin tip="Cargando..." size="small" />
            </div>
        </a-row>
        <a-row class="collapse-content" v-show="!collapsed">
            <a-table :columns="columns" :dataSource="data" :pagination=false>
                <span slot="status" slot-scope="status">
                    <a-tag :class="selectTagColor(status)">{{status}}</a-tag>
                </span>
                <span slot="evaluation" slot-scope="evaluation">
                    <p>
                    <strong>
                    {{evaluation.title}}
                    </strong>
                    </p>
                    <p><small>{{evaluation.subtitle}}</small></p>
                </span>
                <span slot="action" slot-scope="action, record">
                    <a-button
                        size="small"
                        class="btn--start-evaluations"
                        @click="fillEvaluation(record.id)"
                        :disabled="disableButton(record.status)"
                    >
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
    },
    {
        title: 'Evaluaciones',
        dataIndex: 'evaluation',
        key: 'evaluation',
        scopedSlots: { customRender: 'evaluation' },
    },
    {
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
            spin: false,
            collapsed: false,
            data: [],
            columns,
        };
    },
    created() {
        this.getAutoEvaluations();
    },
    methods: {
        async getAutoEvaluations() {
            this.spin = true;
            let response = null;
            try {
                response = await client3B.dashboard.getEvaluationsHistory();
                const items = response.data.result.evaluationSummary;
                this.data = [];
                for (let index = 0; index < items.length; index += 1) {
                    this.data.push({
                        id: items[index].id,
                        key: index + 1,
                        status: this.selectStatusName(items[index].status),
                        evaluation: {
                            title: items[index].name,
                            subtitle: items[index].description,
                        },
                        endDate: new Date(items[index].endDateTime).toLocaleDateString(),
                    });
                }
                // console.log(this.data);
            } catch (error) {
                errorHandler(this, error);
            }
            this.spin = false;
        },
        fillEvaluation(id) {
            this.$router.push({ name: 'collaborator-assessment', params: { id } });
        },
        disableButton(status) {
            if (status === 'No iniciado' || status === 'En proceso') {
                return true;
            }
            return false;
        },
        transformStatus() {
            return 'Ver';
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
        selectStatusName(status) {
            switch (status) {
            case 0:
                return 'No iniciado';
            case 1:
                return 'En proceso';
            case 2:
                return 'Completado';
            case 3:
                return 'Validado';
            default:
                return 'No iniciado';
            }
        },
    },
};
</script>

<style scoped>
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
