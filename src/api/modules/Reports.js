import Http from './Http';

/**
 * Class to make operations to the Reports entity
 */
class Reports extends Http {
    constructor() {
        super();
        this.entityPath = '/api/services/app/EvaluationReport';
    }

    /**
     * Request for the information for a User Reports
     *
     * @return {Promise}        Http Response
    **/
    getCollaboratorReport() {
        const path = `${this.entityPath}/GetEvaluationCollaboratorResults`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Request for the information for a User Reports
     *
     * @return {Promise}        Http Response
    **/
    getCollaboratorObjectivesReport() {
        const path = `${this.entityPath}/GetCollaboratorObjectivesReport`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Request for the information for a User Reports
     *
     * @return {Promise}        Http Response
    **/
    getCollaboratorCompetencesReport() {
        const path = `${this.entityPath}/GetCollaboratorCompetencesReport`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Request for the information for a User Reports
     *
     * @return {Promise}        Http Response
    **/
    GetCollaboratorEvaluationComparision(
        currentTemplateId,
        currentTerm,
        currrentDays,
        beforeTemplateId,
        beforeTerm,
        beforeDays,
    ) {
        const path = `${this.entityPath}/GetCollaboratorEvaluationComparision`;
        const params = {
            LeftEvaluationTemplateId: currentTemplateId,
            LeftEvaluationTerm: currentTerm,
            LeftEvaluationDayOfYear: currrentDays,
            RightEvaluationTemplateId: beforeTemplateId,
            RightEvaluationTerm: beforeTerm,
            RightEvaluationYear: beforeDays,
        };
        return this.request(path, this.methods.get, params);
    }

    /**
     * Request for the information for a User Reports
     *
     * @return {Promise}        Http Response
    * */
    getSupervisorReports() {
        const path = `${this.entityPath}/GetEvaluationResults`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Request for the information for a User Reports Details
     *
     * @return {Promise}        Http Response
     */
    getReportsDeatails() {
        const path = `${this.entityPath}/GetEvaluationResultDetail`;
        return this.request(path, this.methods.get, {});
    }
}

export default Reports;
