<template>
    <div class="collapse-content" style="background-color: white; margin: 30px 30px;">
        <h3 class="breadcrumb-header">Reportes de resultados de evaluaciones</h3>
        <a-divider />
        <a-row type="flex" justify="center" :gutter="8">
            <a-col :span="8">
                <a-range-picker
                    :showTime="true"
                    :placeholder="pickerPlaceholders"
                    :format="RANGE_PICKER_FORMAT"
                    @change="onRangePickerChange"
                    @ok="handleOnOK"
                />
            </a-col>
            <a-col>
                <a-button
                    class="ml-2"
                    :loading="false"
                    @click="generateFile"
                    :disabled="isButtonDisabled"
                >
                    <a-icon type="file" />
                    <span>Generar Excel con resultados</span>
                </a-button>
            </a-col>
            <a-button
                class="ml-2"
                type="primary"
                icon="download"
                v-show="generatedURL !== ''"
                :href="generatedURL"
                >Descargar Excel</a-button
            >
        </a-row>
        <a-row class="main-content" style="margin-top: 30px;">
            <a-col :span="24" style="padding-bottom: 30px;">
                <a-table
                    :dataSource="data"
                    :columns="columns"
                    :pagination="pagination"
                    :loading="loading"
                    :rowKey="generateRowKey"
                >
                    <div class="collaborator" slot="collaborator" slot-scope="text, record">
                        <p class="collaborator__main-info">
                            {{ record.employeeNumber }}
                        </p>
                    </div>
                    <div class="period" slot="period" slot-scope="text, record">
                        <p class="collaborator__main-info">
                            {{ record.period }}
                        </p>
                    </div>
                    <div
                        class="successObjectives"
                        slot="objectivesPercent"
                        slot-scope="text, record"
                    >
                        <p class="collaborator__main-info">
                            {{ record.successObjectivesPercent }}
                        </p>
                    </div>
                    <div class="period" slot="exceededRequirement" slot-scope="text, record">
                        <p class="collaborator__main-info">
                            {{ record.exceededRequirementPercent }}
                        </p>
                    </div>
                    <div class="period" slot="completedRequirement" slot-scope="text, record">
                        <p class="collaborator__main-info">
                            {{ record.completedRequirementPercent }}
                        </p>
                    </div>
                    <div class="period" slot="unsatisfactoryRequirement" slot-scope="text, record">
                        <p class="collaborator__main-info">
                            {{ record.unsatisfactoryRequirementPercent }}
                        </p>
                    </div>
                    <div class="period" slot="objectivesCount" slot-scope="text, record">
                        <p class="collaborator__main-info">
                            {{ record.currentObjectivesCount }}
                        </p>
                    </div>
                    <div class="period" slot="globalCount" slot-scope="text, record">
                        <p class="collaborator__main-info">
                            {{ record.globalEvaluationsCount }}
                        </p>
                    </div>
                </a-table>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import moment from "moment";
import client3B from "@/api/client3B";
import errorHandler from "@/views/errorHandler";
import successHandler from "@/views/successHandler";
import { mapMutations, mapGetters } from "vuex";
import evaluationResultColumns from "./constants/resultColumns";

export default {
    mounted() {
        this.getEvaluationsReportList();
    },
    data() {
        return {
            pagination: {
                total: 0,
                onChange: this.handlePaginationChange,
            },
            filters: {
                initDate: "",
                endDate: "",
            },
            generatedURL: "",
            pickerPlaceholders: ["Fecha inicial", "Fecha final"],
            RANGE_PICKER_FORMAT: "YYYY-DD-MM, HH:mm:ss",
            columns: evaluationResultColumns,
            data: [],
        };
    },
    methods: {
        async handlePaginationChange(page, pageSize) {
            this.requestStart();
            const skipCount = (page - 1) * pageSize;
            const pagination = { SkipCount: skipCount };
            let serverResponse;
            try {
                if (this.filters.startDate !== "") {
                    serverResponse = await client3B.evaluation.getEvaluationsResult(
                        this.filters.initDate,
                        this.filters.endDate,
                        pagination,
                    );
                } else {
                    serverResponse = await client3B.evaluation.getEvaluationsResult(pagination);
                }
                const { data } = serverResponse;
                const { result } = data;
                const { items } = result;
                this.data = items;
            } catch (error) {
                this.requestError(error.message);
                errorHandler(this, error);
            } finally {
                this.requestEnd();
            }
        },
        async getEvaluationsReportList() {
            try {
                this.requestStart();
                const initDate = moment(new Date()).toISOString();
                const endDate = moment(initDate)
                    .add(1, "day")
                    .toISOString();
                const { data } = await client3B.evaluation.getEvaluationsResult(initDate, endDate);
                const { result } = data;
                const { items, totalCount } = result;
                this.data = items;
                this.pagination.total = totalCount;
            } catch (error) {
                this.requestError(error.message);
                errorHandler(this, error);
            } finally {
                this.requestEnd();
            }
        },
        generateRowKey(record) {
            return record.id;
        },
        onRangePickerChange(date, dateString) {
            const [initDate, endDate] = date;
            const [formattedInitDate, formattedEndDate] = dateString;
            if (formattedInitDate === "" && formattedEndDate === "") {
                this.filters.initDate = formattedInitDate;
                this.filters.endDate = formattedInitDate;
                this.generatedURL = "";
                this.getEvaluationsList();
            } else {
                this.filters.initDate = new Date(initDate).toISOString();
                this.filters.endDate = new Date(endDate).toISOString();
            }
        },
        async getEvaluationWithFilter() {
            try {
                this.requestStart();
                const { data } = await client3B.evaluation.getEvaluationsResult(
                    this.filters.initDate,
                    this.filters.endDate,
                );
                const { result } = data;
                const { items, totalCount } = result;
                this.data = items;
                this.pagination.total = totalCount;
            } catch (error) {
                this.requestError(error.message);
                errorHandler(this, error);
            } finally {
                this.requestEnd();
            }
        },
        handleOnOK() {
            this.getEvaluationWithFilter();
        },
        async generateFile() {
            try {
                this.isGeneratingFile = true;
                const { data } = await client3B.evaluation.generateEvaluationsResultFile({
                    StartDateTime: this.filters.initDate,
                    EndDateTime: this.filters.endDate,
                });
                const { result } = data;
                const { fileName, fileType, fileToken } = result;
                this.generatedURL = `${process.env.VUE_APP_API_URL}/api/File/DownloadTempFile?fileName=${fileName}&fileType=${fileType}&fileToken=${fileToken}`;
                successHandler(this, "Archivo generado correctamente");
            } catch (error) {
                errorHandler(this, error);
            } finally {
                this.isGeneratingFile = false;
            }
        },
        isButtonDisabled() {
            return this.filters.initDate !== "" && this.filters.endDate !== "";
        },
        ...mapMutations(["requestStart", "requestEnd", "requestError"]),
    },
    computed: {
        ...mapGetters(["loading", "errors"]),
    },
};
</script>

<styles scoped>
</styles>
