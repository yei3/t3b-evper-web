import Vue from 'vue';
import Vuex from 'vuex';
import app from '@/store/modules/app';
import createEvaluation from '@/store/modules/createEvaluation';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        app,
        createEvaluation,
    },
});
