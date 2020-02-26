import Vue from "vue";
import Vuex from "vuex";
import app from "@/store/modules/app";
import createFormat from "@/store/modules/createFormat";
import evaluation from "@/store/modules/evaluation";
import user from "@/store/modules/user";
import transient from "@/store/modules/transient";
import authService from "@/services/auth";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        app,
        createFormat,
        evaluation,
        user,
        transient,
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
