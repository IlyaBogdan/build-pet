import { broadCast } from "../../abstracts/Broker/BroacastEvent";
import { BrokerApi } from "../../abstracts/Broker/BrokerApi";
import { Chat } from "../../entities/Chat";
import { Message } from "../../entities/Message";
import { User } from "../../entities/User";
import { ChatBroker } from "./Chat";
import { ChatBrokerMessage } from "./message.type";
import { BackendAPI } from "../../utils/API";
import { UserDto } from "../dto/user.dto";
import { ChatDto } from "../dto/chat.dto";

/**
 * API methods for chat broker
 */
export const api: BrokerApi = {

    /**
     * This method set user online and notify all users, who has opened
     * chats with this user
     */
    pull: {
        format: { method: 'pull', user: User },
        action: (body: ChatBrokerMessage, broker: ChatBroker) => {
            // 1. Set user online
            // 2. Notify users in chats, that this user online now
            return new Promise((resolve, reject) => {
                BackendAPI.getUserByToken(body.token)
                    .then((response: UserDto) => {
                        console.log(response);
                        resolve({ method: 'setUser', user: new User(response) });
                    });
            });
        }
    },
    /**
     * This method show all active users in chat, who is writing some message
     */
    setTyping: {
        format: { method: 'setTyping', user: User, chat: Chat, typing: Boolean },
        action: (body: ChatBrokerMessage, broker: ChatBroker) => {
            
        }
    },
    /**
     * This method create new chat with user and sends it to backend.
     * From backend we accept actual info about chat
     */
    createChat: {
        format: { method: 'createChat', users: Array<number> },
        action: (body: ChatBrokerMessage, broker: ChatBroker) => {
            const users: Array<number> = body.users;
            const chat = new Chat({
                users,
                type: users.length > 2 ? Chat.TYPE_CHAT : Chat.TYPE_DIALOG
            });

            return new Promise((resolve, reject) => {
                BackendAPI.createChat(chat)
                    .then((response: ChatDto) => {
                        resolve({ method: 'activeChat', chat: new Chat(response) })
                    });
            });
        }
    },
    /**
     * This method retrives actual information about chat
     */
    getChat: {
        format: { method: 'getChat', chat: String },
        action: (body: ChatBrokerMessage, broker: ChatBroker) => {
            return new Promise((resolve, reject) => {
                BackendAPI.getChatInfo(body.chat!)
                    .then((response: ChatDto) => {
                        resolve({ method: 'activeChat', chat: new Chat(response) })
                    });
            });
        }
    },
    /**
     * This method accepts message from client and sends it to backend.
     * From backend we accept actual info about chat.
     * And then we send it to all active users
     */
    sendMessage: {
        format: { method: 'sendMessage', message: {} },
        action: (body: ChatBrokerMessage, broker: ChatBroker) => {
            return new Promise((resolve, reject) => {
                BackendAPI.saveMessage(body.chat!, body.message!)
                    .then((response: ChatDto) => {
                        const chat = new Chat(response);
                        broadCast.emit('broadcast', { method: 'activeChat', chat });
                        resolve({ method: 'activeChat', chat });
                    });
            });
        }
    },
    /**
     * This method return chat list for current user
     */
    chatList: {
        format: { method: 'getChats', user: User },
        action: (body: ChatBrokerMessage, broker: ChatBroker) => {
            return new Promise((resolve, reject) => {
                BackendAPI.getUsersChats(body.user.id)
                    .then((chats: Array<ChatDto>) => {
                        resolve({ method: 'userDialogs', chats });
                    });
            });
        }
    },
    /**
     * Return list of all users
     */
    getUsers: {
        format: { method: 'getUsers' },
        action: (body: ChatBrokerMessage, broker: ChatBroker) => {
            return new Promise((resolve, reject) => {
                BackendAPI.getUsers()
                    .then((response: Array<UserDto>) => {
                        resolve({ method: 'setUserList', users: response });
                    });
            });
        }
    },

    /**
     * Set user online
     */
    setOnline: {
        format: {},
        action: (user: User, broker: ChatBroker) => {
            user.active = true;
            broadCast.emit('broadcast', { method: 'setUserList', users: broker.users });
        }
    },
}