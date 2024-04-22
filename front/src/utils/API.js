const BACKEND_URL = 'http://127.0.0.1:8000/api';

const request = async (url, params, method) => {
    let headers = {
        'Content-Type': 'application/json'
    };
    if (localStorage.getItem('apiToken') != null) headers['X-Api-Token'] = localStorage.getItem('apiToken');

    console.log(headers);

    return fetch(`${BACKEND_URL}${url}`, {
        body: JSON.stringify(params),
        method,
        headers,
        mode: "cors",
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
    
    /**
     * Login action
     * @param {string} email
     * @param {string} password
     */
    login(email, password) {
        return new Promise((resolve, reject) => {
            request('/auth/login', { email, password }, 'POST')
                .then((response) => {
                    if (response.authenticated) {
                        localStorage.setItem('apiToken', response.authenticated);
                        resolve();
                    } else reject(response.errors)
                });
        });
        
    },

    /**
     * Action for registration new user
     * @param { {email: string, password: string, first_name: string, last_name?: string } } data 
     */
    signUp(data) {
        return new Promise((resolve, reject) => {
            request('/auth/sign-up', data, 'POST')
                .then((response) => {
                    if (response.authenticated) {
                        localStorage.setItem('apiToken', response.authenticated);
                        resolve();
                    } else reject(response.errors)
                });
        });
    },

    /**
     * Logout action
     */
    logout() {
        return request('/auth/logout', {}, 'POST')
            .then(() => localStorage.removeItem('apiToken'));
    }
}