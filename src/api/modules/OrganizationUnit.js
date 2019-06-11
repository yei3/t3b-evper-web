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
}

export default OrganizationUnit;
