export default {
    state: {
        questions: [],
    },
    getters: {
        questions: state => state.questions,
    },
    mutations: {
        evaluationSetQuestions: (_state, questions) => {
            const state = _state;
            state.questions = questions;
        },
        evaluationSetQuestionsAsAnswered: (_state, questionId) => {
            const state = _state;
            const question = state.questions.find(qst => qst.id === questionId);
            question.answered = true;
        },
    },
    actions: {

    },
};
