/**
 * Sign up request
 * @summary
 * Represents a sign-up request
 */
export class SignUpRequest {
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