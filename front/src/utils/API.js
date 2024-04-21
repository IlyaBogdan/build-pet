const BACKEND_URL = 'http://127.0.0.1:8000/api';

const request = async (url, params, method) => {
    return fetch(`${BACKEND_URL}${url}`, {
        body: JSON.stringify(params),
        method,
        mode: "no-cors",
        credentials: "include"
    }).then(async (response) => { 
        if (response.ok) return response.json();
        else {
            if (response.status == 401) {
                localStorage.removeItem('apiToken');
                window.location.href = '/sign-in';
            }
            throw await response.json();
        }
    });
}

export const API = {
    
    login(email, password) {
        return request('/auth/login', { email, password }, 'POST')
            .then((response) => {
                if (response.authenticated) localStorage.setItem('apiToken', response.authenticated);
                else throw [response.error];
            });
    },

    /**
     * 
     * @param { email: string, password: string, first_name: string, last_name?: string} data 
     * @returns 
     */
    signUp(data) {
        return request('/auth/sign-up', data, 'POST')
            .then((response) => {
                if (response.authenticated) localStorage.setItem('apiToken', response.authenticated);
                else throw [response.error];
            });
    },

    logout() {

    }
}