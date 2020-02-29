import MUTATIONS from "./mutations";
import ACTIONS from "./actions";

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
        loading: (state) => state.loading,
        errors: (state) => state.errors,
        loadingRegions: ({ loadingRegions }) => loadingRegions,
        loadingAreas: ({ loadingAreas }) => loadingAreas,
        regions: ({ regions }) => {
            return regions.reduce((acc, region) => {
                return [...acc, { value: region.code, label: region.displayName }];
            }, []);
        },
        areas: ({ areas }) => {
            return areas.reduce((acc, area) => {
                return [...acc, { value: area.code, label: area.displayName }];
            }, []);
        },
        regionsArray: (state) => state.regions,
        areasArray: (state) => state.areas,
    },
    mutations: {
        ...MUTATIONS.transientMutations,
    },
    actions: {
        ...ACTIONS.transientActions,
    },
};
