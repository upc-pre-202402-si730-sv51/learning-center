import http from "../../shared/services/http-common.js";

/**
 * Service class to call authentication APIs
 * @summary
 * This class is responsible to call authentication APIs.
 * It contains methods to sign-in and sign-up.
 */
export class AuthenticationService {
    /**
     * Sign in
     * @summary
     * This method calls the sign-in API.
     * @param signInRequest {SignInRequest} - The sign-in request
     * @returns {Promise<http.AxiosResponse<SignInResponse>>} - The sign-in response
     */
    signIn(signInRequest) {
        return http.post("/authentication/sign-in", signInRequest);
    }

    /**
     * Sign up
     * @summary
     * This method calls the sign-up API.
     * @param signUpRequest {SignUpRequest} - The sign-up request
     * @returns {Promise<http.AxiosResponse<SignUpResponse>>} - The sign-up response
     */
    signUp(signUpRequest) {
        return http.post("/authentication/sign-up", signUpRequest);
    }
}