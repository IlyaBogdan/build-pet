import { Broker } from '../../abstracts/Broker/Broker';
import { api } from './api';
import { BrokerApi } from '../../abstracts/Broker/BrokerApi';

export class ChatBroker extends Broker {

    protected getApi(): BrokerApi {
        return api;
    }
}