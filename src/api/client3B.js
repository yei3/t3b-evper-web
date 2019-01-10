import Auth from './modules/Auth';
import User from './modules/User';
import Account from './modules/Account';
import Binnacle from './modules/Binnacle';
import Session from './modules/Session';
import Evaluation from './modules/Evaluation';
import Dashboard from './modules/Dashboard';
import Format from './modules/EvaluationTemplate';
import Section from './modules/Section';
import Question from './modules/Question';
import Reports from './modules/Reports';
import OrganizationUnit from './modules/OrganizationUnit';
import Notifications from './modules/Notifications';


/**
 * Expose all the resources calls in a single client
 */
class Client3B {
    constructor() {
        this.auth = new Auth();
        this.user = new User();
        this.account = new Account();
        this.binnacle = new Binnacle();
        this.session = new Session();
        this.evaluation = new Evaluation();
        this.format = new Format();
        this.question = new Question();
        this.section = new Section();
        this.dashboard = new Dashboard();
        this.report = new Reports();
        this.organizationUnit = new OrganizationUnit();
        this.notifications = new Notifications();
    }
}

export default new Client3B();
