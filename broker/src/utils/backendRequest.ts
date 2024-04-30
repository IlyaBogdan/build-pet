import fetch from 'node-fetch';
var Storage = require('node-storage');

const store = new Storage('./store.json');

const BACKEND_URL: String = 'http://127.0.0.1:8000/api/broker';
const BROKER_TOKEN: String|null = store.get('access_token');

const request = (endpoint: String, data: any, method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH') => {
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