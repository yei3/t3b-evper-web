import Vue from "vue";
import Vuex from "vuex";
import app from "@/store/modules/app";
import createFormat from "@/store/modules/createFormat";
import evaluation from "@/store/modules/evaluation";
import authService from "@/services/auth";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        app,
        createFormat,
        evaluation,
    },
    state: {
        userProfile: ((role) => {
            if (role === authService.ROLES.ADMINISTRATOR) {
                return "Administrador";
            }
            if (role === authService.ROLES.SUPERVISOR) {
                return "Evaluador";
            }
            return "Evaluado";
        })(authService.getCurrentRole()),
    },
    getters: {
        userProfile: (state) => state.userProfile,
    },
});
