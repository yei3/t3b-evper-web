const searchRegion = (userRegion, regions) => {
    const [resultRegion] = regions.filter((region) => region.code === userRegion);

    return resultRegion.code;
};

export default searchRegion;
