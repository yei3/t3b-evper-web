import MUTATIONS from "./mutations";
import ACTIONS from "./actions";
import GETTERS from "./getters";

export default {
    state: {
        loading: false,
        loadingRegions: false,
        loadingAreas: false,
        regions: [],
        areas: [],
        errors: [],
    },
    getters: {
        ...GETTERS.transientGetters,
    },
    mutations: {
        ...MUTATIONS.transientMutations,
    },
    actions: {
        ...ACTIONS.transientActions,
    },
};
