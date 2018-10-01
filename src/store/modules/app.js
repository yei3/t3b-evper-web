export default {
    state: {
        sidebarCollapsed: false,
    },
    getters: {
        sidebarCollapsed: state => state.sidebarCollapsed,
    },
    mutations: {
        toggleSideBar: (state) => {
            state.sidebarCollapsed = !state.sidebarCollapsed; // eslint-disable-line
        },
    },
    actions: {
        toggleSideBar: (context) => {
            context.commit('toggleSideBar');
        },
    },
};
