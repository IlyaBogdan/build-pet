import { request } from "../backendRequest";
import { ChatBrokerMessage } from "../../brokers/Chat/message.type";

export default {
    createChat: () => {

    },
    saveMessage: (message: ChatBrokerMessage) => {
        return new Promise((resolve, reject) => {
            request(`/chat/${message.chat.id}/save-message`, message.message, 'POST')
                .then((response) => { resolve(response) });
        });
    }
}