import Auth from './modules/Auth';
import User from './modules/User';
import Account from './modules/Account';
import Session from './modules/Session';

/**
 * Expose all the resources calls in a single client
 */
class Client3B {
    constructor() {
        this.auth = new Auth();
        this.user = new User();
        this.account = new Account();
        this.session = new Session();
    }
}

export default new Client3B();
