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
    GetCollaboratorObjectivesSalesReport() {
        const path = `${this.entityPath}/GetCollaboratorObjectivesSalesReport`;
        return this.request(path, this.methods.get, {});
    }

    /*
     * Request for the Objectives for a current logged User
     *
     * @return {Promise}        Http Response
     */
    GetCollaboratorCapabilitiesSalesReport(period) {
        const path = `${this.entityPath}/GetCollaboratorCapabilitiesSalesReport`;
        return this.request(path, this.methods.get, { period });
    }

    /*
     * Data report using GetEvaluatorObjectivesReport
     *
     * @return {Promise}        Http Response
     */
    GetEvaluatorObjectivesReport(data) {
        const path = `${this.entityPath}/GetEvaluatorObjectivesReport`;
        return this.request(path, this.methods.get, data);
    }

    /*
     * Data report using GetEvaluatorCapabilitiesReport
     *
     * @return {Promise}        Http Response
     */
    GetEvaluatorCapabilitiesReport(data) {
        const path = `${this.entityPath}/GetEvaluatorCapabilitiesReport`;
        return this.request(path, this.methods.get, data);
    }

    /*
     * Data report using GetEvaluatorCapabilitiesReport
     *
     * @return {Promise}        Http Response
     */
    GetEvaluationEmployeeData(data) {
        const path = `${this.entityPath}/GetEvaluationEmployeeData`;
        return this.request(path, this.methods.get, data);
    }

    /*
     * Data report using GetEvaluatorObjectivesSalesReport
     *
     * @return {Promise}        Http Response
     */
    GetEvaluatorObjectivesSalesReport(data) {
        const path = `${this.entityPath}/GetEvaluatorObjectivesSalesReport`;
        return this.request(path, this.methods.get, data);
    }

    /*
     * Data report using GetEvaluatorCapabilitiesSalesReport
     *
     * @return {Promise}        Http Response
     */
    GetEvaluatorCapabilitiesSalesReport(data) {
        const path = `${this.entityPath}/GetEvaluatorCapabilitiesSalesReport`;
        return this.request(path, this.methods.get, data);
    }
}

export default Reports;
