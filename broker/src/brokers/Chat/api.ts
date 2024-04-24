import { broadCast } from "../../abstracts/Broker/BroacastEvent";
import { BrokerApi } from "../../abstracts/Broker/BrokerApi";
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
        format: { method: 'pull', user: Object },
        action: (body: ChatBrokerMessage) => {
            return new Promise((resolve, reject) => {
                BackendAPI.getUserByToken(body.token)
                    .then((response: UserDto) => {
                        resolve({ method: 'setUser', user: response });
                    });
            });
        }
    },
    /**
     * This method show all active users in chat, who is writing some message
     */
    setTyping: {
        format: { method: 'setTyping', user: Object, chat: Object, typing: Boolean },
        action: (body: ChatBrokerMessage) => {
            
        }
    },
    /**
     * This method create new chat with user and sends it to backend.
     * From backend we accept actual info about chat
     */
    createChat: {
        format: { method: 'createChat', users: Array<number> },
        action: (body: ChatBrokerMessage) => {
            const users: Array<number> = body.users;
            const chat = {
                users,
                type: users.length > 2 ? 1 : 0
            };

            return new Promise((resolve, reject) => {
                BackendAPI.createChat(chat)
                    .then((response: ChatDto) => {
                        resolve({ method: 'activeChat', chat: response })
                    });
            });
        }
    },
    /**
     * This method retrives actual information about chat
     */
    getChat: {
        format: { method: 'getChat', chat: String },
        action: (body: ChatBrokerMessage) => {
            return new Promise((resolve, reject) => {
                BackendAPI.getChatInfo(body.chat.id)
                    .then((response: ChatDto) => {
                        resolve({ method: 'activeChat', chat: response })
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
        action: (body: ChatBrokerMessage) => {
            return new Promise((resolve, reject) => {
                BackendAPI.saveMessage(body.chat.id, body.message)
                    .then((response: ChatDto) => {
                        broadCast.emit('broadcast', { method: 'activeChat', chat: response });
                        resolve({ method: 'activeChat', chat: response });
                    });
            });
        }
    },
    /**
     * This method return chat list for current user
     */
    chatList: {
        format: { method: 'getChats', user: Object },
        action: (body: ChatBrokerMessage) => {
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
        action: (body: ChatBrokerMessage) => {
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
        action: (user: Object) => {
            //user.active = true;
            broadCast.emit('broadcast', { method: 'setUserList', users: broker.users });
        }
    },
}