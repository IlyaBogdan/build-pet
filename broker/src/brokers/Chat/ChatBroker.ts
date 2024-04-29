import { Broker } from '../../abstracts/Broker/Broker';
import { api } from './api';
import { BrokerApi } from '../../abstracts/Broker/BrokerApi';
import { UserDto } from '../dto/user.dto';
import { ChatDto } from '../dto/chat.dto';
import WebSocket from 'ws';

export class ChatBroker extends Broker {

    private activeChats: Array<ChatDto> = []

    protected getApi(): BrokerApi {
        return api;
    }

    public setOnlineUser(userToken: String, user: UserDto): void {
        const session = this.sessionStore.getSessionByToken(userToken);
        session.setOnline(true).setUser(user);
    }

    public getUsersOnline(users: Array<number>): Array<UserDto> {
        console.log(this.sessionStore.getSessions());
        const sessions = this.sessionStore.getSessions().filter((session) => {
            return users.indexOf(session.getUser()?.id) != -1 && session.getOnline();
        });

        return sessions.map(session => session.getUser());
    }

    public actualizeChatInfo(chat: ChatDto, onlineUsers: Array<number>): void {
        const sessions = this.sessionStore.getSessions().filter((session) => {
            return onlineUsers.indexOf(session.getUser().id) != -1 && session.getOnline();
        });

        let connections = [];
        sessions.forEach((session) => {
            session.getConnections().forEach((connection) => {
                connections.push(connection.ws);
            })
        });

        this.broadcastForUsers(connections, { method: 'activeChat', chat: Object.assign(chat, { online: onlineUsers })});
    }

    public setActiveChat(userToken: String, chat: ChatDto): ChatBroker {
        const session = this.sessionStore.getSessionByToken(userToken);
        const connection = session.getConnectionByToken(userToken);
        connection.optional.activeChat = chat;
        if (!this.activeChats.filter(activeChat => activeChat.id == chat.id)[0]) {
            this.activeChats.push(chat);
        }
        
        return this;
    }

    public notifyUserTyping(who: UserDto, users: Array<UserDto>, chatId: number, state: Boolean): void {
        const chat = this.activeChats.filter((chat) => chat.id == chatId)[0];
        const userIds = users.map(user => user.id);

        const sessions = this.sessionStore.getSessions().filter((session) => {
            const userId = session.getUser().id;
            return userIds.indexOf(userId) != -1;
        });

        let connections = [];
        sessions.forEach((session) => {
            session.getConnections().forEach((connection) => {
                connections.push(connection.ws);
            })
        });
        
        this.broadcastForUsers(connections, { method: 'userTyping', user: who, chat, state: state });
    }

    protected broadcastForUsers(sessions: Array<WebSocket>, message: { method: String } & { [key: string]: any | boolean }): void {
        console.log(message);
        sessions.forEach((session) => {
            session.send(JSON.stringify(message));
        });
    }
}