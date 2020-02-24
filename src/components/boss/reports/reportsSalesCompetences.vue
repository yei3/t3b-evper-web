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
const SUCCESS = 70;
const EXCEEDS = 90;

const charOptions = {
    title: {
        display: true,
        text: "Tittle",
    },
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
    },
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
            formatter: (value) => `${value}%`,
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
            const dataReport = {
                RegionId: this.queryData.region,
                StartTime: this.queryData.start.toISOString(),
                EndDateTime: this.queryData.end.toISOString(),
            };
            if (this.queryData.area !== NONE) dataReport.AreaId = this.queryData.area;
            if (this.queryData.job !== NONE) dataReport.JobDescription = this.queryData.job;
            if (this.queryData.person !== NONE) dataReport.UserId = this.queryData.person;

            const response = await client3B.report.GetEvaluatorCapabilitiesSalesReport(dataReport)
                .catch((error) => errorHandler(this, error));
            if (!response) return;

            const competences = response.data.result;

            const jobTotal = competences[0].total;
            const jobSuccess = competences[0].satisfactory;
            const cultureTotal = competences[1].total;
            const cultureSuccess = competences[1].satisfactory;

            const data = [
                {
                    name: "Competencias del puesto",
                    total: jobTotal - jobSuccess,
                    exceeds: this.isExceeds(jobTotal, jobSuccess),
                    satisfactory: this.isSatisfactory(jobTotal, jobSuccess),
                    unsatisfactory: this.isUnsatisfactory(jobTotal, jobSuccess),
                },
                {
                    name: "Cultura 3B",
                    total: cultureTotal - cultureSuccess,
                    exceeds: this.isExceeds(cultureTotal, cultureSuccess),
                    satisfactory: this.isSatisfactory(cultureTotal, cultureSuccess),
                    unsatisfactory: this.isUnsatisfactory(
                        cultureTotal,
                        cultureSuccess,
                    ),
                },
            ];

            this.charData = {
                labels: data.map((item) => item.name),
                datasets: [
                    {
                        label: "Insatisfactorio",
                        data: data.map((item) => item.unsatisfactory),
                        backgroundColor: "#ff3b3b",
                    },
                    {
                        label: "Satisfactorio",
                        data: data.map((item) => item.satisfactory),
                        backgroundColor: "#498bc9",
                    },
                    {
                        label: "Excelente",
                        data: data.map((item) => item.exceeds),
                        backgroundColor: "#00b880",
                    },
                ],
            };

            this.loading = false;
            this.$emit("ready", true);
        },
        isExceeds(total, value) {
            if (!total) return 0;
            const result = Math.round((value / total) * 100);
            if (result >= EXCEEDS) return result;
            return 0;
        },
        isSatisfactory(total, value) {
            if (!total) return 0;
            const result = Math.round((value / total) * 100);
            if (result >= SUCCESS && result < EXCEEDS) return result;
            return 0;
        },
        isUnsatisfactory(total, value) {
            if (!total) return 0;
            const result = Math.round((value / total) * 100);
            if (result < SUCCESS) return result;
            return 0;
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
