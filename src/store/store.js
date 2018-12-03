import Vue from 'vue';
import Vuex from 'vuex';
import app from '@/store/modules/app';
import createFormat from '@/store/modules/createFormat';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        app,
        createFormat,
    },
});
