import { request } from "./backendRequest";
import chatModule from "./chat/chatModule";

const BackendAPI = {
    getUserByToken: (token: String) => {
        return new Promise((resolve, reject) => {
            request(`/user?token=${token}`, {}, 'GET')
                .then((response) => { resolve(response) });
        });
    },
    getUsers: () => {
        return new Promise((resolve, reject) => {
            request(`/user/list`, {}, 'GET')
                .then((response) => { resolve(response) });
        });
    }
};

Object.assign(BackendAPI, chatModule);

export { BackendAPI }