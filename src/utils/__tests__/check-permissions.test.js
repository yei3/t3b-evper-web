import { isAdmin, isCollaborator } from "../check-permissions";

const mockedData = {
    firstUserRoles: ["admin", "supervisor"],
    secondUserRoles: ["collaborator", "administrator"],
    thirdUserRoles: ["supervisor"],
};

test("Should return true if user has the Admin role", () => {
    const result = isAdmin(mockedData.firstUserRoles);

    expect(result).toBe(true);
});

test("Should return true if user has the Collaborator role", () => {
    const result = isCollaborator(mockedData.secondUserRoles);

    expect(result).toBe(true);
});

test("Should return false if user is not Admin", () => {
    const result = isAdmin(mockedData.thirdUserRoles);

    expect(result).toBe(false);
});

test("Should return false if user is not Collaborator", () => {
    const result = isAdmin(mockedData.thirdUserRoles);

    expect(result).toBe(false);
});
