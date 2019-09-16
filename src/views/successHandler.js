/**
 * Show a notification with a custom message
 * @param {Object} vm Vue component instance
 * @param {String} message A string with the custom message
 * @param {Integer} time Notification expiring time
 */
export default (vm, message, time) => {
    vm.$message.success(message, time);
};
