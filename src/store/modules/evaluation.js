export default {
    state: {
        questions: [],
    },
    getters: {
        questions: state => state.questions,
        evaluationIsComplete: state => {
            for (let i = 0; i < state.questions.length; i += 1) {
                if (state.questions[i].answered === false) {
                    return false;
                }
            }
            return true;
        },
    },
    mutations: {
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
            const question = state.questions.find(qst => qst.id === questionId);
            question.answered = true;
        },
    },
    actions: {},
};
