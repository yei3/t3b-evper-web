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
                    key: region.code,
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
                    key: area.code,
                },
            ];
        }, []);
    },
    userFormRegions: ({ regions }) => {
        return regions.reduce((acc, region) => {
            return [
                ...acc,
                {
                    value: region.code,
                    label: region.displayName,
                    title: region.displayName,
                    key: region.id,
                },
            ];
        }, []);
    },
    userFormAreas: ({ areas }) => {
        return areas.reduce((acc, area) => {
            return [
                ...acc,
                {
                    value: area.code,
                    label: area.displayName,
                    title: area.displayName,
                    key: area.id,
                },
            ];
        }, []);
    },
    regionsArray: (state) => state.regions,
    areasArray: (state) => state.areas,
};
