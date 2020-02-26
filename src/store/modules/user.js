import client3B from "@/api/client3B";

export default {
    state: {
        userData: null,
    },
    getters: {
        user: ({ userData }) => userData,
        userRegionCode: ({ userData }) => userData.regionCode,
        userAreaCode: ({ userData }) => userData.areaCode,
    },
    mutations: {
        setUserData: (_state, userData) => {
            const state = _state;
            state.userData = userData;
        },
        evaluationSetQuestions: (_state, questions) => {
            const state = _state;
            state.questions = questions;
        },
        evaluationAddQuestionStatus: (_state, question) => {
            const state = _state;
            state.questions.push(question);
        },
        evaluationSetQuestionsAsAnswered: (_state, questionId) => {
            const state = _state;
            const question = state.questions.find((qst) => qst.id === questionId);
            question.answered = true;
        },
        updateRegionCode(_state, newUserRegionCode) {
            const state = _state;
            state.userData.regionCode = newUserRegionCode;
        },
        updateAreaCode(_state, newUserAreaCode) {
            const state = _state;
            state.userData.areaCode = newUserAreaCode;
        },
    },
    actions: {
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
    },
};
