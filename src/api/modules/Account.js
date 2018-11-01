import Http from './Http';

/**
 * Class to make operations to the Account entity
 */
class Account extends Http {
    constructor() {
        super();
        this.entityPath = '/api/services/app/Account';
    }

    /**
     * Request for the information for the logged Account
     * @param {String} AccountId   Id for the Account
     *
     * @return {Promise}        Http Response
     */
    firstTimeLogin(data) {
        const path = `${this.entityPath}/FirstTimeLoginAsync`;
        return this.request(path, this.methods.post, data);
    }
}

export default Account;
