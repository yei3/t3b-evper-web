<template>
    <div class="collapse">
        <a-row class="collapse-title background--title">
            <a-col :span="23" class="text-center">
                Cierre de evaluaciones
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
                        @click="toggleFinishEvaluationModal"
                    > -->
                        {{evaluation.title}}
                    <!-- </a> -->
                    </p>
                    <p><small>{{evaluation.subtitle}}</small></p>
                </span>
                <span slot="collaborator" slot-scope="collaborator">
                    {{collaborator}}
                </span>
                <span slot="reviewDate" slot-scope="reviewDate, record">
                    <a
                        class="table-link-light"
                        @click="toggleScheduleReviewModal(record)"
                    >
                        {{reviewDate}}
                    </a>
                </span>
                <span slot="action" slot-scope="text, record">
                    <a-popconfirm 
                        title="Al validar la evaluación, está aceptando que los próximos objetivos son los acordados de la revisión."
                        @confirm="validateEvaluation(record.id)"
                        okText="Sí, validar cierre"
                        cancelText="No, revisar objetivos"
                    >
                        <a-button
                            size="small"
                            class="btn--close-evaluations"
                            :disabled="disableButton(record.status)"
                        >Validar</a-button>
                    </a-popconfirm>
                </span>
            </a-table>
        </a-row>

        <a-modal
            v-model="finishEvaluationModal.show"
            onOk="toggleFinishEvaluationModal"
            width="600px"
        >
            <template slot="title">
                <a-row>
                    <a-col :span="24" class="modal-icon-wrapper">
                        <a-icon type="check-square" class="modal-icon" />
                    </a-col>
                    <a-col :span="24" class="modal-header">
                        <h1>Cerrar evaluación</h1>
                        <small>
                            {{finishEvaluationModal.evaluationName}} -
                            {{finishEvaluationModal.collaboratorName}}
                        </small>
                    </a-col>
                </a-row>
            </template>

            <a-row class="modal-content">
                <a-col :span="24" class="modal-content-seccion-top">
                    <span>
                        Agregue un comentario referente al desempeño,
                        la evaluación y a la retroalimentación recibida del Colaborador.
                    </span>
                </a-col>
                <a-col :span="24" class="modal-content-seccion">
                    <a-textarea placeholder="Comentarios..." :rows="6"/>
                </a-col>
                <a-col :span="24" class="modal-content-seccion">
                    <a-checkbox @change="
                        finishEvaluationModal.enableButton = !finishEvaluationModal.enableButton
                    ">
                        <strong style="font-size: 13px;">
                            He preparado esta evaluación de desempeño con detenimiento,
                            lo he explicado claramente y discutido en detalle con el colaborador.
                        </strong>
                    </a-checkbox>
                </a-col>
                <a-col class="modal-content-seccion-bottom">
                    <span>
                        ¿Está seguro que desea cerrar la evaluación indicada?
                    </span>
                </a-col>
            </a-row>

            <template slot="footer">
                <a-button
                    key="back"
                    @click="toggleFinishEvaluationModal"
                >
                    Cancelar
                </a-button>
                <a-button
                    key="submit"
                    type="primary"
                    class="modal-button-ok"
                    @click="toggleFinishEvaluationModal"
                    :disabled="!finishEvaluationModal.enableButton"
                >
                    Si, cerrar evaluación
                </a-button>
            </template>
        </a-modal>

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
                        <small>
                            {{scheduleReviewModal.evaluationName}} -
                            {{scheduleReviewModal.collaboratorName}}
                        </small>
                    </a-col>
                </a-row>
            </template>

            <a-row class="modal-content">
                <a-col :span="24" class="modal-content-seccion-top">
                    <span>
                         Seleecione la fecha y hora de la revisón:
                    </span>
                </a-col>
                <a-col :span="24" class="modal-content-seccion">
                    <a-date-picker
                        showTime
                        format="YYYY-MM-DD HH:mm"
                        placeholder="Selecciona el día y la hora de la revisión"
                        style="width: 100%"
                        @ok="onSelectDate"
                    />

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
                    :loading="loading"
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
        scopedSlots: { customRender: 'collaborator' },
    },
    {
        title: 'Fecha fin',
        dataIndex: 'endDate',
        key: 'endDate',
    },
    {
        title: 'Fecha de revisión',
        key: 'reviewDate',
        dataIndex: 'reviewDate',
        scopedSlots: { customRender: 'reviewDate' },
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
            spin: false,
            loading: false,
            collapsed: false,
            columns,
            data: [],
            dateString: '',
            scheduleReviewModal: {
                show: false,
                enableButton: false,
                evaluationId: 0,
                evaluationName: '',
                collaboratorName: '',
            },
            finishEvaluationModal: {
                show: false,
                enableButton: false,
                evaluationId: 0,
                evaluationName: '',
                collaboratorName: '',
            },
        };
    },
    created() {
        this.getCollaboratorEvaluations();
    },
    methods: {
        onSelectDate(value) {
            this.dateString = new Date(value._d); // eslint-disable-line
        },
        async validateEvaluation(evaluationId) {
            this.loading = true;
            await client3B.evaluation.revision.revise(
                    evaluationId,
            ).catch(error => errorHandler(this, error));
            this.loading = false;
            const obj = this.data.find(tmp => tmp.id === evaluationId);
                obj.status = this.selectStatusName(3);
            this.$message.success('La evaluación se ha validado correctamente');
        },
        async scheduleReview(evaluationId, date) {
            this.loading = true;
            await client3B.evaluation.revision.updateRevisionDate(
                {
                    evaluationId,
                    revisionTime: date.toISOString(),
                },
            ).catch(error => errorHandler(this, error));
            this.sendReviewNotification(evaluationId, date.toISOString());
            this.loading = false;
            this.$message.success('La fecha de revisión se ha guardado correctamente');
        },
        async reviewEvaluation(evaluationId) {
            this.loading = true;
            console.log(evaluationId);
            await client3B.evaluation.revision.revise(
                {
                    evaluationId,
                },
            ).catch(error => errorHandler(this, error));
            this.loading = false;
            this.$message.success('La evaluación se ha validado correctamente');
        },
        async getCollaboratorEvaluations() {
            this.spin = true;
            let response = null;
            try {
                response = await client3B.dashboard.getSupervisor();
                const items = response.data.result.collaboratorRevisionSummary;
                this.data = [];
                items.forEach((evaluation, index) => {
                    this.data.push({
                        key: index + 1,
                        id: evaluation.evaluationId,
                        // status: this.selectStatusName(evaluation.status),
                        status: this.selectStatusName(evaluation.status),
                        evaluation: {
                            title: evaluation.name,
                            subtitle: evaluation.description,
                        },
                        collaborator: evaluation.collaboratorFullName,
                        reviewDate: new Date(evaluation.revisionDateTime).toLocaleString(
                            [],
                            {
                                day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
                            },
                        ),
                        endDate: new Date(evaluation.endDateTime).toLocaleDateString(),
                    });
                });
            } catch (error) {
                errorHandler(this, error);
            } finally {
                this.spin = false;
            }
        },
        async toggleFinishEvaluationModal(input) {
            if (!this.finishEvaluationModal.show) {
                this.finishEvaluationModal.evaluationId = input.id;
                this.finishEvaluationModal.collaboratorName = input.collaborator;
                this.finishEvaluationModal.evaluationName = input.evaluation.title;
                this.finishEvaluationModal.show = !this.finishEvaluationModal.show;
            } else {
                await this.reviewEvaluation(this.finishEvaluationModal.evaluationId);
                this.finishEvaluationModal.show = !this.finishEvaluationModal.show;
                this.getCollaboratorEvaluations();
            }
        },
        async toggleScheduleReviewModal(input) {
            if (!this.scheduleReviewModal.show) {
                this.scheduleReviewModal.evaluationId = input.id;
                this.scheduleReviewModal.evaluationName = input.evaluation.title;
                this.scheduleReviewModal.collaboratorName = input.collaborator;
                this.scheduleReviewModal.show = !this.scheduleReviewModal.show;
            } else {
                await this.scheduleReview(this.scheduleReviewModal.evaluationId, this.dateString);
                this.scheduleReviewModal.show = !this.scheduleReviewModal.show;
            }
        },
        async sendReviewNotification(_evaluationId, _date) {
            await client3B.notifications.sendReviewNotification(
                {
                    evaluationId: _evaluationId,
                    date: _date,
                },
            ).catch(error => errorHandler(this, error));
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
                case 'Validada':
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
                    return 'Validada';
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
