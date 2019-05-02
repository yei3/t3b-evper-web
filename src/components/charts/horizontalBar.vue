<script>
import { HorizontalBar, mixins } from "vue-chartjs";
import ChartDataLabels from "chartjs-plugin-datalabels";

const { reactiveProp } = mixins;

export default {
    extends: HorizontalBar,
    mixins: [reactiveProp],
    props: {
        options: {
            type: Object,
            default: undefined,
        },
    },
    data: () => ({
        htmlLegend: null,
    }),
    mounted() {
        this.addPlugin({ ChartDataLabels });
        this.renderChart(this.chartData, this.options);
    },
};
</script>
