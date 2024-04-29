const BACKEND_URL = 'http://127.0.0.1:8000/api';

const request = async (url, params, method) => {
    let headers = {
        'Content-Type': 'application/json',
        'X-Api-Token': localStorage.getItem('apiToken')
    };

    const initial = {
        method,
        headers,
        mode: "cors",
        credentials: "include"
    }

    if (method != 'GET' && method != 'HEAD') initial.body = JSON.stringify(params);

    return fetch(`${BACKEND_URL}${url}`, initial).then(async (response) => { 
        if (response.ok) return response.json();
        else {
            if (response.status == 401) {
                // eslint-disable-next-line no-debugger
                debugger;
                localStorage.removeItem('apiToken');
                localStorage.removeItem('user');
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
            .then(() => { 
                localStorage.removeItem('apiToken');
                localStorage.removeItem('user');
            });
    },

    /**
     * Return info about logined user
     */
    getAuthUserInfo() {
        return new Promise((resolve) => {
            request('/user', {}, 'GET')
                .then((response) => {
                    localStorage.setItem('user', response);
                    resolve();
                });
            });
    },

    /**
     * Update profile avatar
     * @param {String} base64_image
     */
    updateAvatar(base64_image) {
        return new Promise((resolve, reject) => {
            return request('/user/profile', { avatar: base64_image }, 'POST')
                .then((response) => resolve(response))
                .catch((response) => reject(response));
        });
    },

    /**
     * Update profile info
     * @param { {email: string, first_name: string, last_name?: string } } info
     */
    updateProfile(info) {
        return new Promise((resolve, reject) => {
            return request('/user/profile', info, 'POST')
                .then((response) => resolve(response))
                .catch((response) => reject(response));
        });
    }
}