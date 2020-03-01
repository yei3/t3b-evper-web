import client3B from "@/api/client3B";

export default {
    getRegionsAsync: async ({ commit }) => {
        try {
            commit("loadingRegionsStart");
            const { data } = await client3B.organizationUnit.getAllRegions();
            const { result } = data;
            commit("setRegions", result);
            commit("resetTransientErrors");
        } catch (error) {
            commit("requestError", { errors: error.message });
        } finally {
            commit("loadingRegionsEnd");
        }
    },
    getAreasAsync: async ({ commit }, userRegionCode) => {
        try {
            commit("loadingAreasStart");
            const { data } = await client3B.organizationUnit.getAllAreasByRegionCode(
                userRegionCode,
            );
            const { result } = data;
            commit("setAreas", result);
            commit("resetTransientErrors");
        } catch (error) {
            commit("requestError", { errors: error.message });
        } finally {
            commit("loadingAreasEnd");
        }
    },
    getAllAreas: async ({ commit }) => {
        try {
            commit("loadingAreasStart");
            const { data } = await client3B.organizationUnit.getAllAreas();
            const { result } = data;
            commit("setAreas", result);
            commit("resetTransientErrors");
        } catch (error) {
            commit("requestError", { errors: error.message });
        } finally {
            commit("loadingAreasEnd");
        }
    },
};
