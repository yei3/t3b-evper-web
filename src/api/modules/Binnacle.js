import Http from './Http';

/**
 * Class to make operations to the Binnacle entity
 */
class Binnacle extends Http {
    constructor() {
        super();
        this.entityPath = '/api/services/app/Binnacle';
    }

    /**
     * Request for the information for a Binnacle
     *
     * @param {Object} data   Id for the Binnacle
     *
     * @return {Promise}        Http Response
     */
    getBinnacle(data) {
        const path = `${this.entityPath}/GetAll`;
        return this.request(path, this.methods.get, data);
    }

    /**
     * Request for the information for a Create a msg
     *
     * @param {Object} data     Data to create a msg
     *
     * @return {Promise}        Http Response
     */
    createMessage(data) {
        const path = `${this.entityPath}/Create`;
        return this.request(path, this.methods.post, data);
    }
}

export default Binnacle;
