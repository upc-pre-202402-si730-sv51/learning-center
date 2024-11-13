/**
 * SignInRequest model
 * @summary
 * Represents a sign-in request
 */
export class SignInRequest {
    /**
     * Constructor
     * @param {string} username - The username
     * @param {string} password - The password
     */
    constructor(username, password) {
        this.username = username;
        this.password = password
    }
}