import Http from "./Http";

/**
 * Class to make operations to the OrganizationUnit entity
 */
class OrganizationUnit extends Http {
    constructor() {
        super();
        this.entityPath = "/api/services/app/OrganizationUnit";
    }

    /**
     * Request for the information for AllRegionsOrganizationUnits
     *
     * @return {Promise}        Http Response
     */
    getOrganigram() {
        const path = `${this.entityPath}/GetAllOrganizationUnits`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Request for the information for AllRegionsOrganizationUnits
     *
     * @return {Promise}        Http Response
     */
    getAllRegions() {
        const path = `${this.entityPath}/GetAllRegionsOrganizationUnits`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Request for the information for AllRegionsOrganizationUnits
     *
     * @return {Promise}        Http Response
     */
    getAllAreas() {
        const path = `${this.entityPath}/GetAllAreaOrganizationUnits`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Request for the information for AllRegionsOrganizationUnits
     *
     * @return {Promise}        Http Response
     */
    getMyRegion() {
        const path = `${this.entityPath}/GetMyRegionOrganizationUnit`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Request for the information for GetRegionsOrganizationUnitTree
     *
     * @return {Promise}        Http Response
     */
    getRegionsTree() {
        const path = `${this.entityPath}/GetRegionsOrganizationUnitTree`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Request for the information for GetAreasOrganizationUnitTree
     *
     * @return {Promise}        Http Response
     */
    getAreasTree() {
        const path = `${this.entityPath}/GetAreasOrganizationUnitTree`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Request for the information for GetUserJobDescriptionTree
     *
     * @return {Promise}        Http Response
     */
    getJobsTree() {
        const path = `${this.entityPath}/GetUserJobDescriptionTree`;
        return this.request(path, this.methods.get, {});
    }

    /**
     * Request for the information for getUserTree
     *
     * @return {Promise}        Http Response
     */
    getUserTree() {
        const path = `${this.entityPath}/getUserTree`;
        return this.request(path, this.methods.get, {});
    }
}

export default OrganizationUnit;
