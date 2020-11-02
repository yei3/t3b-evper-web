import client3B from "@/api/client3B";

export default {
    getUserAsync: async ({ commit }, userId) => {
        try {
            commit("requestStart");

            const { data } = await client3B.user.getUserByUserName(userId);
            const { result } = data;

            commit("setUserData", result);
        } catch (error) {
            commit("requestError", { errors: error.message });
        } finally {
            commit("requestEnd");
        }
    },
    deleteUser: async ({ commit }, userId) => {
        try {
            commit("requestStart");

            await client3B.user.delete(userId);
            commit("resetUserData");
        } catch (error) {
            commit("requestError", { errors: error.message });
        } finally {
            commit("requestEnd");
        }
    },
    inactivateUser: async ({ commit }, userId) => {
        try {
            commit("requestStart");

            await client3B.user.inactivate(userId);
            commit("resetUserData");
        } catch (error) {
            commit("requestError", { errors: error.message });
        } finally {
            commit("requestEnd");
        }
    },
    resetUserPassword: async ({ commit }, userData) => {
        try {
            commit("requestStart");

            await client3B.account.firstTimeLogin(userData);
        } catch (error) {
            commit("requestError", { errors: error.message });
        } finally {
            commit("requestEnd");
        }
    },
};
