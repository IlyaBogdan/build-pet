import fetch from 'node-fetch';

const BACKEND_URL: string = 'http://127.0.0.1:8000/api/broker';
const BROKER_TOKEN: string = 'wiegufjimaklslld;anbuobbv';

const request = (endpoint: string, data: any, method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH') => {
    let requestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'X-Broker-Token': BROKER_TOKEN
        },
    };

    if (['GET', 'HEAD'].indexOf(method) == -1) {
        requestInit['body'] = data;
    }

    return fetch(`${BACKEND_URL}${endpoint}`, requestInit).then(async (response) => {
        return response.json();
    })
}

export { request };