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

    /**
     * Request for send notifications to multple users
     * @param {Object} data
     *
     * @return {Promise}        Http Response
     */
    publishGeneralMessageToMultipleUsers(data) {
        const path = `${this.entityPath}/Publish_SentGeneralMultipleUserNotification`;
        return this.request(path, this.methods.post, data);
    }

    /**
     * Request for send notifications to boss user
     * @param {Object} data
     *
     * @return {Promise}        Http Response
     */
    sendBossNotification(data) {
        const path = `${this.entityPath}/Publish_SentBossGeneralUserNotification`;
        return this.request(path, this.methods.post, data);
    }

    /**
     * Request for send notifications when occurs a review
     * @param {Object} data
     *
     * @return {Promise}        Http Response
     */
    sendReviewNotification(data) {
        const path = `${this.entityPath}/Publish_SentReviewNotification`;
        return this.request(path, this.methods.post, data);
    }

    /**
     * Request for the information for a count of notifications
     *
     * @return {Promise}        Http Response
     */
    sendBossCloseEvaluationNotification() {
        const path = `${this.entityPath}/Publish_SendBossCloseEvaluationNotification`;
        return this.request(path, this.methods.post, {});
    }

    /**
     * Request for send notifications when occurs a validate of an evaluation
     * @param {Object} data
     *
     * @return {Promise}        Http Response
     */
    sendValidateEvaluationNotification(data) {
        const path = `${this.entityPath}/Publish_SendValidateEvaluationNotification`;
        return this.request(path, this.methods.post, data);
    }

    /**
     * Request for send notifications to multple users
     * @param {Object} data
     *
     * @return {Promise}        Http Response
     */
    publishGeneralMessageToAdminMail(data) {
        const path = `${this.entityPath}/Publish_SentGeneralMessageToAdminMail`;
        return this.request(path, this.methods.post, data);
    }
}

export default Dashboard;
