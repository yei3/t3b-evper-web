export default {
    state: {
        auth: false,
    },
    getters: {
        auth: state => state.auth,
    },
    mutations: {
        setAuthenticationData: (state, auth) => {
            state.auth = auth; // eslint-disable-line
        },
    },
    actions: {
        setAuthenticationData: (context, auth) => {
            context.commit('setAuthenticationData', auth);
        },
    },
};
