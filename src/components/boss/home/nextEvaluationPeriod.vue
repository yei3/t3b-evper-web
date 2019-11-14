<template>
    <a-collapse defaultActiveKey="1" :bordered="false" class="collapse-mod">
        <a-collapse-panel header="Periodo" key="1" class="text-center">
            <h3 class="tittle-collapse">Periodo {{data.year}} - {{data.period}}</h3>
            <a-range-picker
                disabled
                :defaultValue="[moment('01-01-2019', dateFormat), moment('30-06-2019', dateFormat)]"
            />
        </a-collapse-panel>
    </a-collapse>
</template>

<script>
import moment from "moment";

export default {
    data() {
        this.dateFormat = "DD-MM-YYYY";
        return {
            data: {
                year: new Date().getFullYear(),
                period: (new Date().getMonth() > 1 && new Date().getMonth() < 8) ? 1 : 2
            }
        };
    },
    methods: {
        moment,
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
