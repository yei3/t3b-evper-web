export default {
    questions: (state) => state.questions,
    evaluationIsComplete: (state) => {
        for (let i = 0; i < state.questions.length; i += 1) {
            if (state.questions[i].answered === false) {
                return false;
            }
        }
        return true;
    },
};
