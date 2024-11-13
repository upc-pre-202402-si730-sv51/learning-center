import {defineStore} from "pinia";
import {AuthenticationService} from "./authentication.service.js";
import {SignInResponse} from "../model/sign-in.response.js";
import {SignUpResponse} from "../model/sign-up.response.js";

const authenticationService = new AuthenticationService();
/**
 * Authentication Store
 * @summary
 * Represents the authentication store
 */
export const useAuthenticationStore = defineStore({
    id: 'authentication',
    state: () => ({ signedIn: false, userId: 0, username: ''}),
    getters: {
        /**
         * Is signed in
         * @param state - The state of the store
         * @returns {boolean} - True if signed in, false otherwise
         */
        isSignedIn: (state) => state['signedIn'],
        /**
         * Current user id
         * @param state - The state of the store
         * @returns {number} - The current user id
         */
        currentUserId: (state) => state['userId'],
        /**
         * Current username
         * @param state - The state of the store
         * @returns {string} - The current username
         */
        currentUsername: (state) => state['username'],
        /**
         * Current token
         * @returns {string} - The current token
         */
        currentToken: () => localStorage.getItem('token')
    },
    actions: {
        /**
         * Sign in
         * @summary
         * This method calls the sign-in API.
         * @param signInRequest {SignInRequest} - The sign-in request
         * @param router - The router
         */
        async signIn(signInRequest, router) {
            authenticationService.signIn(signInRequest)
                .then(response => {
                    let signInResponse = new SignInResponse(response.data.id, response.data.username, response.data.token);
                    this.signedIn = true;
                    this.userId = signInResponse.id;
                    this.username = signInResponse.username;
                    localStorage.setItem('token', signInResponse.token);
                    console.log(signInResponse);
                    router.push({name: 'home'});
                })
                .catch(error => {
                    console.log(error);
                    router.push({name: 'sign-in'});
                });
        },
        /**
         * Sign up
         * @summary
         * This method calls the sign-up API.
         * @param signUpRequest {SignUpRequest} - The sign-up request
         * @param router - The router
         */
        async signUp(signUpRequest, router) {
            authenticationService.signUp(signUpRequest)
                .then(response => {
                    let signUpResponse = new SignUpResponse(response.data.message);
                    router.push({name: 'sign-in'});
                })
                .catch(error => {
                    console.log(error);
                    router.push({name: 'sign-up'});
                });
        },
        /**
         * Sign out
         * @summary
         * This method signs out the user.
         * It clears the token and redirects to the sign-in page.
         * It also sets the signedIn flag to false.
         * @param router - The router
         */
        async signOut(router) {
            this.signedIn = false;
            this.userId = 0;
            this.username = '';
            localStorage.removeItem('token');
            router.push({name: 'sign-in'});
        }
    }
})