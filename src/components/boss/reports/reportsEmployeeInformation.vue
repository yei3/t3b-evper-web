<template>
    <div>
        <a-row v-show="loading">
            <div style="text-align: center; margin-top: 20px;">
                <a-spin tip="Cargando información..." />
            </div>
        </a-row>
        <a-row class="custom-row" type="flex" justify="center" v-show="!loading">
            <a-col v-if="evaluationEmployeeData.showAll" class="custom-col" :xl="4">
                <p class="custom-col__text custom-col__text--title">Plantilla</p>
                <div class="circle">
                    <span class="text">{{ this.evaluationEmployeeData.data.totalEmployees }}</span>
                </div>
            </a-col>
            <a-col class="custom-col" :xl="4">
                <p class="custom-col__text custom-col__text--title">Evaluados</p>
                <p class="custom-col__text custom-col__text--percentage">
                    {{ this.evaluatedPercentage }}%
                </p>
                <div class="circle">
                    <span class="text">
                        {{ this.evaluationEmployeeData.data.evaluatedEmployees }}
                    </span>
                </div>
            </a-col>
        </a-row>
        <a-row v-if="!loading && evaluationEmployeeData.showAll" type="flex" justify="center">
            <a-col :xl="6">
                <p class="custom-col__text custom-col__text--average">
                    Promedio de antiguedad: {{ this.ageAverage }} años
                </p>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import moment from "moment";
import client3B from "@/api/client3B";
import errorHandler from "@/views/errorHandler";

const NONE = "NONE";

export default {
    props: {
        queryData: {
            type: [Object],
            required: true,
        },
    },
    data: () => ({
        loading: false,
        evaluationEmployeeData: {
            data: {
                seniorityAverage: 0,
                totalEmployees: 0,
                evaluatedEmployees: 0,
            },
            showAll: null,
        },
        evaluatedAverage: 0,
    }),
    created() {
        this.getEmployeeData();
    },
    methods: {
        async getEmployeeData() {
            // Employees Data - Capabilities Left-Report
            this.loading = true;
            this.evaluationEmployeeData.showAll = this.isInCurrentPeriod(
                this.queryData.start,
                this.queryData.end,
            );

            const response = await this.getEvaluationEmployeeData(this.queryData)
                .catch((error) => errorHandler(this, error));
            this.evaluationEmployeeData.data = response.data.result;
            this.loading = false;
            this.$emit("ready", true);
        },
        getEvaluationEmployeeData(data) {
            const startTime = data.start;
            const endTime = data.end;
            startTime.set({
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0,
            });
            endTime.set({
                hour: 23,
                minute: 59,
                second: 59,
                millisecond: 999,
            });
            const dataReport = {
                RegionId: data.region,
                StarTime: startTime.toISOString(),
                EndDateTime: endTime.toISOString(),
            };
            if (data.area !== NONE) dataReport.AreaId = data.area;
            if (data.job !== NONE) dataReport.JobDescription = data.job;
            if (data.person !== NONE) dataReport.UserId = data.person;

            return client3B.report.GetEvaluationEmployeeData(dataReport);
        },
        isInCurrentPeriod(dateStart, dateEnd) {
            const currentDate = moment();
            const firstPeriodStart = moment().startOf("year");
            const firstPeriodStartClone = firstPeriodStart.clone();
            const firstPeriodEnd = firstPeriodStartClone.add(5, "months");

            const firstPeriodEndClone = firstPeriodEnd.clone();
            const secondPeriodStart = firstPeriodEndClone.endOf("month").add(1, "day");
            const secondPeriodEnd = moment().endOf("year");

            if (currentDate.year() !== dateStart.year()) {
                return false;
            }

            if (
                dateStart.isBetween(firstPeriodStart, firstPeriodEnd, "month", "[]") &&
                dateEnd.isBetween(firstPeriodStart, firstPeriodEnd, "month", "[]")
            ) {
                if (currentDate.month() >= 0 && currentDate.month() <= 5) {
                    return true;
                }
            } else if (
                dateStart.isBetween(secondPeriodStart, secondPeriodEnd, "month", "[]") &&
                dateEnd.isBetween(secondPeriodStart, secondPeriodEnd, "month", "[]")
            ) {
                if (currentDate.month() >= 6 && currentDate.month() <= 11) {
                    return true;
                }
            }

            return false;
        },
    },
    computed: {
        evaluatedPercentage() {
            const { totalEmployees, evaluatedEmployees } = this.evaluationEmployeeData.data;
            if (totalEmployees === 0) {
                return 0;
            }
            const evaluatedPercent = (evaluatedEmployees / totalEmployees) * 100;
            return evaluatedPercent.toFixed(2);
        },
        ageAverage() {
            return this.evaluationEmployeeData.data.seniorityAverage.toFixed(1);
        },
    },
    watch: {
        queryData: {
            handler() {
                this.getEmployeeData();
            },
            deep: true,
        },
    },
};
</script>

<style scoped>
.circle {
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: flex-end;
    background-color: #1890ff;
    border-color: #000;
    border-radius: 50%;
}

.circle .text {
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
}

.custom-col {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.custom-row {
    margin-bottom: 1rem;
}

.custom-col__text {
    flex-basis: 100%;
    text-align: center;
}

.custom-col__text--title {
    font-weight: bold;
    color: #000;
}

.custom-col__text--average {
    color: red;
    font-weight: bold;
}

.custom-col__text--percentage {
    margin: 0.4rem 0;
    font-weight: bold;
}
</style>
