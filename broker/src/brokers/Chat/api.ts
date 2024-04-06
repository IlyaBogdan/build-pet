import { broadCast } from "../../abstracts/Broker/BroacastEvent";
import { BrokerApi } from "../../abstracts/Broker/BrokerApi";
import { Chat } from "../../entities/Chat";
import { Message } from "../../entities/Message";
import { User } from "../../entities/User";
import { ChatBroker } from "./Chat";
import { ChatBrokerMessage } from "./message.type";

export const api: BrokerApi = {
    
    pull: {
        format: { method: 'pull', user: User },
        action: (body: ChatBrokerMessage, broker: ChatBroker) => {
            let user;

            if (body.user) 
                try {
                    user = broker.getUser(body.user!.id);
                } catch (e) {
                    user = broker.createUser();
                }
            else user = broker.createUser()

            api.setOnline.action(user);

            return { method: 'setUser', user };
        }
    },

    setTyping: {
        format: { method: 'setTyping', user: User, chat: Chat, typing: Boolean },
        action: (body: ChatBrokerMessage, broker: ChatBroker) => {
    
            const user = broker.getUser(body.user!.id);
            const chat = broker.getChat(body.chat!.id);
    
            return chat;
        }
    },
    sendMessage: {
        format: { method: 'sendMessage', user: User, chat: Chat, content: {} },
        action: (body: ChatBrokerMessage, broker: ChatBroker) => {
    
            const user = broker.getUser(body.user!.id);
            const chat = broker.getChat(body.chat!.id);
            
            chat.messages.push(new Message(user, body.content!));
    
            return chat;
        }
    },
    createChat: {
        format: { method: 'createChat', user: User, dst: User, content: {} },
        action: (body: ChatBrokerMessage, broker: ChatBroker) => {

            const user = broker.getUser(body.user!.id);
            const dst = broker.getUser(body.dst!.id);
    
            const chat = new Chat([user, dst]);
    
            user.chats.push(chat);
            dst.chats.push(chat);
    
            return { method: 'activeChat', chat }
        }
    },
    getChat: {
        format: { method: 'getChat', chat: Chat, user: User },
        action: (body: ChatBrokerMessage, broker: ChatBroker) => {

            const chat = broker.getChat(body.chat!.id);
    
            return { method: 'activeChat', chat }
        }
    },
    getUsers: {
        format: { method: 'getUsers' },
        action: (broker: ChatBroker) => {
            return { method: 'setUserList', users: broker.users };
        }
    },

    setOnline: {
        format: {},
        action: (user: User, broker: ChatBroker) => {
            user.active = true;
            broadCast.emit('broadcast', { method: 'setUserList', users: broker.users });
        }
    },
}