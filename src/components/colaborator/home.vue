<template>
    <a-row :gutter="32">
        <a-col :lg="12" :sm="24">
            <a-collapse defaultActiveKey="1" :bordered="false">
                <a-collapse-panel header="Próximo periodo de evaluación" key="1" style="
                    font-family: 'Open Sans';
                    font-weight: 600;
                    font-size: 14px;"
                >
                    <h3 id="h3-collapse">Periodo 2018-02</h3>
                    <a-icon type="calendar" />
                    <small style="color: #888;">08/01/2019 - 15/01/2019</small>
                </a-collapse-panel>
            </a-collapse>
        </a-col>
        <a-col :lg="12" :sm="24">
            <a-collapse defaultActiveKey="1" :bordered="false">
                <a-collapse-panel header="This is panel header 1" key="1">
                    <p >{{text}}</p>
                </a-collapse-panel>
            </a-collapse>
        </a-col>
    </a-row>
</template>

<script>
export default {
    data() {
        return {
            text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.',
        };
    },
};
</script>

<style>
.ant-collapse-borderless > .ant-collapse-item > .ant-collapse-content {
    background-color: #f0f2f5;
    border-top: 0;
}

.ant-collapse > .ant-collapse-item > .ant-collapse-header {
    color: #676a6c;
}

#h3-collapse {
    font-weight: 200;
    font-size: 24px;
    font-family: "Open Sans";
    font-weight: 300;
    padding-top: 10px;
    color: #676a6c;
}

</style>
