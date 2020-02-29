import ACTIONS from "./actions";
import MUTATIONS from "./mutations";

export default {
    state: {
        userData: null,
    },
    getters: {
        user: ({ userData }) => userData,
        userRegionCode: ({ userData }) => userData.regionCode,
        userAreaCode: ({ userData }) => userData.areaCode,
    },
    mutations: {
        ...MUTATIONS.userMutations,
    },
    actions: {
        ...ACTIONS.userActions,
    },
};
