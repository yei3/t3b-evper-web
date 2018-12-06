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
    a:hover {
        color: white
    }
    .ant-tag {
        width: 71px;
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
        background: #ff5b5b;        
    }
    .collapse-tittle-link {
        color: #fff;
    }
    .ant-collapse-borderless {
        background: #ff5b5b;
    }        
    .ant-collapse > .ant-collapse-item > .ant-collapse-header {
        line-height: 16px;
    }
</style>
