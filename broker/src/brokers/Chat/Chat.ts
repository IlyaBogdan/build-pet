import { User } from '../../entities/User';
import { Chat } from '../../entities/Chat';
import { Broker } from '../../abstracts/Broker/Broker';
import { api } from './api';
import { BrokerApi } from '../../abstracts/Broker/BrokerApi';

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
}