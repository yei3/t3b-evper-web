import Http from './Http';
import Answer from './Answer';

/**
 * Class to make operations to the Evaluation entity
 */
class Revision extends Http {
    constructor() {
        super();
        this.entityPath = '/api/services/app/Revision';
        this.answer = new Answer();
    }

    /**
     * Request for the evaluation revision
     *
     * @param {String} evaluationId   Id for the user
     *
     * @return {Promise}        Http Response
     */
    revise(evaluationId) {
        const path = `${this.entityPath}/ReviseEvaluation`;
        return this.request(path, this.methods.post, {
            $qs: { evaluationId },
        });
    }

    /**
     * Request for the update evaluation revision date
     *
     * @param {Object} data     Data to update revision date
     *
     * @return {Promise}        Http Response
     */
    updateRevisionDate(data) {
        const path = `${this.entityPath}/UpdateRevisionDate`;
        return this.request(path, this.methods.put, data);
    }

    /**
     * Request for the evaluation finalization
     *
     * @param {String} evaluationId   Id for the user
     *
     * @return {Promise}        Http Response
     */
    finish(evaluationId) {
        const path = `${this.entityPath}/FinishEvaluation`;
        return this.request(path, this.methods.post, {
            $qs: { evaluationId },
        });
    }
}


/**
 * Class to make operations to the Evaluation entity
 */
class Evaluation extends Http {
    constructor() {
        super();
        this.entityPath = '/api/services/app/Evaluation';
        this.answer = new Answer();
        this.revision = new Revision();
    }

    /**
     * Request for the information for a evaluation
     *
     * @param {String} evaluationId   Id for the user
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
     * Request for the information for the Admin Evaluation summary
     *
     * @return {Promise}        Http Response
     */
    getAdminEvaluationSummary() {
        const path = `${this.entityPath}/GetAdministratorEvaluationSummary`;
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
