import { User } from '../../entities/User';
import { Chat } from '../../entities/Chat';
import { Broker } from '../../abstracts/Broker/Broker';
import { api } from './api';
import { BrokerApi } from '../../abstracts/Broker/BrokerApi';
import { BackendAPI } from '../../utils/API';

export class ChatBroker extends Broker {

    public users: Array<User> = [];
    public chats: Array<Chat> = [];

    public writeState(): void {
        console.log('Chat:');
        console.log(`Users: ${JSON.stringify(this.users)}`);
        console.log(`Chats: ${JSON.stringify(this.chats)}`);
    }

    protected getApi(): BrokerApi {
        return api;
    }

    public createUser(): User {

        const user = new User();
        this.users.push(user);
        user.active = true;

        return user;
    }

    public getUser(id: String): User {
        const user = this.users.filter((user) => user.id == id)[0];
        if (!user) throw new Error(`User not found`);

        return user;
    }

    public getChat(id: String): Chat {
        const chat = this.chats.filter((chat) => chat.id == id)[0];
        if (!chat) throw new Error(`Chat not found`);

        return chat;
    }

    public chatWithUsers(users: Array<User>): Chat|boolean {

        let chatResult: Chat|boolean = false;

        for (const chat of this.chats) {
            let counter = 0;
            for (const chatUser of chat.users) {
                for (const checkUser of users) {
                    if (chatUser.id == checkUser.id) counter++;
                }
            }

            if (counter == chat.users.length && counter == users.length) {
                chatResult = chat;
                break;
            }
        }

        return chatResult;
    }
}