<template>
    <div>
        <a-row v-show="loading">
            <div style="text-align: center; margin-top: 20px;">
                <a-spin tip="Cargando información..." />
            </div>
        </a-row>
        <div class="small" v-show="!loading">
            <doughnut-chart
                :chartData="charData"
                :options="charOptions"
            />
        </div>
    </div>
</template>

<script>
import client3B from "@/api/client3B";
import DoughnutChart from "@/components/charts/doughnut.vue";
import errorHandler from "@/views/errorHandler";

const NONE = "NONE";

const charOptions = {
    title: {
        display: true,
        text: "Title",
    },
    display: true,
    labels: {
        fontColor: "rgb(255, 99, 132)",
    },
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        datalabels: {
            font: {
                weight: "bold",
            },
            color: (context) => {
                const index = context.dataIndex;
                const value = context.dataset.data[index];
                return value <= 0 ? "transparent" : "white";
            },
            formatter: (value, context) => {
                let total = 0;
                context.dataset.data.forEach((element) => {
                    total += element;
                });
                return `${Math.round((value / total) * 100)}%`;
            },
        },
    },
};

export default {
    components: {
        DoughnutChart,
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        queryData: {
            type: [Object],
            required: true,
        },
    },
    data: () => ({
        loading: false,
        charData: {},
    }),
    created() {
        this.syncObjectives();
    },
    methods: {
        async syncObjectives() {
            this.loading = true;
            const startTime = this.queryData.start;
            const endTime = this.queryData.end;
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
                RegionId: this.queryData.region,
                StarTime: startTime.toISOString(),
                EndDateTime: endTime.toISOString(),
            };
            if (this.queryData.area !== NONE) dataReport.AreaId = this.queryData.area;
            if (this.queryData.job !== NONE) dataReport.JobDescription = this.queryData.job;
            if (this.queryData.person !== NONE) dataReport.UserId = this.queryData.person;

            const response = await client3B.report.GetEvaluatorObjectivesReport(dataReport)
                .catch((error) => errorHandler(this, error));

            const objectives = response.data.result;

            this.charData = {
                datasets: [
                    {
                        data: [
                            objectives.validatedObjectives,
                            objectives.totalObjectives - objectives.validatedObjectives,
                        ],
                        backgroundColor: ["#00b880", "#ff3b3b"],
                    },
                ],
                labels: ["Cumplidos", "No cumplidos"],
            };

            this.loading = false;
            this.$emit("ready", true);
        },
    },
    computed: {
        charOptions() {
            charOptions.title.text = this.title;
            return charOptions;
        },
    },
    watch: {
        queryData: {
            handler() {
                this.syncObjectives();
            },
            deep: true,
        },
    },
};
</script>

<style lang="stylus" scoped>

</style>
