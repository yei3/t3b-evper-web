<template>
    <a-collapse defaultActiveKey="1" :bordered="false" class="collapse-mod">
        <a-collapse-panel header="Pendientes como colaborador" key="1" style="
            font-family: 'Open Sans';
            font-weight: 600;
            font-size: 14px;"
        >
        <div class="badges-colaborator">
            <a-badge count="2" :numberStyle= "{backgroundColor: '#f8ac59'}"/>
            <span class="badged-text">Auto-evaluaciones pendientes</span>
        </div>
        <div class="badges-colaborator">
            <a-badge count="1" :numberStyle= "{backgroundColor: '#f8ac59'}"/>
            <span class="badged-text">Cierre de mis evaluaciones pendientes</span>
        </div>
        <div class="badges-colaborator" style="margin-bottom: 5px;">
            <a-badge count="2" :numberStyle= "{backgroundColor: '#f8ac59'}"/>
            <span class="badged-text">Objectivos pendientes</span>
        </div>
        </a-collapse-panel>
    </a-collapse>
</template>


<script>
export default {

};
</script>

<style scoped>
.collapse-mod {
    font-family: 'Open Sans';
    font-weight: 600;
    font-size: 14px;
}

.collapse-mod >>> .ant-collapse-content {
    background-color: #f0f2f5;
    border-top: 0;
}

.collapse-mod >>> .ant-collapse-header {
    color: #676a6c;
}

.badges-colaborator {
    margin-top: 10px;
    margin-bottom: 15px;
}

.badged-text {
    font-family: "Open Sans";
    font-weight: 600;
    font-size: 12px;
    color: #777;
    margin-left: 5px;
}
</style>
