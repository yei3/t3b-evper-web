import Http from './Http';

/**
 * Class to make operations to the Answer entity
 */
class Answer extends Http {
    constructor() {
        super();
        this.entityPath = {
            measured: '/api/services/app/EvaluationObjectives',
            unmeasured: '/api/services/app/UnmeasuredAnswer',
        };
    }

    getEntityPath(measured) {
        if (measured) {
            return this.entityPath.measured;
        }
        return this.entityPath.unmeasured;
    }

    /**
     * Request for the information for a answer
     *
     * @param {String} answerId   Id for the user
     *
     * @return {Promise}        Http Response
     */
    get(answerId, { measured = false } = {}) {
        const path = `${this.getEntityPath(measured)}/Get`;
        const params = { Id: answerId };
        return this.request(path, this.methods.get, params);
    }

    /**
     * Request for the information for all the answers
     *
     * @return {Promise}        Http Response
     */
    getAll({ measured = false } = {}) {
        const path = `${this.getEntityPath(measured)}/GetAll`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Create a new answer
     * @param {Object} data   Data to create a answer
     *
     * @return {Promise}        Http Response
     */
    create(data, { measured = false } = {}) {
        const path = `${this.getEntityPath(measured)}/Create`;
        return this.request(path, this.methods.post, data);
    }

    /**
     * Create a new answer
     * @param {Object} data   Data to create a answer
     *
     * @return {Promise}        Http Response
     */
    update(data, { measured = false } = {}) {
        const path = `${this.getEntityPath(measured)}/Update`;
        return this.request(path, this.methods.put, data);
    }

    /**
     * Delete a new answer
     * @param {Object} data   Data to delete a answer
     *
     * @return {Promise}        Http Response
     */
    delete(data, { measured = false } = {}) {
        const path = `${this.getEntityPath(measured)}/Delete`;
        return this.request(path, this.methods.delete, data);
    }
}

export default Answer;
