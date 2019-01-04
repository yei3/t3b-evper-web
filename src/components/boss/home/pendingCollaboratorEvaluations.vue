<template>
    <div class="collapse">
        <a-row class="collapse-title background--title">
            <a-col :span="23">
                Mis evaluaciones
            </a-col>
            <a-col :span="1" style="text-align: right;">
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
                        <!-- <router-link
                            class="table-link"
                            :to="{name: 'boss-assessments-apply' }"
                        > -->
                            {{evaluation.title}}
                        <!-- </router-link> -->
                    </p>
                    <p><small>{{evaluation.subtitle}}</small></p>
                </span>
                <span slot="autoEvaluation" slot-scope="autoEvaluation" class="text-center">
                    <a-checkbox
                        :checked="autoEvaluation"
                    />
                </span>
                <span slot="action" slot-scope="action, record">
                    <a-button 
                        size="small"
                        class="btn--start-evaluations"
                        @click="fillEvaluation(record.id, record.autoEvaluation)"
                        :disabled="disableButton(record.status)"
                    >
                        {{transformStatus(action, record.autoEvaluation)}}
                    </a-button>
                    <a-button
                        class="table-link-light" ghost
                        @click="toggleScheduleReviewModal"
                        v-show="transformStatus(action) === 'Agendar revisión'"
                    >
                        {{transformStatus(action, record.autoEvaluation)}}
                    </a-button>
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
        title: 'Auto Evaluación',
        dataIndex: 'autoEvaluation',
        key: 'autoEvaluation',
        scopedSlots: { customRender: 'autoEvaluation' },
        align: 'center',
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
            spin: false,
            collapsed: false,
            scheduleReviewModal: {
                show: false,
                enableButton: false,
            },
            data: [],
            columns,
        };
    },
    created() {
        this.getCollaboratorEvaluations();
    },
    methods: {
        async getCollaboratorEvaluations() {
            this.spin = true;
            let response = null;
            try {
                response = await client3B.dashboard.getSupervisor();
                const items = response.data.result.collaboratorsEvaluationSummary;
                this.data = [];
                for (let i = 0; i < items.length; i += 1) {
                    this.data.push({
                        id: items[i].id,
                        key: i+1,
                        status: this.selectStatusName(items[i].status),
                        evaluation: {
                            title: items[i].name,
                            subtitle: items[i].description
                        },
                        autoEvaluation: items[i].isAutoEvaluation,
                        collaborator: items[i].collaboratorName,
                        endDate: new Date(items[i].endDateTime).toLocaleDateString()
                    });
                }
                
            } catch (error) {
                console.log(error);
            }
            this.spin = false;
        },
        toggleScheduleReviewModal() {
            this.scheduleReviewModal.show = !this.scheduleReviewModal.show;
        },
        fillEvaluation(id, autoEvaluation) {
            if (autoEvaluation === true) {
                this.$router.push({ name: 'boss-assessment', params: { id } });
            }
            else {
                this.$router.push({ name: 'boss-assessments-apply', params: { id } });
            }
        },
        disableButton (status) {
            if (status !== 'No iniciado' && status !== 'En proceso') {
                return true;
            }
            return false;
        },
        transformStatus(status, autoEvaluation) {
            
            if (autoEvaluation === true) {
                return 'Ver'
            } else {
                if (status === 'En proceso') {
                    return 'Continuar';
                }
                return 'Iniciar';
            }            
        },
        selectTagColor(status) {
            switch (status) {
                case 'No iniciado':
                    return 'ant-tag-red';
                case 'En proceso':
                    return 'ant-tag-yellow';
                case 'Completado':
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
