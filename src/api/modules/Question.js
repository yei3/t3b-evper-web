import Http from './Http';


/**
 * Class to make operations to the Question entity
 */
class Question extends Http {
    constructor() {
        super();
        this.entityPath = {
            default: '/api/services/app/Question',
            objective: '/api/services/app/Objective',
            goal: '/api/services/app/NotEvaluableQuestion',
        };
    }

    /**
     * Request for the information for a question
     *
     * @param {String} objectiveType   Id for the user
     *
     * @return {Promise}        Http Response
     */
    getPath({ objective = false, goal = false }) {
        if (objective) {
            return this.entityPath.objective;
        }
        if (goal) {
            return this.entityPath.goal;
        }
        return this.entityPath.default;
    }

    /**
     * Request for the information for a question
     *
     * @param {String} UserId   Id for the user
     *
     * @return {Promise}        Http Response
     */
    get(questionId, options) {
        const path = `${this.getPath(options)}/Get`;
        const params = { Id: questionId };
        return this.request(path, this.methods.get, params);
    }

    /**
     * Request for the information for all the questions
     *
     * @return {Promise}        Http Response
     */
    getAll(options) {
        const path = `${this.getPath(options)}/GetAll`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Create a new question
     * @param {Object} data   Data to create a question
     *
     * @return {Promise}        Http Response
     */
    create(data, options) {
        const path = `${this.getPath(options)}/Create`;
        return this.request(path, this.methods.post, data);
    }

    /**
     * Create a new question
     * @param {Object} data   Data to create a question
     *
     * @return {Promise}        Http Response
     */
    update(data, options) {
        const path = `${this.getPath(options)}/Update`;
        return this.request(path, this.methods.put, data);
    }

    /**
     * Delete a new question
     * @param {Object} data   Data to delete a question
     *
     * @return {Promise}        Http Response
     */
    delete(data, options) {
        const path = `${this.getPath(options)}/Delete`;
        return this.request(path, this.methods.delete, data);
    }
}

export default Question;
