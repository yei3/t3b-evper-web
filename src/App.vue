<template>
    <div>
        <router-view> </router-view>
    </div>
</template>

<script>
export default {
};
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Quicksand');
    * {
        font-family: 'Quicksand', sans-serif;
    }
    body {
        background-color: #2f4050;
        font-size: 14px;
    }
    a:hover {
        color: white
    }
    .text-right {
        text-align: right
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
