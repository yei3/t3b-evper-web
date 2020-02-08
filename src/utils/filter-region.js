const searchRegion = (userRegion, regions) => {
    const [resultRegion] = regions.filter((region) => region.displayName === userRegion);

    return resultRegion.code;
};

export default searchRegion;
