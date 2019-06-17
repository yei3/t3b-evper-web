export default {
    state: {
        sidebarCollapsed: false,
    },
    getters: {
        sidebarCollapsed: (state) => state.sidebarCollapsed,
    },
    mutations: {
        toggleSideBar: (state) => {
            state.sidebarCollapsed = !state.sidebarCollapsed; // eslint-disable-line
        },
        hideSideBar: (state, hide) => {
            state.sidebarCollapsed = hide; // eslint-disable-line
        },
    },
    actions: {
        toggleSideBar: (context) => {
            context.commit("toggleSideBar");
        },
        hideSideBar: (context, hide) => {
            context.commit("hideSideBar", hide);
        },
    },
};
