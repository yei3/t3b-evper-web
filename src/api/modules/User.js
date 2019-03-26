import Http from './Http';

/**
 * Class to make operations to the User entity
 */
class User extends Http {
    constructor() {
        super();
        this.entityPath = '/api/services/app/User';
    }

    /**
     * Request for the information for the logged user
     *
     * @param {String} UserId   Id for the user
     *
     * @return {Promise}        Http Response
     */
    get(userId) {
        const path = `${this.entityPath}/Get`;
        const params = { Id: userId };
        return this.request(path, this.methods.get, params);
    }

    /**
     * Request for the information for the logged user
     *
     * @return {Promise}        Http Response
     */
    getAll() {
        const path = `${this.entityPath}/GetAll`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Request for update Scholarship and E-mail for the logged Account
     *
     * @return {Promise}        Http Response
     */
    updateScholarshipAndEmail(data) {
        const path = `${this.entityPath}/UpdateScholarshipAndEmailAddress`;
        return this.request(path, this.methods.put, data);
    }

    recoverPassword(data) {
        const path = `${this.entityPath}/RecoverPassword`;
        return this.request(path, this.methods.post, data);
    }

    /**
     * Request for the information for AllEmployments
     *
     * @return {Promise}        Http Response
     */
    getAllEmployments() {
        const path = `${this.entityPath}/GetAllJobDescriptions`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Request for the information for All Collaborators
     *
     * @return {Promise}        Http Response
     */
    getCollaborators() {
        const path = `${this.entityPath}/GetCollaborators`;
        return this.request(path, this.methods.get, {});
    }
}

export default User;
