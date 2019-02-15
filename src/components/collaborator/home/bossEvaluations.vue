<template>
    <div class="collapse" v-show="data.length > 0 ">
        <a-row class="collapse-title background--title">
            <a-col :span="23" style="text-align: center;">
                Cierre de mi evaluación
            </a-col>
            <a-col :span="1" style="text-align: right;">
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
        <a-row v-show="spin">
            <div style="text-align: center; margin-top: 20px;">
                <a-spin tip="Cargando..." size="small" />
            </div>
        </a-row>
        <a-row class="collapse-content" v-show="!collapsed">
            <a-table :columns="columns" :dataSource="data" :pagination=false
                :scroll="{ x: true }"
            >
                <span slot="status" slot-scope="status">
                    <a-tag :class="selectTagColor(status)">{{status}}</a-tag>
                </span>
                <span slot="evaluation" slot-scope="evaluation">
                    <p>
                    <!-- <a
                        class="table-link"
                        @click="toggleCBEModal()"
                    > -->
                        {{evaluation.title}}
                    <!-- </a> -->
                    </p>
                    <p><small>{{evaluation.subtitle}}</small></p>
                </span>
                <span slot="action" slot-scope="text, record">
                    <a-button
                        size="small"
                        class="btn--close-evaluations"
                        @click="toggleCBEModal(record)"
                        :disabled="disableButton(record.status)"
                    >
                        Cerrar
                    </a-button>
                </span>
            </a-table>
        </a-row>

        <a-modal
            v-model="CBEModal.show"
            onOk="toggleCBEModal"
            width="600px"
        >
            <template slot="title">
                <a-row>
                    <a-col :span="24" class="modal-icon-wrapper">
                        <a-icon type="check-square" class="modal-icon" />
                    </a-col>
                    <a-col :span="24" class="modal-header">
                        <h1>Cerrar Evaluación</h1>
                        <small>{{CBEModal.evaluationName}}</small>
                    </a-col>
                </a-row>
            </template>

            <a-row class="modal-content">
                <a-col :span="24" class="modal-content-seccion-top">
                    <span>
                        Agregue un comentario referente al desempeño, la evaluación y a la retroalimentación recibida por mi Evaluador.
                    </span>
                </a-col>
                <a-col :span="24" class="modal-content-seccion">
                    <a-textarea placeholder="Comentarios..." :rows="6" v-model="CBEModal.evaluationCloseMsg"/>
                </a-col>
                <a-col class="modal-content-seccion">
                    <a-checkbox
                        :checked="CBEModal.enableButton"
                        @change="CBEModal.enableButton = !CBEModal.enableButton"    
                    >
                        <strong style="font-size: 13px;">
                            He preparado los objetivos para el próximo periodo.
                        </strong>
                    </a-checkbox>
                </a-col>
                <a-col class="modal-content-seccion-bottom">
                    <p>¿Está seguro que desea cerrar la evaluación indicada?</p>
                </a-col>
            </a-row>

            <template slot="footer">
                <!-- <a-button
                    key="back"
                    @click="toggleCBEModal"
                >
                    Cancelar
                </a-button> -->
                <a-button
                    class="modal-button-ok"
                    key="submit"
                    type="primary"
                    @click="toggleCBEModal"
                    :disabled="!CBEModal.enableButton"
                >
                    Si, cerrar evaluación
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
        title: 'Fecha de revisión',
        key: 'reviewDate',
        dataIndex: 'reviewDate',
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
            spin: false,
            collapsed: false,
            CBEModal: {
                show: false,
                enableButton: false,
                evaluationId: 0,
                evaluationName: '',
                evaluationCloseMsg: '',
            },
            data: [],
            columns,
        };
    },
    created() {
        this.getRevisionSummary();
    },
    methods: {
        async addClosingMessage(evaluationId, message) {
            await client3B.evaluation.closeComment(
                {
                    comment: message,
                    id: evaluationId
                }
            ).catch(error => errorHandler(this, error));
            this.$message.success('El mensaje se ha guardado correctamente');
        },
        async getRevisionSummary() {
            this.spin = true;
            let response = null;
            try {
                response = await client3B.dashboard.getCollaborator();
                const items = response.data.result.revisionSummary;
                this.data = [];
                items.forEach((evaluation, index) => {
                    this.data.push({
                        key: index + 1,
                        id: evaluation.evaluationId,
                        status: this.selectStatusName(evaluation.status),
                        evaluation: {
                            title: evaluation.name,
                            subtitle: evaluation.description,
                        },
                        endDate: new Date(evaluation.endDateTime).toLocaleDateString(),
                        reviewDate: new Date(evaluation.revisionDateTime).toLocaleString(
                            [],
                            {
                                day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
                            },
                        ),
                    });
                });
            } catch (error) {
                errorHandler(this, error);
            } finally {
                this.spin = false;
            }
        },
        async sendBossCloseEvaluationNotification() {
            await client3B.notifications.sendBossCloseEvaluationNotification(
                {},
            ).catch(error => errorHandler(this, error));
        },
        async toggleCBEModal(input) {
            if (!this.CBEModal.show) {
                this.CBEModal.enableButton = false;
                this.CBEModal.evaluationId = input.id;
                this.CBEModal.evaluationName = input.evaluation.title;
                this.CBEModal.show = !this.CBEModal.show;
            } else {
                await this.addClosingMessage(this.CBEModal.evaluationId, this.CBEModal.evaluationCloseMsg);
                this.sendBossCloseEvaluationNotification();
                this.CBEModal.show = !this.CBEModal.show;
                // this.data.splice( this.data.indexOf(this.CBEModal.evaluationId), 1);
                // console.log(this.data);    
            }
        },
        disableButton(status) {
            if (status === 'No iniciado' || status === 'En proceso') {
                return true;
            }
            return false;
        },
        selectTagColor(status) {
            switch (status) {
            case 'No iniciado':
                return 'ant-tag-red';
            case 'En proceso':
                return 'ant-tag-yellow';
            case 'Finalizado':
                return 'ant-tag-green';
            case 'Pte. revisión':
                return 'ant-tag-gray';
            case 'Validado':
                return 'ant-tag-blue';
            default:
                return 'ant-tag-white';
            }
        },
        selectStatusName(status) {
            switch (status) {
            case 0:
                return 'No iniciado';
            case 1:
                return 'En proceso';
            case 2:
                return 'Finalizado';
            case 4:
                return 'Pte. revisión';
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
    .btn--close-evaluations {
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
