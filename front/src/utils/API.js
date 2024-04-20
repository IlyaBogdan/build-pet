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
    
    async login(login, password) {
        return await request('/auth/login', { login, password }, 'POST');
    },

    async signUp(login, password) {
        return await request('/auth/sign-up', { login, password }, 'POST');
    },

    async logout() {

    }
}