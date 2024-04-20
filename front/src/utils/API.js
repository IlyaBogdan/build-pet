const BACKEND_URL = 'http://127.0.0.1:8000/api';

const request = async (url, params, method) => {
    return fetch(`${BACKEND_URL}${url}`, {
        body: JSON.stringify(params),
        method,
        headers: {

        },
        credentials: "include"
    }).then(response => response.json());
}

export const API = {
    
    login(email, password) {
        return request('/auth/login', { email, password }, 'POST');
    },

    signUp(email, password) {
        return request('/auth/sign-up', { email, password }, 'POST');
    },

    logout() {

    }
}