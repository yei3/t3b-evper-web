<template>
    <div class="collapse-content" style="background-color: white; margin: 30px 30px;">
        <h3 class="breadcrumb-header">Reportes de evaluaciones</h3>
        <a-divider />
        <a-row type="flex" justify="center" :gutter="8">
            <a-col :span="8">
                <a-range-picker @change="onRangePickerChange" />
            </a-col>
            <a-col>
                <a-button @click="filterReports" :loading="loading">
                    <a-icon type="search" />
                    <span>Filtrar reportes</span>
                </a-button>
            </a-col>
        </a-row>
        <a-row class="main-content" style="margin-top: 30px;">
            <a-col :span="24" style="padding-bottom: 30px;">
                <a-table :dataSource="data" :columns="columns" :pagination="false">
                    <span slot="status" slot-scope="status">
                        {{ getStatusType(status) }}
                    </span>
                    <span slot="evaluationType" slot-scope="evaluationType">
                        {{ getEvaluationType(evaluationType) }}
                    </span>
                    <div slot="actions" slot-scope="text, record">
                        <a-dropdown>
                            <a-menu slot="overlay">
                                <a-menu-item key="1" @click="endEvaluationReport(record.id)"
                                    ><a-icon type="close" />Finalizar</a-menu-item
                                >
                                <a-menu-item key="2" @click="reopenEvaluationReport(record.id)"
                                    ><a-icon type="retweet" />Reabrir</a-menu-item
                                >
                                <a-menu-item key="3" @click="removeEvaluationReport(record.id)"
                                    ><a-icon type="delete" />Eliminar</a-menu-item
                                >
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

import { evaluationsReportColumns, data } from "./constants";

export default {
    name: "evaluation-report",
    data() {
        return {
            data,
            filters: {
                initDate: "",
                endDate: "",
            },
            loading: false,
            searchText: "",
            searchInput: null,
            columns: evaluationsReportColumns,
        };
    },
    created() {
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
                    return "";
            }
        },
        filterReports() {
            this.getEvaluationWithFilter(this.initDate, this.endDate);
        },
        async getEvaluationsList() {
            try {
                /*
                 *const { data } = await client3B.evaluation.getEvaluationsStatus();
                 *this.data = data.result;
                 */
            } catch (error) {
                errorHandler(error.message);
            } finally {
                this.loading = false;
            }
        },
        async getEvaluationWithFilter(initDate, endDate) {
            try {
                this.loading = true;
                const { data: results } = await client3B.evaluation.getEvaluationsStatus(
                    initDate,
                    endDate,
                );

                this.data = results.result;
            } catch (error) {
                errorHandler(error.message);
            } finally {
                this.loading = false;
            }
        },
        onRangePickerChange(date, dateString) {
            const [initDate, endDate] = dateString;
            this.initDate = initDate;
            this.endDate = endDate;
        },
        removeEvaluationReport(reportId) {
            console.log(reportId);
        },
        reopenEvaluationReport(reportId) {},
        endEvaluationReport(reportId) {},
    },
};
</script>
