export default {
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
    resetTransientErrors: (state) => {
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
    setRegions: (_state, regions) => {
        const state = _state;
        state.regions = regions;
    },
    setAreas: (_state, areas) => {
        const state = _state;
        state.areas = areas;
    },
};
