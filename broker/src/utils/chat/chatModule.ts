import { request } from "../backendRequest";
import { ChatDto } from "../../brokers/dto/chat.dto";
import { MessageDto } from "../../brokers/dto/message.dto";

export default {
    createChat: (chatInfo: ChatDto) => {
        return new Promise((resolve, reject) => {
            console.log('here', chatInfo);
            request(`/chat`, chatInfo, 'POST')
                .then((response) => { resolve(response) });
        });
    },
    getChatInfo: (chatId: number) => {
        return new Promise((resolve, reject) => {
            request(`/chat/${chatId}`, {}, 'GET')
                .then((response) => { resolve(response) });
        });
    },
    saveMessage: (chatId: number, message: MessageDto) => {
        return new Promise((resolve, reject) => {
            request(`/chat/${chatId}/save-message`, message, 'PUT')
                .then((response) => { resolve(response) });
        });
    },
    deleteMessage: (chatId: number, messageId: number) => {
        return new Promise((resolve, reject) => {
            request(`/chat/${chatId}?message=${messageId}`, {}, 'DELETE')
                .then((response) => { resolve(response) });
        });
    },
    updateMessage: (chatId: number, message: MessageDto) => {
        return new Promise((resolve, reject) => {
            request(`/chat/${chatId}?message=${message.id}`, message, 'PATCH')
                .then((response) => { resolve(response) });
        });
    },
    getUsersChats: (userId: number) => {
        return new Promise((resolve, reject) => {
            request(`/chat/list?user=${userId}`, {}, 'GET')
                .then((response) => { resolve(response) });
        });
    }
}