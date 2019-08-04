<template>
    <div class="collapse">
        <a-row class="collapse-title background--title">
            <a-col :span="23">
                Evaluaciones Periodo Actual
            </a-col>
            <a-col :span="1" style="text-align: right; color: #fff;">
                <a>
                    <a-icon class="dropdown-icon" type="down" @click="collapsed = !collapsed" v-show="collapsed" />
                </a>
                <a>
                    <a-icon class="dropdown-icon" type="up" @click="collapsed = !collapsed" v-show="!collapsed" />
                </a>
            </a-col>
        </a-row>
        <a-row v-show="spin">
            <div style="text-align: center; margin-top: 20px;">
                <a-spin tip="Cargando..." size="small" />
            </div>
        </a-row>
        <a-row class="collapse-content" v-show="!collapsed">
            <a-table :columns="columns" :dataSource="data" :pagination="false" :scroll="{ x: true }">
                <span slot="status" slot-scope="status">
                    <a-tag :class="selectTagColor(status)">{{ status }}</a-tag>
                </span>
                <span slot="evaluation" slot-scope="evaluation">
                    <p>
                        <!-- <router-link
                            class="table-link"
                            :to="{name: 'collaborator-assessments-apply', params: { id } }"
                        > -->
                        {{ evaluation.title }}
                        <!-- </router-link> -->
                    </p>
                    <p>
                        <small>{{ evaluation.subtitle }}</small>
                    </p>
                </span>
                <span slot="action" slot-scope="action, record">
                    <a-button
                        size="small"
                        class="btn--start-evaluations"
                        @click="fillEvaluation(record.id, record.status)"
                        :disabled="disableButton(record.status)"
                    >
                        {{ transformStatus(action) }}
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
        title: "Evaluaciones",
        dataIndex: "evaluation",
        key: "evaluation",
        scopedSlots: { customRender: "evaluation" },
    },
    {
        title: "Fecha fin",
        dataIndex: "endDate",
        key: "endDate",
    },
    {
        title: "",
        key: "action",
        dataIndex: "status",
        scopedSlots: { customRender: "action" },
        align: "right",
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
                response = await client3B.dashboard.getCollaborator();
                const items = response.data.result.evaluationSummary;
                this.data = [];
                items.forEach((evaluation, index) => {
                    this.data.push({
                        id: evaluation.id,
                        key: index + 1,
                        status: this.selectStatusName(evaluation.status),
                        evaluation: {
                            title: evaluation.name,
                            subtitle: evaluation.description,
                        },
                        endDate: new Date(evaluation.endDateTime + "Z").toLocaleDateString(),
                    });
                });
            } catch (error) {
                errorHandler(this, error);
            }
            this.spin = false;
        },
        fillEvaluation(id, status) {
            if (status === "Finalizado") {
                this.$router.push({ name: "collaborator-assessment", params: { id } });
            } else {
                this.$router.push({ name: "collaborator-assessments-apply", params: { id } });
            }
        },
        disableButton(status) {
            if (status === "Validado") {
                return true;
            }
            return false;
        },
        transformStatus(status) {
            if (status === "Finalizado") {
                return "Ver";
            }
            if (status === "En proceso") {
                return "Continuar";
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
                    return "ant-tag-blue";
                case "Cerrada":
                    return "ant-tag-gray";
                default:
                    return "ant-tag-gray";
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
                case 3:
                    return "Pte. revisión";
                case 4:
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
    width: 82px;
}
.btn--start-evaluations:hover {
    background: #00af8f;
    color: #fff;
}
</style>
