export default {
    loading: (state) => state.loading,
    errors: (state) => state.errors,
    loadingRegions: ({ loadingRegions }) => loadingRegions,
    loadingAreas: ({ loadingAreas }) => loadingAreas,
    regions: ({ regions }) => {
        return regions.reduce((acc, region) => {
            return [
                ...acc,
                {
                    value: region.id,
                    label: region.displayName,
                    title: region.displayName,
                },
            ];
        }, []);
    },
    areas: ({ areas }) => {
        return areas.reduce((acc, area) => {
            return [
                ...acc,
                {
                    value: area.id,
                    label: area.displayName,
                    title: area.displayName,
                },
            ];
        }, []);
    },
    regionsArray: (state) => state.regions,
    areasArray: (state) => state.areas,
};
