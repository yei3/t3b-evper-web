import Http from './Http';

/**
 * Class to make operations to the Answer entity
 */
class Answer extends Http {
    constructor() {
        super();
        this.entityPath = '/api/services/app/UnmeasuredAnswer';
    }

    /**
     * Request for the information for a answer
     *
     * @param {String} answerId   Id for the user
     *
     * @return {Promise}        Http Response
     */
    get(answerId) {
        const path = `${this.entityPath}/Get`;
        const params = { Id: answerId };
        return this.request(path, this.methods.get, params);
    }

    /**
     * Request for the information for all the answers
     *
     * @return {Promise}        Http Response
     */
    getAll() {
        const path = `${this.entityPath}/GetAll`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Create a new answer
     * @param {Object} data   Data to create a answer
     *
     * @return {Promise}        Http Response
     */
    create(data) {
        const path = `${this.entityPath}/Create`;
        return this.request(path, this.methods.post, data);
    }

    /**
     * Create a new answer
     * @param {Object} data   Data to create a answer
     *
     * @return {Promise}        Http Response
     */
    update(data) {
        const path = `${this.entityPath}/Update`;
        return this.request(path, this.methods.put, data);
    }

    /**
     * Delete a new answer
     * @param {Object} data   Data to delete a answer
     *
     * @return {Promise}        Http Response
     */
    delete(data) {
        const path = `${this.entityPath}/Delete`;
        return this.request(path, this.methods.delete, data);
    }
}

export default Answer;
