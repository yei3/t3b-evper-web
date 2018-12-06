import Http from './Http';

/**
 * Class to make operations to the Section entity
 */
class Section extends Http {
    constructor() {
        super();
        this.entityPath = '/api/services/app/Section';
    }

    /**
     * Request for the information for a section
     *
     * @param {String} UserId   Id for the user
     *
     * @return {Promise}        Http Response
     */
    get(sectionId) {
        const path = `${this.entityPath}/Get`;
        const params = { Id: sectionId };
        return this.request(path, this.methods.get, params);
    }

    /**
     * Request for the information for all the sections
     *
     * @return {Promise}        Http Response
     */
    getAll() {
        const path = `${this.entityPath}/GetAll`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Create a new section
     * @param {Object} data   Data to create a section
     *
     * @return {Promise}        Http Response
     */
    create(data) {
        const path = `${this.entityPath}/Create`;
        return this.request(path, this.methods.post, data);
    }

    /**
     * Create a new section
     * @param {Object} data   Data to create a section
     *
     * @return {Promise}        Http Response
     */
    update(data) {
        const path = `${this.entityPath}/Update`;
        return this.request(path, this.methods.put, data);
    }

    /**
     * Delete a new section
     * @param {Object} data   Data to delete a section
     *
     * @return {Promise}        Http Response
     */
    delete(data) {
        const path = `${this.entityPath}/Delete`;
        return this.request(path, this.methods.delete, data);
    }
}

export default Section;
