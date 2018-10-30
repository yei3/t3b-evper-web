import Http from './Http';

/**
 * Class to make CRUD Schedule operations
 */
class Auth extends Http {
    constructor() {
        super();
        this.endPointBase = '/api/TokenAuth';
    }

    /**
     * Request for authentication token
     * @param  {String} data    Data for authetication
     * @return {Promise}        Http Response
     */
    authenticate(data) {
        const endPoint = `${this.endPointBase}/Authenticate`;
        return this.request(endPoint, this.methods.post, data);
    }
}

export default Auth;
