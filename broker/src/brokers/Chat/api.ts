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
            let user: User;

            if (body.user) {
                try {
                    user = broker.getUser(body.user!.id);
                } catch (e) {
                    user = broker.createUser();
                }
            } else { 
                user = broker.createUser();
            }

            api.setOnline.action(user, broker);

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
        format: { method: 'sendMessage', message: {} },
        action: (body: ChatBrokerMessage, broker: ChatBroker) => {
            const chat = broker.getChat(body.chat!.id);
            body.message.author = broker.getUser(body.message.author.id);
            
            chat.messages.push(new Message(body.message));
            broadCast.emit('broadcast', { method: 'activeChat', chat });
    
            return { method: 'activeChat', chat };
        }
    },
    createChat: {
        format: { method: 'createChat', users: Array<User> },
        action: (body: ChatBrokerMessage, broker: ChatBroker) => {
            const users: Array<User> = body.users.map((userId) => broker.getUser(userId));

            let chat = broker.chatWithUsers(users);
            if (!chat) {
                chat = new Chat(users);
                broker.chats.push(chat);
            }
    
            return { method: 'activeChat', chat }
        }
    },
    getChat: {
        format: { method: 'getChat', chat: String },
        action: (body: ChatBrokerMessage, broker: ChatBroker) => {
            const chat = broker.getChat(body.chat.id);
    
            return { method: 'activeChat', chat }
        }
    },
    getUsers: {
        format: { method: 'getUsers' },
        action: (body: ChatBrokerMessage, broker: ChatBroker) => {
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