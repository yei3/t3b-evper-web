export default {
    evaluationClearQuestions: (_state) => {
        const state = _state;
        state.questions = [];
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
};
