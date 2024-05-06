const BACKEND_URL = process.env.VUE_APP_BACKEND_URL_CLIENT;

const request = async (url, params, method) => {
    let headers = {
        'Content-Type': 'application/json'
    };

    const initial = {
        method,
        headers,
        mode: "cors",
        credentials: "include"
    }

    console.log(initial);

    if (localStorage.getItem('apiToken')) initial.headers['X-Api-Token'] = localStorage.getItem('apiToken'); 
    if (method != 'GET' && method != 'HEAD') initial.body = JSON.stringify(params);

    return fetch(`${BACKEND_URL}${url}`, initial).then(async (response) => { 
        if (response.ok) return response.json();
        else {
            // eslint-disable-next-line no-debugger
            debugger;
            if (response.status == 401) {
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
                    console.log(response);
                    localStorage.setItem('user', JSON.stringify(response));
                    resolve(response);
                });
            });
    },

    getUserProfile(userId) {
        return new Promise((resolve) => {
            request(`/user/${userId}`, {}, 'GET')
                .then((response) => resolve(response));
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