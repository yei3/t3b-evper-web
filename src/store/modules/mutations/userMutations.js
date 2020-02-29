export default {
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
};
