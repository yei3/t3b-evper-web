import Http from "./Http";

/**
 * Class to make operations to the Reports entity
 */
class Reports extends Http {
    constructor() {
        super();
        this.entityPath = "/api/services/app/EvaluationReport";
    }

    /*
     * Request for the Objectives for a current logged User
     *
     * @return {Promise}        Http Response
     */
    getCollaboratorObjectivesReport() {
        const path = `${this.entityPath}/GetCollaboratorObjectivesReport`;
        return this.request(path, this.methods.get, {});
    }

    /*
     * Request for the Competences for a current logged User
     *
     * @return {Promise}        Http Response
     */
    getCollaboratorCompetencesReport(period) {
        const path = `${this.entityPath}/GetCollaboratorCompetencesReport`;
        return this.request(path, this.methods.get, { period });
    }

    /*
     * Request for the information for a User Reports by Id
     *
     * @param {Object} data   Id for the user
     *
     * @return {Promise}        Http Response
     */
    getCollaboratorObjectivesReportById(data) {
        const path = `${this.entityPath}/GetCollaboratorObjectivesReportById`;
        return this.request(path, this.methods.get, data);
    }

    /*
     * Request for the Objectives report
     *
     * @return {Promise}        Http Response
     */
    getAdminObjectivesReport(data) {
        const path = `${this.entityPath}/GetAdministratorObjectivesReport`;
        return this.request(path, this.methods.get, data);
    }

    /*
     * Request for the Capabilities report
     *
     * @return {Promise}        Http Response
     */
    getAdminCapabilitiesReport(data) {
        const path = `${this.entityPath}/GetAdministratorCapabilitiesReport`;
        return this.request(path, this.methods.get, data);
    }

    /*
     * Request for the Objectives for a current logged User
     *
     * @return {Promise}        Http Response
     */
    GetCollaboratorObjectivesAccomplishmentReport() {
        const path = `${this.entityPath}/GetCollaboratorObjectivesAccomplishmentReport`;
        return this.request(path, this.methods.get, {});
    }
}

export default Reports;
