import moment from "moment";

/**
 * Check if the dates are 1 day apart
 * @param {Date} storedDate
 */
function hasMoreThanOneDay(storedDate) {
    const stored = moment(storedDate);
    const actualDate = moment(new Date());
    return actualDate.diff(stored, "days") >= 1;
}

/**
 * Retrieve the last login date from the local storage
 */
function getLastLoginDate() {
    return localStorage.getItem("lastLoginDate");
}

/**
 * Save the last login date into the local storage
 */
function storeLastLoginDate() {
    const storedDate = getLastLoginDate();
    if (storedDate !== null && !hasMoreThanOneDay(storedDate)) {
        return;
    }
    localStorage.setItem("lastLoginDate", new Date());
}

export default {
    storeLastLoginDate,
    getLastLoginDate,
    hasMoreThanOneDay,
};
