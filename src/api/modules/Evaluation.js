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
     * Apply a format to several orgnizations units
     * @param {Object} data   Data to delete a format
     *
     * @return {Promise}        Http Response
     */
    apply(data) {
        const path = `${this.entityPath}/ApplyEvaluationTemplate`;
        return this.request(path, this.methods.post, data);
    }
}

export default Evaluation;
