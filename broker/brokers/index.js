import { chat, writeState as chatState } from "./chat.js";

const brokers = [
    chat
];

const methods = {};

brokers.forEach(broker => Object.assign(methods, broker));

setInterval(function() {
    console.clear();
    console.log('Server state');
    
    chatState();
}, 1000);


export { methods };