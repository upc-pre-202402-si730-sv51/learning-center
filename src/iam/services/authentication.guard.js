import {useAuthenticationStore} from "./authentication.store.js";

/**
 * Authentication guard
 * @param to The route we are navigating to
 * @param from The route we are navigating from
 * @param next The callback function to continue the
 * @returns {*}
 */
export const authenticationGuard = (to, from, next) => {
    const authenticationStore = useAuthenticationStore();
    const isAnonymous = !authenticationStore.isSignedIn;
    const publicRoutes = ['/sign-in', '/sign-up', '/about', '/page-not-found'];
    const routeRequiresToBeAuthenticated = !publicRoutes.includes(to.path);
    if (isAnonymous && routeRequiresToBeAuthenticated) return next({name: 'sign-in'});
    else next();
}