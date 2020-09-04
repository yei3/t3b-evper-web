import searchArea from "@/utils/filter-area";

const mockedData = {
    areas: [
        {
            displayName: "PUEBLA - SISTEMAS",
            code: "00002.00002",
            parentId: 10,
            organizationUnitUsers: null,
            isSalesArea: false,
            id: 12,
        },
        {
            displayName: "PUE - OPERACIONES",
            code: "00002.00003",
            parentId: 10,
            organizationUnitUsers: null,
            isSalesArea: false,
            id: 72,
        },
        {
            displayName: "PUE - RECURSOS HUMANOS",
            code: "00002.00004",
            parentId: 10,
            organizationUnitUsers: null,
            isSalesArea: false,
            id: 73,
        },
    ],
    userAreaCode: "00002.00004",
};

test("Should return the current user Area given the areaCode", () => {
    const area = searchArea(mockedData.userAreaCode, mockedData.areas);

    expect(area).toEqual(mockedData.areas[2]);
});
