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
     * @param {String} binnacleId   Id for the Binnacle
     *
     * @return {Promise}        Http Response
     */
    getBinnacle(binnacleId) {
        const path = `${this.entityPath}/Get`;
        return this.request(path, this.methods.get, {
            $qs: { evaluationId },
        });
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
