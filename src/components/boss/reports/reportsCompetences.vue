<template>
    <div>
        <a-row v-show="loading">
            <div style="text-align: center; margin-top: 20px;">
                <a-spin tip="Cargando información..." />
            </div>
        </a-row>
        <div v-show="!loading">
            <bar-chart
                :chartData="charData"
                :options="charOptions"
            />
        </div>
    </div>
</template>

<script>
import client3B from "@/api/client3B";
import BarChart from "@/components/charts/horizontalBar.vue";
import errorHandler from "@/views/errorHandler";

const NONE = "NONE";

const charOptions = {
    title: {
        display: true,
        text: "Title",
    },
    tooltips: {
        mode: "index",
        intersect: false,
    },
    responsive: true,
    scales: {
        xAxes: [
            {
                stacked: true,
            },
        ],
        yAxes: [
            {
                stacked: true,
            },
        ],
    },
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
                const index = context.dataIndex;
                let total = 0;
                context.chart.data.datasets.forEach((dataset) => {
                    total += dataset.data[index];
                });
                return `${Math.round((value / total) * 100)}%`;
            },
        },
    },
};

export default {
    components: {
        BarChart,
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
        this.syncCompetences();
    },
    methods: {
        async syncCompetences() {
            this.loading = true;

            const dataReport = {
                RegionId: this.queryData.region,
                StartTime: this.queryData.start.toISOString(),
                EndDateTime: this.queryData.end.toISOString(),
            };
            if (this.queryData.area !== NONE) dataReport.AreaId = this.queryData.area;
            if (this.queryData.job !== NONE) dataReport.JobDescription = this.queryData.job;
            if (this.queryData.person !== NONE) dataReport.UserId = this.queryData.person;

            const response = await client3B.report.GetEvaluatorCapabilitiesReport(dataReport)
                .catch((error) => errorHandler(this, error));

            const competences = response.data.result;

            this.charData = {
                labels: competences.map((item) => item.name),
                datasets: [
                    {
                        label: "Insatisfactorio",
                        data: competences.map((item) => item.unsatisfactory),
                        backgroundColor: "#e94e6f",
                    },
                    {
                        label: "Cumple Requerimiento",
                        data: competences.map((item) => item.satisfactory),
                        backgroundColor: "#498bc9",
                    },
                    {
                        label: "Excede Requerimiento",
                        data: competences.map((item) => item.exceeds),
                        backgroundColor: "#2eaa79",
                    },
                ],
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
                this.syncCompetences();
            },
            deep: true,
        },
    },
};
</script>

<style lang="stylus" scoped>

</style>
