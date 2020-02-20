import { ROLES } from "./constants";

/**
 * Determines if the user has the `admin` role
 *
 * @param {string[]} permissions - Array of permissions
 *
 * @return {bool}
 */
const isAdmin = (permissions) =>
    permissions.filter(
        (permission) => permission === ROLES.ADMINISTRATOR || permission === ROLES.ADMIN,
    ).length > 0;

/**
 * Determines if the user has the `collaborator` role
 *
 * @param {string[]} permissions - Array of permissions
 *
 * @return {bool}
 */
const isSupervisor = (permissions) =>
    permissions.filter((permission) => permission === ROLES.SUPERVISOR).length > 0;

export { isAdmin, isSupervisor };
