import searchRegion from "../../../src/utils/filter-region";

const mockedData = {
    regions: [
        {
            displayName: "CORPORATIVO",
            code: "00001",
            parentId: null,
            organizationUnitUsers: null,
            isSalesArea: false,
            id: 1,
        },
        {
            displayName: "PUEBLA",
            code: "00002",
            parentId: null,
            organizationUnitUsers: null,
            isSalesArea: false,
            id: 10,
        },
        {
            displayName: "NORTE",
            code: "00003",
            parentId: null,
            organizationUnitUsers: null,
            isSalesArea: false,
            id: 13,
        },
    ],
    userRegionCode: "00003",
};

test("Should return the user's region", () => {
    const region = searchRegion(mockedData.userRegionCode, mockedData.regions);

    expect(region).toEqual(mockedData.regions[2]);
});
