<template>
    <a-collapse defaultActiveKey="1" :bordered="false" class="collapse-mod">
        <a-collapse-panel header="Periodo" key="1" class="text-center">
            <h3 class="tittle-collapse">Periodo {{ year }} - {{ value ? 1 : 2 }}</h3>
            <a-range-picker
                disabled
                :defaultValue="[moment(startDate(), data.format), moment(endDate(), data.format)]"
            />
        </a-collapse-panel>
    </a-collapse>
</template>

<script>
import moment from "moment";

export default {
    beforeCreate() {
        // Range of period
        this.isFirstPeriod = new Date().getMonth() > 1 && new Date().getMonth() < 8;
        this.year =
            new Date().getMonth() > 1 && new Date().getMonth() < 8
                ? new Date().getFullYear()
                : new Date().getFullYear() - 1;
    },
    data: () => ({
        value: false,
        data: {
            format: "DD-MM-YYYY",
        },
    }),
    methods: {
        moment,
        startDate() {
            return this.isFirstPeriod ? "01-01-" + this.year : "01-07-" + this.year;
        },
        endDate() {
            return this.isFirstPeriod ? "30-06-" + this.year : "31-12-" + this.year;
        },
        disabledDate() {
            // Can not select days before today and today
            return true;
        },
    },
};
</script>

<style scoped>
.collapse-mod {
    background-color: #223a52;
    font-weight: 600;
    font-size: 14px;
}

.collapse-mod >>> .ant-collapse-content {
    background-color: #f4f6fa;
    border-top: 0;
}

.collapse-mod >>> .ant-collapse-header {
    color: #fff;
}

.tittle-collapse {
    font-weight: 200;
    font-size: 24px;
    font-weight: 300;
    padding-top: 10px;
    padding-bottom: 0px;
    margin-bottom: 5px;
    color: #676a6c;
}
</style>
