<template>
    <a-collapse defaultActiveKey="1" :bordered="false" class="collapse-mod">
        <a-collapse-panel header="Acciones por finalizar" key="1" style="
            font-family: 'Open Sans';
            font-weight: 600;
            font-size: 14px;"
        >
        <div class="badges-collaborator">
            <a-badge count="2" :numberStyle= "{backgroundColor: '#f8ac59'}"/>
            <span class="badged-text">Auto-evaluaciones En procesos</span>
        </div>
        <div class="badges-collaborator">
            <a-badge count="1" :numberStyle= "{backgroundColor: '#f8ac59'}"/>
            <span class="badged-text">Cierre de mis evaluaciones En procesos</span>
        </div>
        <div class="badges-collaborator" style="margin-bottom: 5px;">
            <a-badge count="2" :numberStyle= "{backgroundColor: '#f8ac59'}"/>
            <span class="badged-text">Objectivos En procesos</span>
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
    font-weight: 600;
    font-size: 14px;
}

.collapse-mod >>> .ant-collapse-content {
    background-color: #f4f6fa;
    border-top: 0;
}

.collapse-mod >>> .ant-collapse-header {
    color: #676a6c;
}

.badges-collaborator {
    margin-top: 10px;
    margin-bottom: 15px;
}

.badged-text {
    font-weight: 600;
    font-size: 12px;
    color: #777;
    margin-left: 5px;
}
</style>
