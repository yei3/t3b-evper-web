function saveVideoPreference() {
    localStorage.setItem("shouldDisplayVideo", "false");
}

function saveShouldNeverDisplayVideo() {
    localStorage.setItem("shouldNeverDisplayVideo", "true");
}

function getVideoPreference() {
    const shoudlPlayVideo = localStorage.getItem("shouldDisplayVideo");
    if (shoudlPlayVideo == null) {
        return true;
    }

    return false;
}

function getShouldNeverDisplayVideo() {
    const shouldNeverDisplayVideo = localStorage.getItem("shouldNeverDisplayVideo");
    if (shouldNeverDisplayVideo == null) {
        return false;
    }

    return true;
}

export default {
    saveVideoPreference,
    saveShouldNeverDisplayVideo,
    getVideoPreference,
    getShouldNeverDisplayVideo,
};
