<template>
    <div class="collapse">
        <a-row class="collapse-title-old2">
            <a-col :span="23">
                Evaluaciones Anteriores
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
            <a-table
                :columns="columns"
                :dataSource="data"
                :pagination="false"
                :scroll="{ x: true }"
            >
                <span slot="status" slot-scope="status">
                    <a-tag :class="selectTagColor(status)">{{ status }}</a-tag>
                </span>
                <span slot="evaluation" slot-scope="evaluation">
                    <p>
                        <!-- <router-link
                            class="table-link"
                            :to="{name: 'boss-assessments-apply' }"
                        > -->
                        {{ evaluation.title }}
                        <!-- </router-link> -->
                    </p>
                    <p>
                        <small>{{ evaluation.subtitle }}</small>
                    </p>
                </span>
                <span slot="autoEvaluation" slot-scope="autoEvaluation" class="text-center">
                    <a-icon type="check" v-if="autoEvaluation" />
                    <a-icon type="minus" v-if="!autoEvaluation" />
                </span>
                <span slot="action" slot-scope="action, record">
                    <a-button
                        size="small"
                        class="btn--start-evaluations"
                        @click="printEvaluation(record)"
                        v-show="!disableButton(record.status, record.autoEvaluation)"
                    >
                        Imprimir
                    </a-button>
                    <a-button
                        size="small"
                        class="btn--start-evaluations"
                        @click="toggleScheduleReviewModal(record)"
                        v-show="disableButton(record.status, record.autoEvaluation)"
                    >
                        {{ transformStatus(action, record.autoEvaluation) }}
                    </a-button>
                </span>
            </a-table>
        </a-row>

        <a-modal v-model="scheduleReviewModal.show" onOk="toggleScheduleReviewModal" width="600px">
            <template slot="title">
                <a-row>
                    <a-col :span="24" class="modal-icon-wrapper">
                        <a-icon type="calendar" class="modal-icon" />
                    </a-col>
                    <a-col :span="24" class="modal-header">
                        <h1>Agendar revisión</h1>
                        <small>
                            {{ scheduleReviewModal.evaluationName }} -
                            {{ scheduleReviewModal.collaboratorName }}
                        </small>
                    </a-col>
                </a-row>
            </template>

            <a-row class="modal-content">
                <a-col :span="24" class="modal-content-seccion-top">
                    <span>
                        Seleccione la fecha y hora de la revisón:
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
                <a-button key="back" @click="toggleScheduleReviewModal">
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
import client3B from "@/api/client3B";
import errorHandler from "@/views/errorHandler";

const columns = [
    {
        title: "Estatus",
        dataIndex: "status",
        key: "status",
        scopedSlots: { customRender: "status" },
    },
    {
        title: "Evaluación",
        dataIndex: "evaluation",
        key: "evaluation",
        scopedSlots: { customRender: "evaluation" },
    },
    {
        title: "Colaborador",
        dataIndex: "collaborator",
        key: "collaborator",
    },
    {
        title: "Auto Evaluación",
        dataIndex: "autoEvaluation",
        key: "autoEvaluation",
        scopedSlots: { customRender: "autoEvaluation" },
        align: "center",
    },
    {
        title: "Fecha fin",
        dataIndex: "endDate",
        key: "endDate",
    },
    {
        title: "",
        dataIndex: "status",
        key: "action",
        scopedSlots: { customRender: "action" },
        align: "right",
    },
];

