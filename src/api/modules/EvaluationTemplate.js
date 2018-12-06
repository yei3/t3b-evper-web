import Http from './Http';

/**
 * Class to make operations to the Format entity
 */
class Format extends Http {
    constructor() {
        super();
        this.entityPath = '/api/services/app/EvaluationTemplate';
    }

    /**
     * Request for the information for a format
     *
     * @param {String} FormatId   Id for the user
     *
     * @return {Promise}        Http Response
     */
    get(formatId) {
        const path = `${this.entityPath}/Get`;
        const params = { Id: formatId };
        return this.request(path, this.methods.get, params);
    }

    /**
     * Request for the information for all the formats
     *
     * @return {Promise}        Http Response
     */
    getAll() {
        const path = `${this.entityPath}/GetAll`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Create a new format
     * @param {Object} data   Data to create a format
     *
     * @return {Promise}        Http Response
     */
    create(data) {
        const path = `${this.entityPath}/Create`;
        return this.request(path, this.methods.post, data);
    }

    /**
     * Create a new format
     * @param {Object} data   Data to create a format
     *
     * @return {Promise}        Http Response
     */
    update(data) {
        const path = `${this.entityPath}/Update`;
        return this.request(path, this.methods.put, data);
    }

    /**
     * Delete a new format
     * @param {Object} data   Data to delete a format
     *
     * @return {Promise}        Http Response
     */
    delete(data) {
        const path = `${this.entityPath}/Delete`;
        return this.request(path, this.methods.delete, data);
    }
}

export default Format;
