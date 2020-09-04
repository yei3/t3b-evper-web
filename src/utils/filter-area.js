/**
 * Returns the area given the user's area code
 *
 * @typedef {Area} - Area Object shape
 * @prop {string} - displayName
 * @prop {string} - code
 * @prop {string} - parentId
 * @prop {array} - organizationUnitUsers
 * @prop {boolean} - isSalesArea
 * @prop {number} - id
 *
 * @param {string} userArea - User's region code
 * @param {Area[]} areas - Array of region Objects
 *
 * @return {Area}
 */
const searchArea = (userArea, areas) => {
    const [resultArea] = areas.filter((area) => area.code === userArea);

    return resultArea;
};

export default searchArea;
