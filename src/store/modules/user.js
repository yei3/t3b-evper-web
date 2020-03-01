import ACTIONS from "./actions";
import MUTATIONS from "./mutations";
import GETTERS from "./getters";

export default {
    state: {
        userData: null,
    },
    getters: {
        ...GETTERS.userGetters,
    },
    mutations: {
        ...MUTATIONS.userMutations,
    },
    actions: {
        ...ACTIONS.userActions,
    },
};
