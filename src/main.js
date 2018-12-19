
import Vue from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@/assets/styles/general.css';

import App from './App.vue';
import router from './routes/router';
import store from './store/store';

Vue.config.productionTip = false;
Vue.use(Antd);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
