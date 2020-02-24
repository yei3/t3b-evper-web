/**
 * Show a notification with a custom message
 *
 * @param {Object} vm Vue component instance
 * @param {String} message A string with the custom message
 * @param {Integer} time Notification expiring time in seconds
 */
export default (vm, message, time = 10) => {
    vm.$message.success(message, time);
};
