import Http from './Http';

/**
 * Class to make operations to the Evaluation entity
 */
class Evaluation extends Http {
    constructor() {
        super();
        this.entityPath = '/api/services/app/Evaluation';
    }

    /**
     * Request for the information for a evaluation
     *
     * @param {String} UserId   Id for the user
     *
     * @return {Promise}        Http Response
     */
    get(evaluationId) {
        const path = `${this.entityPath}/Get`;
        const params = { Id: evaluationId };
        return this.request(path, this.methods.get, params);
    }

    /**
     * Request for the information for all the evaluations
     *
     * @return {Promise}        Http Response
     */
    getAll() {
        const path = `${this.entityPath}/GetAll`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Create a new evaluation
     * @param {Object} data   Data to create a evaluation
     *
     * @return {Promise}        Http Response
     */
    create(data) {
        const path = `${this.entityPath}/Create`;
        return this.request(path, this.methods.post, data);
    }

    /**
     * Create a new evaluation
     * @param {Object} data   Data to create a evaluation
     *
     * @return {Promise}        Http Response
     */
    update(data) {
        const path = `${this.entityPath}/Update`;
        return this.request(path, this.methods.put, data);
    }

    /**
     * Delete a new evaluation
     * @param {Object} data   Data to delete a evaluation
     *
     * @return {Promise}        Http Response
     */
    delete(data) {
        const path = `${this.entityPath}/Delete`;
        return this.request(path, this.methods.delete, data);
    }

    /**
     * Add the instructions for the evaluation
     * @param {Object} data   Data to add a evaluation instructions
     *
     * @return {Promise}        Http Response
     */
    addInstructions(data) {
        const path = `${this.entityPath}/AddEvaluationInstructionsAndGetIdAsync`;
        return this.request(path, this.methods.post, data);
    }

    /**
     * Add the section for the evaluation
     * @param {Object} data   Data to add a evaluation section
     *
     * @return {Promise}        Http Response
     */
    addSection(data) {
        const path = `${this.entityPath}/AddEvaluationSectionAndGetIdAsync`;
        return this.request(path, this.methods.post, data);
    }
}

export default Evaluation;
