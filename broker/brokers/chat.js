import { User } from '../entities/User.js';
import { Chat } from '../entities/Chat.js';
import { Message } from '../entities/Message.js';

const users = [];
const chats = [];

const writeState = () => {
    console.log('Chat:');
    console.log(`Users: ${JSON.stringify(users)}`);
    console.log(`Chats: ${JSON.stringify(chats)}`);
}

const chat = {
    pull: (body) => {
        // body format: { method: pull, user: UserObj }

        let user;

        if (body.user) user = users.filter((user) => user.id == body.user.id)[0] ?? chat.createUser();
        else user = chat.createUser()

        chat.setOnline(user);

        return { method: 'setUser', user };
    },

    setTyping: (body) => {
        // body format: { method: setTyping, user: UserObj, chat: ChatObj, typing: bool }

        const user = users.filter((user) => user.id == body.user.id)[0];
        const chat = chats.filter((chat) => chat.id == body.chat.id)[0];

        
        return chat;
    },
    sendMessage: (body) => {
        // body format: { method: sendMessage, user: UserObj, chat: ChatObj, content: any }

        const user = users.filter((user) => user.id == body.user.id)[0];
        const chat = chats.filter((chat) => chat.id == body.chat.id)[0];
        chat.messages.push(new Message(user, body.content));

        return chat;
    },
    createChat: (body) => {
        // body format: { method: sendMessage, user: UserObj, dst: UserObj, content: any }
        const user = users.filter((user) => user.id == body.user.id)[0];
        const dst = users.filter((user) => user.id == body.dst.id)[0];

        const chat = new Chat([body.user, body.dst]);

        user.chats.push(chat);
        dst.chats.push(chat);

        return chat;
    },
    getChat: (body) => {
        // body format: { method: sendMessage, user: UserObj, dst: UserObj, content: any }
        const user = users.filter((user) => user.id == body.user.id)[0];
        const dst = users.filter((user) => user.id == body.dst.id)[0];

        const chat = chats.filter((chat) => chat.users.indexOf(user) != -1 && chat.users.indexOf(dst) != -1 && chat.users.length == 2)[0] ?? new Chat([body.user, body.dst]);
        user.chats.push(chat);
        dst.chats.push(chat);

        return { method: 'setUser', user };
    },
    getUsers: (body) => {
        return { method: 'setUserList', users };
    },

    setOnline: (user) => {
        user.active = true;
    },

    createUser: () => {
        const user = new User();
        users.push(user);
        chat.setOnline(user);

        server.clients.forEach((client) => {
            client.send(JSON.stringify(chat.getUsers()));
        });

        return user;
    },
    
}

export { chat, writeState }