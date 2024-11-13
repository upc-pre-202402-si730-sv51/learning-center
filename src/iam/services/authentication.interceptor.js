import {useAuthenticationStore} from "./authentication.store.js";

/**
 * Interceptor to add authentication token to the request header
 * @summary
 * This interceptor is used to add the authentication token to the request header.
 * @param config - Axios request configuration
 * @returns {*}
 */
export const authenticationInterceptor = (config) => {
    const authenticationStore = useAuthenticationStore();
    const isSignedIn = authenticationStore.isSignedIn;
    if (isSignedIn) {
        config.headers.Authorization = `Bearer ${authenticationStore.currentToken}`;
        console.log(config);
    }
    return config;
}