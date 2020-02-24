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
    userRegion: "PUEBLA",
};

test("Should return the region code", () => {
    const regionCode = searchRegion(mockedData.userRegion, mockedData.regions);

    expect(regionCode).toBe("00002");
});
