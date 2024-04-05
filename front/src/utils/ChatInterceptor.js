/**
 * This class intercepts WebSocket messages and reacts on them
 */

import { Chat } from './Chat';

export const ChatInterceptor = (() => {

    let instance;

    return class ChatInterceptor {

        constructor() {
            if (instance) return instance;

            this.api = {
                pull: (self) => {
                    new Chat().api.pull(self.user);
                },
                setUser: (self, body) => {
                    self.user = body.user;
                    localStorage.setItem('user', JSON.stringify(body.user));
                    if (self.userList.length) {
                        self.userList = self.userList.filter((user) => user.id != self.user.id);
                    }
                },
                setUserList: (self, body) => {
                    if (self.user) {
                        self.userList = body.users.filter((user) => user.id != self.user.id);
                    }
                }
            }

            instance = this;
        }
    }
})()