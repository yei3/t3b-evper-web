import axios from 'axios';
import authService from '../../services/auth';

/**
 * Simple class to make synchronous Http request
 */
class HttpRequest {
    constructor() {
        this.api_base = process.env.VUE_APP_API_URL;
        this.methods = {
            get: 'get',
            post: 'post',
            put: 'put',
            patch: 'patch',
            delete: 'delete',
        };
    }

    /**
     * Send a specific request to 3B-Evaluation service
     * @param  {String} path [End-Point form the APIREST]
     * @param  {String} method   [Http method]
     * @param  {Object} params   [Request data]
     * @return {Promise}         [Http Response]
     */
    request(path, method, params) {
        const options = {
            method,
            baseURL: this.api_base,
            url: path,
            headers: {
                'Abp.TenantId': 1,
            },
        };

        const accessToken = authService.getAccessToken();
        if (accessToken) {
            options.headers.authorization = `Bearer ${accessToken}`;
        }
        if (method === this.methods.get || method === this.methods.delete) {
            options.params = params;
        } else if (method !== this.methods.delete) {
            options.data = params;
        }
        return axios(options);
    }
}

export default HttpRequest;
