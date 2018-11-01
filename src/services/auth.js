/**
 * Save the auth data into the local storage
 * @param {Object} data Auth data
 */
function storeAuthData(data) {
    const {
        accessToken,
        expireInSeconds,
        userId,
        isFirstTimeLongin,
    } = data;
    const expiration = new Date();
    expiration.setUTCSeconds(expiration.getUTCSeconds() + expireInSeconds);
    localStorage.setItem('auth', JSON.stringify({
        userId,
        accessToken,
        expiration,
        isFirstTimeLongin,
    }));
}

/**
 * Store the user information
 *
 * @param {Object} data User information
 */
function storeUserData(data) {
    localStorage.setItem('user', JSON.stringify(data));
    console.log('stored', data);
}

/**
 * Returns the user information
 */
function getUserData() {
    return JSON.parse(localStorage.getItem('user') || '{}');
}

/**
 * Returns the authentication data
 *
 * @returns {Object} Authentication data
 */
function getAuthData() {
    return JSON.parse(localStorage.getItem('auth') || '{}');
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
    const auth = getAuthData();
    const now = new Date();
    console.log('auth', auth);
    if (!auth.expiration) {
        return false;
    }

    if (auth.expiration >= now) {
        return false;
    }

    return true;
}


/**
 * Remove the auth information
 */
function removeAuthData() {
    localStorage.removeItem('auth');
}


/**
 * Remove the user information
 */
function removeUserData() {
    localStorage.removeItem('user');
}


const ROLES = {
    ADMINISTRATOR: 'Admin',
    SUPERVISOR: 'Supervisor',
    COLLABORATOR: 'Collaborator',
};

export default {
    storeAuthData,
    storeUserData,
    getAuthData,
    getUserData,
    removeAuthData,
    removeUserData,
    validateAccessToken,
    getAccessToken,
    ROLES,
};
