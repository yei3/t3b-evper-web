const MAX_STEPS = 7;

export default {
    state: {
        view: {
            currentStep: 0,
            lastStep: 0,
        },
        format: {},
    },
    getters: {
        currentStep: state => state.view.currentStep,
        lastStep: state => state.view.lastStep,
        format: state => state.format,
    },
    mutations: {
        nextStep: (_state) => {
            const state = _state;
            if (state.view.currentStep < MAX_STEPS) {
                state.view.currentStep += 1;
            }
            state.view.lastStep = Math.max(state.view.currentStep, state.view.lastStep);
        },
        previousStep: (_state) => {
            const state = _state;
            if (state.view.currentStep > 0) {
                state.view.currentStep -= 1;
            }
            state.view.lastStep = Math.max(state.view.currentStep, state.view.lastStep);
        },
        setStep: (_state, step) => {
            const state = _state;
            state.view.currentStep = step;
        },
        setLastStep: (_state, step) => {
            const state = _state;
            state.view.lastStep = step;
        },
        updateFormatForm: (_state, data) => {
            const state = _state;
            state.format = { ...state.format, ...data };
        },
        clearFormatForm: (_state) => {
            const state = _state;
            state.format = {};
            state.view.currentStep = 0;
            state.view.lastStep = 0;
        },
    },
    actions: {
        nextStep: (context) => {
            context.commit('nextStep');
        },
        previousStep: (context) => {
            context.commit('previousStep');
        },
        setStep: (context, step) => {
            context.commit('setStep', step);
        },
        setLastStep: (context, step) => {
            context.commit('setLastStep', step);
        },
        updateFormatForm: (context, data) => {
            context.commit('updateFormatForm', data);
        },
        clearFormatForm: (context) => {
            context.commit('clearFormatForm');
        },
    },
};
