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
    .dropdown-icon {
        color: #fff;
    }
    .ant-collapse-borderless {
        background: #f35b5b;
    }
    .collapse-tittle-link {
        color: #fff;
    }
    .background--title {
        color: #fff;
        background: #f35b5b;
        text-align: center;
    }   
</style>
