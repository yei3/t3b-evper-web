import axios from 'axios';

/**
 * Simple class to make synchronous Http request
 */
class HttpRequest {
    constructor() {
        this.api_base = process.env.VUE_APP_API_URL;
        this.methods = {
            get: 'get',
            post: 'post',
            pust: 'put',
            patch: 'patch',
            delete: 'delete',
        };
    }

    /**
     * Send a specific request to 3B-Evaluation service
     * @param  {String} endPoint [End-Point form the APIREST]
     * @param  {String} method   [Http method]
     * @param  {Object} params   [Request data]
     * @return {Promise}         [Http Response]
     */
    request(endPoint, method, params) {
        console.log(this.api_base);
        const options = {
            method,
            baseURL: this.api_base,
            url: endPoint,
            headers: {
                // authorization: `Bearer ${process.env.EVALUATION_3B_API_SECRET}`,
            },
        };

        if (method === this.methods.get) {
            options.params = params;
        } else if (method !== this.methods.delete) {
            options.data = params;
        }
        return axios(options);
    }
}

export default HttpRequest;
