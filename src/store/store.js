import Vue from 'vue';
import Vuex from 'vuex';
import App from '@/store/modules/app';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        App,
    },
});
