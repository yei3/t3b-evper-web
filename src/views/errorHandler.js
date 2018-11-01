/**
 * Show a notification with the message error
 * @param {Object} vm Vue component instance
 * @param {Error | String} error A Object error or string with the error
 */
export default ((vm, error) => {
    const time = 10;
    console.log(error);
    if (error.validationErrors) {
        error.validationErrors.forEach((err) => {
            vm.$message.error(err.message, time);
        });
    } else if (error.details) {
        vm.$message.error(error.details, time);
    } else if (error.message) {
        vm.$message.error(error.message, time);
    } else {
        vm.$message.error(error, time);
    }
});
