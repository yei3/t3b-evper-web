<template>
    <a-collapse defaultActiveKey="1" :bordered="false" class="collapse-mod">
        <a-collapse-panel header="Próximo periodo de evaluación" key="1">
            <h3 class="tittle-collapse">Periodo 2018-02</h3>
            <a-icon type="calendar" />
            <small style="color: #888;">08/01/2019 - 15/01/2019</small>
        </a-collapse-panel>
    </a-collapse>
</template>


<script>
export default {

};
</script>

<style scoped>
.collapse-mod {
    font-weight: 600;
    font-size: 14px;
    border: none
}

.collapse-mod >>> .ant-collapse-content {
    background-color: #f4f6fa;
    border-top: 0;
}

.collapse-mod >>> .ant-collapse-header {
    color: #fff;
    line-height: 16px;
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
