/**
 * This class intercepts WebSocket messages and reacts on them
 */

import { WsMessageInterceptor } from '../WsMessageInterceptor';
import { ChatConnection } from './ChatConnection';

export class ChatInterceptor extends WsMessageInterceptor {

    api(self) {
        return {
            pull: () => {
                new ChatConnection().call('pull', { user: self.$store.state.authModule.user });
            },
            setUser: (body) => {
                localStorage.setItem('user', JSON.stringify(body.user));
            },
            setUserList: (body) => {
                const authUser = JSON.parse(localStorage.getItem('user'));
                self.userList = body.users.filter((user) => user.id != authUser.id);
            },
            activeChat: (body) => {
                self.chat = body.chat;

                body.chat.messages.forEach((message) => {
                    if (message.user.id == self.user.id) message.type = 'out';
                    else message.type = 'in';
                });

                self.$router.push(`/dialog?id=${self.chat.id}`);
            },
            userDialogs: (body) => {
                self.chats = body.chats;
            },
            userTyping: (body) => {
                self.showUserTyping(body);
            },
            usersOnline: (body) => {
                console.log(body);
            }
        }
    }
}