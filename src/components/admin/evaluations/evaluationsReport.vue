<template>
    <div class="collapse-content" style="background-color: white; margin: 30px 30px;">
        <h3 class="breadcrumb-header">Reportes de evaluaciones</h3>
        <a-divider />
        <a-row type="flex" justify="center" :gutter="8">
            <a-col :span="8">
                <a-range-picker @change="onRangePickerChange" />
            </a-col>
            <a-col>
                <a-button @click="filterReports">
                    <a-icon type="search" />
                    <span>Filtrar reportes</span>
                </a-button>
            </a-col>
        </a-row>
        <a-row class="main-content" style="margin-top: 30px;">
            <a-col :span="24" style="padding-bottom: 30px;">
                <a-table
                    :dataSource="data"
                    :columns="columns"
                    :pagination="pagination"
                    :loading="loading"
                >
                    <span slot="status" slot-scope="status">
                        <a-tag :class="selectTagColor(status)">{{ getStatusType(status) }}</a-tag>
                    </span>
                    <div class="collaborator" slot="collaborator" slot-scope="text, record">
                        <p class="collaborator__main-info">
                            {{ record.employeeNumber }} - {{ record.employeeName }}
                            {{ record.employeeSurname }}
                        </p>
                        <div class="collaborator__secondary-info">
                            <span> {{ record.region }} </span> / <span> {{ record.area }} </span>
                        </div>
                    </div>
                    <div slot="evaluation" slot-scope="text, record">
                        <p class="evaluation__main-info">
                            {{ record.evaluationName }}
                        </p>
                        <div class="evaluation__secondary-info">
                            {{ getEvaluationType(record.isAutoevaluation) }} /
                            {{ generateHumanAnswer(record.includePastObjectives) }}
                        </div>
                    </div>
                    <div slot="actions" slot-scope="text, record">
                        <a-dropdown>
                            <a-menu slot="overlay">
                                <a-popconfirm
                                    title="Confirma la finalizaci'on de esta evaluaci'on?"
                                    @confirm="handleAsynchronousAction('finalize', record.id)"
                                    okText="Si"
                                    cancelText="No"
                                >
                                    <a-menu-item class="ant-dropdown-menu-item" key="1"
                                        ><a-icon type="close" />Finalizar</a-menu-item
                                    >
                                </a-popconfirm>
                                <a-popconfirm
                                    title="Confirma la reapertura de esta evaluaci'on"
                                    @confirm="handleAsynchronousAction('reopen', record.id)"
                                    okText="Si"
                                    cancelText="No"
                                >
                                    <a-menu-item class="ant-dropdown-menu-item" key="2"
                                        ><a-icon type="retweet" />Reabrir</a-menu-item
                                    >
                                </a-popconfirm>
                                <a-popconfirm
                                    title="Confirma la eliminaci'on de esta evaluaci'on"
                                    @confirm="handleAsynchronousAction('delete', record.id)"
                                    okText="Si"
                                    cancelText="No"
                                >
                                    <a-menu-item class="ant-dropdown-menu-item" key="3"
                                        ><a-icon type="delete" />Eliminar</a-menu-item
                                    >
                                </a-popconfirm>
                            </a-menu>
                            <a-button>
                                <a-icon type="setting" />
                            </a-button>
                        </a-dropdown>
                    </div>
                </a-table>
            </a-col>
        </a-row>
    </div>
</template>
<script>
import client3B from "@/api/client3B";
import errorHandler from "@/views/errorHandler";

import { evaluationsReportColumns } from "./constants";

export default {
    name: "evaluation-report",
    data() {
        return {
            data: [],
            filters: {
                initDate: "",
                endDate: "",
            },
            pagination: {
                total: 0,
                onChange: this.handlePaginationChange,
            },
            loading: false,
            columns: evaluationsReportColumns,
        };
    },
    mounted() {
        this.getEvaluationsList();
    },
    methods: {
        getEvaluationType(evaluation) {
            return evaluation ? "Autoevaluacion" : "Evaluacion de desempenho";
        },
        getStatusType(status) {
            switch (status) {
                case 1:
                    return "En proceso";
                case 2:
                    return "Finalizada";
                case 3:
                    return "Cerrada";
                case 4:
                    return "Pendiente revision";
                default:
                    return "No iniciada";
            }
        },
        selectTagColor(status) {
            switch (status) {
                case 1:
                    return "ant-tag-yellow";
                case 2:
                    return "ant-tag-green";
                case 3:
                    return "ant-tag-blue";
                case 4:
                    return "ant-tag-gray";
                default:
                    return "ant-tag-red";
            }
        },
        generateHumanAnswer(value) {
            return value ? "Si" : "No";
        },
        filterReports() {
            this.getEvaluationWithFilter(this.initDate, this.endDate);
        },
        async getEvaluationsList() {
            try {
                this.loading = true;
                const { data } = await client3B.evaluation.getEvaluationsStatus();
                const { result } = data;
                const { items, totalCount } = result;
                this.data = items;
                this.pagination.total = totalCount;
            } catch (error) {
                errorHandler(this, error);
            } finally {
                this.loading = false;
            }
        },
        async getEvaluationWithFilter(initDate, endDate) {
            try {
                this.loading = true;
                const { data } = await client3B.evaluation.getEvaluationsStatus(initDate, endDate);
                const { result } = data;
                const { items, totalCount } = result;
                this.data = items;
                this.pagination.total = totalCount;
            } catch (error) {
                errorHandler(this, error);
            } finally {
                this.loading = false;
            }
        },
        onRangePickerChange(date, dateString) {
            const [initDate, endDate] = dateString;
            this.initDate = initDate;
            this.endDate = endDate;
        },
        async handlePaginationChange(page, pageSize) {
            const skipCount = (page - 1) * pageSize;
            const pagination = { SkipCount: skipCount };
            try {
                const { data } = await client3B.evaluation.getEvaluationsStatus(
                    this.startDate,
                    this.endDate,
                    pagination,
                );
                const { result } = data;
                const { items } = result;
                this.data = items;
            } catch (error) {
                errorHandler(this, error);
            } finally {
                this.loading = false;
            }
        },
        async handleAsynchronousAction(actionType, reportId) {
            try {
                this.loading = true;
                await client3B.evaluation[actionType]({ id: reportId });
                this.getEvaluationsList();
            } catch (error) {
                errorHandler(this, error);
            } finally {
                this.loading = false;
            }
        },
        async reopenEvaluationReport(reportId) {
            try {
                this.loading = true;
                await client3B.evaluation.reopen(reportId);
                this.getEvaluationsList();
            } catch (error) {
                errorHandler(this, error);
            } finally {
                this.loading = false;
            }
        },
        async endEvaluationReport(reportId) {
            try {
                this.loading = true;
                await client3B.evaluation.finalize(reportId);
                this.getEvaluationsList();
            } catch (error) {
                errorHandler(this, error);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped>
.collaborator {
    display: flex;
    flex-direction: column;
}

.collaborator__secondary-info {
    font-size: 0.6rem;
}
.collaborator__secondary-info span {
    font-size: 0.6rem;
}

.evaluation {
    display: flex;
    flex-direction: column;
}

.evaluation__secondary-info {
    font-size: 0.6rem;
}
.evaluation__secondary-info span {
    font-size: 0.6rem;
}
</style>
