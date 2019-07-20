import Http from "./Http";

/**
 * Class to make operations to the Answer entity
 */
class Answer extends Http {
    constructor() {
        super();
        this.entityPath = {
            measured: "/api/services/app/EvaluationObjectives",
            unmeasured: "/api/services/app/UnmeasuredAnswer",
            goal: "/api/services/app/NotEvaluableAnswer",
        };
    }

    getEntityPath({ measured = false, goal = false }) {
        if (measured) {
            return this.entityPath.measured;
        }
        if (goal) {
            return this.entityPath.goal;
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
    get(answerId, options = {}) {
        const path = `${this.getEntityPath(options)}/Get`;
        const params = { Id: answerId };
        return this.request(path, this.methods.get, params);
    }

    /**
     * Request for the information for all the answers
     *
     * @return {Promise}        Http Response
     */
    getAll(options = {}) {
        const path = `${this.getEntityPath(options)}/GetAll`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Create a new answer
     * @param {Object} data   Data to create a answer
     *
     * @return {Promise}        Http Response
     */
    create(data, options = {}) {
        const path = `${this.getEntityPath(options)}/Create`;
        return this.request(path, this.methods.post, data);
    }

    /**
     * Create a new answer
     * @param {Object} data   Data to create a answer
     *
     * @return {Promise}        Http Response
     */
    update(data, options = {}) {
        const path = `${this.getEntityPath(options)}/Update`;
        return this.request(path, this.methods.put, data);
    }

    /**
     * Update expected values for answer type objetive
     * @param {Object} data   Data to create a answer
     *
     * @return {Promise}        Http Response
     */
    updateExpected(data, options = {}) {
        const path = `${this.getEntityPath(options)}/UpdateExpectedValues`;
        return this.request(path, this.methods.put, data);
    }

    /**
     * Delete a new answer
     * @param {Object} data   Data to delete a answer
     *
     * @return {Promise}        Http Response
     */
    delete(data, options = {}) {
        const path = `${this.getEntityPath(options)}/Delete`;
        return this.request(path, this.methods.delete, data);
    }
}

export default Answer;
