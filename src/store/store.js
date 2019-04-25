import Vue from 'vue';
import Vuex from 'vuex';
import app from '@/store/modules/app';
import createFormat from '@/store/modules/createFormat';
import evaluation from '@/store/modules/evaluation';
import authService from '@/services/auth';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        app,
        createFormat,
        evaluation,
    },
    state: {
        userProfile: authService.getCurrentRole()  === authService.ROLES.ADMINISTRATOR ? 'Administrador'
                        :  authService.getCurrentRole()  === authService.ROLES.SUPERVISOR ? 'Evaluador'
                        :  'Evaluado',
    },
    getters: {
        userProfile: state => {
            return state.userProfile
        }
    }
});
