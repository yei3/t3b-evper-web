import Http from "./Http";

/**
 * Class to make operations to the Dashboard entity
 */
class Dashboard extends Http {
    constructor() {
        super();
        this.entityPath = "/api/services/app/Dashboard";
    }

    /**
     * Request for the information for a Collaborator
     *
     * @return {Promise}        Http Response
     */
    getCollaborator() {
        const path = `${this.entityPath}/Collaborator`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Request for the information for a Supervisor
     *
     * @return {Promise}        Http Response
     */
    getSupervisor() {
        const path = `${this.entityPath}/Supervisor`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Request for the information for Evaluations History
     *
     * @return {Promise}        Http Response
     */
    getEvaluationsHistory() {
        const path = `${this.entityPath}/EvaluationsHistory`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Request for the information for a Supervisor History
     *
     * @return {Promise}        Http Response
     */
    getSupervisorHistory() {
        const path = `${this.entityPath}/SupervisorHistory`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Request for the information for a Collaborator
     *
     * @return {Promise}        Http Response
     */
    getCollaboratorHistory() {
        const path = `${this.entityPath}/CollaboratorHistory`;
        return this.request(path, this.methods.get, {});
    }
}

export default Dashboard;
