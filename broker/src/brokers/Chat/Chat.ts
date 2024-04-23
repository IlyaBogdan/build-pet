import { Broker } from '../../abstracts/Broker/Broker';
import { api } from './api';
import { BrokerApi } from '../../abstracts/Broker/BrokerApi';

export class ChatBroker extends Broker {

    public writeState(): void {
        console.log('Chat:');
    }

    protected getApi(): BrokerApi {
        return api;
    }
}