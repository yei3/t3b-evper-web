<template>
    <a-collapse defaultActiveKey="1" :bordered="false" class="collapse-mod">
        <a-collapse-panel header="Periodo" key="1" class="text-center">
            <h3 class="tittle-collapse">Periodo {{data.year}} - {{value ? 1 : 2}}</h3>
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
        this.value = (new Date().getMonth() > 1 && new Date().getMonth() < 8) ? true : false;
    },
    data: () => ({
        value: false,
        data: {
            format: "DD-MM-YYYY",
            year: new Date().getFullYear(),
        }
    }),
    methods: {
        moment,
        startDate() {
            return this.value ? ("01-02-"+this.year) : ("01-08-"+this.year);
        },
        endDate() {
            return this.value ? ("30-07-"+this.year) : ("30-01-"+(parseInt(new Date().getFullYear())+1));
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
