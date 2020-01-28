<template>
    <a-locale-provider :locale="es_ES">
        <router-view> </router-view>
    </a-locale-provider>
</template>

<script>
import moment from "moment";
import "moment/locale/es";
import es_ES from "ant-design-vue/lib/locale-provider/es_ES"; // eslint-ignore-line

moment.locale("es");

export default {
    data() {
        return {
            es_ES,
        };
    },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Quicksand");
* {
    font-family: "Quicksand", sans-serif;
}
body {
    background-color: #2f4050;
    font-size: 14px;
}
a:hover {
    color: white;
}
.text-right {
    text-align: right;
}
.text-center {
    text-align: center;
}
.dropdown-icon {
    color: #fff;
}
.background--title {
    color: #fff;
    line-height: 16px;
    text-align: center;
    background: #ff6565;
    border-radius: 6px 6px 0px 0;
}
.collapse {
    border-top: none;
    border-radius: 6px;
}
.collapse-content {
    margin: 16px 0 8px 0;
    background: white;
    padding: 8px 15px 16px;
}
.ant-tag {
    width: 84px;
    color: #606060;
    text-align: center;
}
.ant-tag:hover {
    cursor: auto;
    color: #606060;
}
.ant-tag-red {
    background: #fff1f0;
}
.ant-tag-gray {
    background: #f8f8f8;
    border-color: #5e5e5e;
}
.ant-tag-blue {
    background: #d2eeff;
}
.ant-tag-green {
    background: #ddffea;
}
.ant-tag-yellow {
    background: #feffc6;
}
.ant-collapse-borderless > .ant-collapse-item {
    border-bottom: none;
}
.collapse-tittle-link {
    color: #fff;
}
.ant-collapse-borderless {
    background: #ff6565;
    border-radius: 6px;
}
.ant-collapse-content {
    background: #fff !important;
}
.ant-collapse > .ant-collapse-item > .ant-collapse-header {
    line-height: 16px;
}
</style>
