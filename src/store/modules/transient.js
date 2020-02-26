export default {
    state: {
        loading: false,
        loadingRegions: false,
        loadingAreas: false,
        errors: [],
    },
    getters: {
        loading: (state) => state.loading,
        errors: (state) => state.errors,
        loadingRegions: ({ loadingRegions }) => loadingRegions,
        loadingAreas: ({ loadingAreas }) => loadingAreas,
    },
    mutations: {
        requestStart: (_state) => {
            const state = _state;
            state.loading = true;
        },
        requestEnd: (_state) => {
            const state = _state;
            state.loading = false;
        },
        requestError: (_state, payload) => {
            const state = _state;
            state.errors.push(payload.errors);
        },
        resetTransients: (state) => {
            state.loading = false;
            state.errors = [];
        },
        loadingRegionsStart: (state) => {
            state.loadingRegions = true;
        },
        loadingRegionsEnd: (state) => {
            state.loadingRegions = false;
        },
        loadingAreasStart: (state) => {
            state.loadingAreas = true;
        },
        loadingAreasEnd: (state) => {
            state.loadingAreas = false;
        },
    },
};
