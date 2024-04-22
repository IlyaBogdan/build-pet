const BACKEND_URL: string = 'http://127.0.0.1:8000/api/broker';
const BROKER_TOKEN: string = 'wiegufjimaklslld;anbuobbv';

const request = (endpoint: string, data: any, method: 'POST' | 'GET' | 'PUT' | 'DELETE') => {
    return fetch(`${BACKEND_URL}${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'X-Broker-Token': BROKER_TOKEN
        },
        body: data
    }).then(async (response) => {
        return response.json();
    })
}

export { request };