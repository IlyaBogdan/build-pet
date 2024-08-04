import fetch from 'node-fetch';
var Storage = require('node-storage');

const store = new Storage('./store.json');

const BACKEND_URL: string = `${process.env.BACKEND_URL}/api/broker`;
const BROKER_TOKEN: string|null = store.get('access_token');

/**
 * Allowed request methods
 */
enum ERequestMethods {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH'
} 

/**
 * Request to backend from broker
 * 
 * @param {string} endpoint endpoint for backend request
 * @param {any} data request body
 * @param { ERequestMethods } method request method
 * @returns 
 */
const request = async (endpoint: string, data: any, method: ERequestMethods) => {
    let requestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (BROKER_TOKEN) {
        requestInit.headers['X-Broker-Token'] = BROKER_TOKEN;
    }
    if (['GET', 'HEAD'].indexOf(method) == -1) {
        requestInit['body'] = JSON.stringify(data);
    }

    return fetch(`${BACKEND_URL}${endpoint}`, requestInit)
        .then((response) => {
            return response.json();
        })
}

export { request };