export default {
    data() {
        return {
            spin: false,
            collapsed: false,
            dateString: "",
            scheduleReviewModal: {
                show: false,
                enableButton: false,
                evaluationId: 0,
                evaluationName: "",
                collaboratorName: "",
            },
            data: [],
            columns,
        };
    },
    created() {
        this.getCollaboratorEvaluations();
    },
    methods: {
        onSelectDate(value) {
            this.dateString = value._d; // eslint-disable-line
        },
        async scheduleReview(evaluationId) {
            this.loading = true;
            // schedule revision date
            await client3B.evaluation.revision
                .updateRevisionDate({
                    evaluationId,
                    revisionTime: this.dateString.toISOString(),
                })
                .catch((error) => errorHandler(this, error));
            // send notification
            this.sendReviewNotification(
                evaluationId,
                this.dateString.toLocaleDateString([], {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            );
            // change status on real-time XD
            const obj = this.data.find((tmp) => tmp.id === evaluationId);
            obj.status = this.selectStatusName(4);
            this.loading = false;
            this.$message.success(`La evaluación está en proceso de revisión  ${evaluationId}`);
        },
        async sendReviewNotification(evaluationId, dateReview) {
            await client3B.notifications
                .sendReviewNotification({
                    evaluationId,
                    dateReview,
                })
                .catch((error) => errorHandler(this, error));
        },
        async getCollaboratorEvaluations() {
            this.spin = true;
            let response = null;
            try {
                response = await client3B.dashboard.getSupervisorHistory();
                const items = response.data.result.collaboratorsEvaluationSummary;
                this.data = [];
                for (let i = 0; i < items.length; i += 1) {
                    this.data.push({
                        id: items[i].id,
                        key: i + 1,
                        status: this.selectStatusName(items[i].status),
                        evaluation: {
                            title: items[i].name,
                            subtitle: items[i].description,
                        },
                        autoEvaluation: items[i].isAutoEvaluation,
                        collaborator: items[i].collaboratorName,
                        endDate: new Date(`${items[i].endDateTime}Z`).toLocaleDateString(),
                    });
                }
            } catch (error) {
                errorHandler(this, error);
            }
            this.spin = false;
        },
        async toggleScheduleReviewModal(input) {
            if (!this.scheduleReviewModal.show) {
                this.scheduleReviewModal.evaluationId = input.id;
                this.scheduleReviewModal.evaluationName = input.evaluation.title;
                this.scheduleReviewModal.collaboratorName = input.collaborator;
                this.scheduleReviewModal.show = !this.scheduleReviewModal.show;
            } else {
                await this.scheduleReview(this.scheduleReviewModal.evaluationId);
                this.scheduleReviewModal.show = !this.scheduleReviewModal.show;
            }
        },
        fillEvaluation(input) {
            const { id } = input;
            if (
                input.autoEvaluation === true ||
                input.status === "Pte. revisión" ||
                input.status === "Cerrada"
            ) {
                this.$router.push({ name: "boss-assessment", params: { id } });
            } else {
                this.$router.push({ name: "boss-assessments-apply", params: { id } });
            }
        },
        printEvaluation(input) {
            const { id } = input;
            this.$router.push({ name: "print-assessment", params: { id } });
        },
        disableButton(status, isAutoEvaluation) {
            return status === "Finalizado" && !isAutoEvaluation;
        },
        transformStatus(status, autoEvaluation) {
            if (status === "En proceso") {
                return "Continuar";
            }
            if (status === "Finalizado" && !autoEvaluation) {
                return "Agendar Revisión";
            }
            if (autoEvaluation === true || status === "Pte. revisión" || status === "Cerrada") {
                return "Ver";
            }
            return "Iniciar";
        },
        selectTagColor(status) {
            switch (status) {
            case "No iniciado":
                return "ant-tag-red";
            case "En proceso":
                return "ant-tag-yellow";
            case "Finalizado":
                return "ant-tag-green";
            case "Pte. revisión":
                return "ant-tag-gray";
            case "Cerrada":
                return "ant-tag-blue";
            default:
                return "ant-tag-white";
            }
        },
        selectStatusName(status) {
            switch (status) {
            case 0:
                return "No iniciado";
            case 1:
                return "En proceso";
            case 2:
                return "Finalizado";
            case 4:
                return "Pte. revisión";
            case 3:
                return "Cerrada";
            default:
                return "No iniciado";
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
    width: 102px;
}
.btn--start-evaluations:hover {
    background: #00af8f;
    color: #fff;
}
</style>
