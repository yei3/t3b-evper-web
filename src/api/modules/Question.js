import Http from './Http';

/**
 * Class to make operations to the Question entity
 */
class Question extends Http {
    constructor() {
        super();
        this.entityPath = '/api/services/app/Question';
    }

    /**
     * Request for the information for a question
     *
     * @param {String} UserId   Id for the user
     *
     * @return {Promise}        Http Response
     */
    get(questionId) {
        const path = `${this.entityPath}/Get`;
        const params = { Id: questionId };
        return this.request(path, this.methods.get, params);
    }

    /**
     * Request for the information for all the questions
     *
     * @return {Promise}        Http Response
     */
    getAll() {
        const path = `${this.entityPath}/GetAll`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Create a new question
     * @param {Object} data   Data to create a question
     *
     * @return {Promise}        Http Response
     */
    create(data) {
        const path = `${this.entityPath}/Create`;
        return this.request(path, this.methods.post, data);
    }

    /**
     * Create a new question
     * @param {Object} data   Data to create a question
     *
     * @return {Promise}        Http Response
     */
    update(data) {
        const path = `${this.entityPath}/Update`;
        return this.request(path, this.methods.put, data);
    }

    /**
     * Delete a new question
     * @param {Object} data   Data to delete a question
     *
     * @return {Promise}        Http Response
     */
    delete(data) {
        const path = `${this.entityPath}/Delete`;
        return this.request(path, this.methods.delete, data);
    }
}

export default Question;
