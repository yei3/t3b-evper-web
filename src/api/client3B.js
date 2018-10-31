import Auth from './Auth';

/**
 * Expose all the resources calls in a single client
 */
class Client3B {
    constructor() {
        this.auth = new Auth();
    }
}

export default new Client3B();
