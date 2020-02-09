import { isAdmin, isSupervisor } from "../../../src/utils/check-permissions";

const mockedData = {
    firstUserRoles: ["ADMIN", "SUPERVISOR"],
    secondUserRoles: ["SUPERVISOR", "ADMINISTRATOR"],
    thirdUserRoles: ["COLLABORATOR"],
};

test("Should return true if user has the Admin role", () => {
    const result = isAdmin(mockedData.firstUserRoles);

    expect(result).toBeTruthy();
});

test("Should return true if user has the Supervisor role", () => {
    const result = isSupervisor(mockedData.secondUserRoles);

    expect(result).toBeTruthy();
});

test("Should return false if user is not Admin", () => {
    const result = isAdmin(mockedData.thirdUserRoles);

    expect(result).toBeFalsy();
});

test("Should return false if user is not Supervisor", () => {
    const result = isAdmin(mockedData.thirdUserRoles);

    expect(result).toBeFalsy();
});
