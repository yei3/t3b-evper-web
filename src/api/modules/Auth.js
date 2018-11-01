import Http from './Http';

/**
 * Class to make Auth operations
 */
class Auth extends Http {
    constructor() {
        super();
        this.entityPath = '/api/TokenAuth';
    }

    /**
     * Request for authentication token
     * @param  {String} data    Data for authetication
     * @return {Promise}        Http Response
     */
    authenticate(data) {
        const path = `${this.entityPath}/Authenticate`;
        return this.request(path, this.methods.post, data);
    }
}

export default Auth;
