import Http from './Http';

/**
 * Class to make operations to the Notifications entity
 */
class Dashboard extends Http {
    constructor() {
        super();
        this.entityPath = '/api/services/app/Notifications';
    }

    /**
     * Request for the information for Notifications
     *
     * @return {Promise}        Http Response
     */
    getAllNotifications() {
        const path = `${this.entityPath}/getAll`;
        return this.request(path, this.methods.get, {});
    }
    /**
     * Request for the information for a count of notifications
     *
     * @return {Promise}        Http Response
     */
    getNotifCount() {
        const path = `${this.entityPath}/getNotifCount`;
        return this.request(path, this.methods.get, {});
    }
}

export default Dashboard;
