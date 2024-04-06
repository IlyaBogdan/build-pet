import { BrokerApi } from "../abstracts/Broker/BrokerApi";
import { ChatBroker } from "./Chat/Chat";

const brokers = [
    new ChatBroker
];

const methods: BrokerApi = {};

brokers.forEach(broker => Object.assign(methods, broker.api));

setInterval(function() {
    console.clear();
    console.log('Server state');
    
}, 1000);


export { methods };