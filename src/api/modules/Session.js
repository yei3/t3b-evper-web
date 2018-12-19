import Http from './Http';

/**
 * Class to make operations to the Session entity
 */
class Session extends Http {
    constructor() {
        super();
        this.entityPath = '/api/services/app/Session';
    }

    /**
     * Request for the information for the logged user
     *
     * @return {Promise}        Http Response
     */
    getSession() {
        const path = `${this.entityPath}/GetCurrentLoginInformations`;
        return this.request(path, this.methods.get, {});
    }
}

export default Session;
