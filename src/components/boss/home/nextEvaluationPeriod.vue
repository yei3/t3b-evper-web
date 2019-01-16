<template>
    <a-collapse defaultActiveKey="1" :bordered="false" class="collapse-mod">
        <a-collapse-panel header="Periodo" key="1" class="text-center">
            <h3 class="tittle-collapse">Periodo 2018-02</h3>
            <a-range-picker
                disabled
                :defaultValue="[moment('2018-08-01', dateFormat), moment('2019-01-31', dateFormat)]"
            />
        </a-collapse-panel>
    </a-collapse>
</template>

<script>
import moment from 'moment';

export default {
    data() {
        this.dateFormat = 'YYYY-MM-DD';
        return {};
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
