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
        font-size: 13px;
    }
    .text-center {
        text-align: center;
    }
    a:hover {
        color: white
    }
    .ant-tag, .ant-tag:hover {
        cursor: auto;
        color: #606060;        
    }
    .ant-tag-red {
        background: #fff1f0;
    }
    .ant-tag-blue {
        background: #d2eeff;
    }
    .ant-tag-green {
        background: #ccfff4;
    }
    .ant-tag-yellow {
        background: #fff6b4;
    }
    .dropdown-icon {
        color: #fff;
    }
    .ant-collapse-borderless {
        background: #ff5b5b;
    }
    .collapse-tittle-link {
        color: #fff;
    }
    .background--title {
        color: #fff;
        line-height: 16px;
        text-align: center;
        background: #ff5b5b;        
    }
    .ant-collapse > .ant-collapse-item > .ant-collapse-header {
        line-height: 16px;
    }
</style>
