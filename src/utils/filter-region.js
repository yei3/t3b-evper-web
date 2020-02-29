/**
 * Returns the region given the user's region code
 *
 * @typedef {Region} - Region Object shape
 * @prop {string} - displayName
 * @prop {string} - code
 * @prop {string} - parentId
 * @prop {array} - organizationUnitUsers
 * @prop {boolean} - isSalesArea
 * @prop {number} - id
 *
 * @param {string} userRegion - User's region code
 * @param {Region[]} regions - Array of region Objects
 *
 * @return {Region}
 */
const searchRegion = (userRegion, regions) => {
    const [resultRegion] = regions.filter((region) => region.code === userRegion);

    return resultRegion;
};

export default searchRegion;
