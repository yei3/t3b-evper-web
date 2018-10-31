<template>
    <a-collapse defaultActiveKey="1" :bordered="false" class="collapse-mod">
        <a-collapse-panel header="Pendientes como jefe" key="1" style="
            font-family: 'Open Sans';
            font-weight: 600;
            font-size: 14px;"
        >
        <div class="badges-colaborator">
            <a-badge count="6" :numberStyle= "{backgroundColor: '#f8ac59'}"/>
            <span class="badged-text">Evaluaciones de colaboradores pendientes</span>
        </div>
        <div class="badges-colaborator">
            <a-badge count="6" :numberStyle= "{backgroundColor: '#f8ac59'}"/>
            <span class="badged-text">Validación de objetivos de colaboradores pendientes</span>
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
    background-color: #f4f6fa;
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
