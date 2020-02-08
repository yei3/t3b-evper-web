import { isAdmin, isCollaborator } from "../../../src/utils/check-permissions";

const mockedData = {
    firstUserRoles: ["ADMIN", "SUPERVISOR"],
    secondUserRoles: ["COLLABORATOR", "ADMINISTRATOR"],
    thirdUserRoles: ["SUPERVISOR"],
};

test("Should return true if user has the Admin role", () => {
    const result = isAdmin(mockedData.firstUserRoles);

    expect(result).toBeTruthy();
});

test("Should return true if user has the Collaborator role", () => {
    const result = isCollaborator(mockedData.secondUserRoles);

    expect(result).toBeTruthy();
});

test("Should return false if user is not Admin", () => {
    const result = isAdmin(mockedData.thirdUserRoles);

    expect(result).toBeFalsy();
});

test("Should return false if user is not Collaborator", () => {
    const result = isAdmin(mockedData.thirdUserRoles);

    expect(result).toBeFalsy();
});
