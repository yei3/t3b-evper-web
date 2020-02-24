const ROLES = {
    ADMINISTRATOR: "Administrator",
    SUPERVISOR: "Supervisor",
    COLLABORATOR: "Collaborator",
};

/**
 * Save the auth data into the local storage
 * @param {Object} data Auth data
 */
function storeAuthData(data) {
    const {
        accessToken, expireInSeconds, userId, isFirstTimeLongin,
    } = data;
    const expiration = new Date();
    expiration.setUTCSeconds(expiration.getUTCSeconds() + expireInSeconds);
    localStorage.setItem(
        "auth",
        JSON.stringify({
            userId,
            accessToken,
            expiration,
            isFirstTimeLongin,
        }),
    );
}

/**
 * Store the current role for the user
 * @param {String} role
 */
function setCurrentRole(role) {
    localStorage.setItem("user_role", role);
}

/**
 * Returns the current role for the user
 *
 * @returns {String} User role
 */
function getCurrentRole() {
    return localStorage.getItem("user_role");
}

/**
 * Store the user information
 *
 * @param {Object} data User information
 */
function storeUserData(data) {
    localStorage.setItem("user", JSON.stringify(data));
    const roles = data.roles.reduce((_obj, item) => {
        const obj = _obj;
        obj[item] = true;
        return obj;
    }, {});
    if (ROLES.COLLABORATOR in roles) {
        setCurrentRole(ROLES.COLLABORATOR);
    } else if (ROLES.SUPERVISOR in roles) {
        setCurrentRole(ROLES.SUPERVISOR);
    } else if (ROLES.Administrator in roles) {
        setCurrentRole(ROLES.Administrator);
    } else {
        setCurrentRole(data.roles[0]);
    }
}

/**
 * Returns the user information
 *
3 * @returns {Object} User data
 */
function getUserData() {
    return JSON.parse(localStorage.getItem("user") || "{}");
}

/**
 * Returns the authentication data
 *
 * @returns {Object} Authentication data
 */
function getAuthData() {
    return JSON.parse(localStorage.getItem("auth") || "{}");
}

/**
 * Returns the accessToken
 *
 * @returns {String} accessToken
 */
function getAccessToken() {
    const auth = getAuthData();
    return auth.accessToken;
}

/**
 * Returns True if the accessToken is not expired
 */
function validateAccessToken() {
    const now = new Date();
    const auth = getAuthData();

    if (!auth.expiration) {
        return false;
    }

    auth.expiration = new Date(auth.expiration);
    if (auth.expiration <= now) {
        return false;
    }

    return true;
}

/**
 * Remove the auth information
 */
function removeAuthData() {
    localStorage.removeItem("auth");
}

/**
 * Remove the user information
 */
function removeUserData() {
    localStorage.removeItem("user");
}

export default {
    storeAuthData,
    storeUserData,
    getAuthData,
    getUserData,
    removeAuthData,
    removeUserData,
    validateAccessToken,
    getAccessToken,
    setCurrentRole,
    getCurrentRole,
    ROLES,
};
