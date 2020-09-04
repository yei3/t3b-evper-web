import GETTERS from "./getters";
import MUTATIONS from "./mutations";

export default {
    state: {
        questions: [],
    },
    getters: {
        ...GETTERS.evaluationGetters,
    },
    mutations: {
        ...MUTATIONS.evaluationMutations,
    },
    actions: {
        evaluationClearQuestions: ({ commit }) => {
            commit("evaluationClearQuestions");
        },
    },
};
