import Http from "./Http";

/**
 * Class to make operations to the User entity
 */
class User extends Http {
    constructor() {
        super();
        this.entityPath = "/api/services/app/User";
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
     * Update user data
     *
     * @typedef UserData
     * @prop userName {string}
     * @prop name {string}
     * @prop firstLastName {string}
     * @prop secondLastName {string}
     * @prop fullName {string}
     * @prop emailAddress {string}
     * @prop area {string}
     * @prop region {string}
     * @prop immediateSupervisor {string}
     * @prop socialReason {string}
     * @prop reassignDate {string}
     * @prop scholarship {string}
     * @prop roles {string[]}
     * @prop id {number | string}
     *
     * @param {UserData} payload - User data to update
     *
     * @return {Promise} HTTP Response
     */

    update(payload) {
        const path = `${this.entityPath}/UpdateUserExtended`;
        return this.request(path, this.methods.put, payload);
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
     * Get User by user name
     *
     * @param {string} userName - User Name
     *
     * @return {Promise}
     *
     */
    getUserByUserName(employeeNumber) {
        const path = `${this.entityPath}/GetUserExtendedByUserName`;
        return this.request(path, this.methods.get, {
            employeeNumber,
        });
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

    /**
     * Request for the check if is User Sales
     *
     * @return {Promise}        Http Response
     */
    IsUserSalesMan() {
        const path = `${this.entityPath}/IsUserSalesMan`;
        return this.request(path, this.methods.post, {});
    }

    /**
     * Request for the check if is User Sales
     *
     * @return {Promise}        Http Response
     */
    getUsersByArea(data) {
        const path = `${this.entityPath}/GetUsersByArea`;
        return this.request(path, this.methods.get, data);
    }
}

export default User;
