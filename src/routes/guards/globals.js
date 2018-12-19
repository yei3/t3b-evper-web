import authService from '@/services/auth';

/**
 * Validate that the current user can access to the route
 *
 * @param {String} role Role necessay to get access to the route
 */
function beforeEnter(role) {
    return (to, from, next) => {
        // Validate that the user can access to the route
        if (!authService.validateAccessToken()) {
            return next({ name: 'login' });
        }
        // Validate that the current role can access to the route
        const currentRole = authService.getCurrentRole();
        if (currentRole !== role) {
            return next({ name: 'home' });
        }
        // Otherwise continue with the normal navigation
        return next();
    };
}

export default beforeEnter;
