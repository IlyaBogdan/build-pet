import { WebSocketServer } from 'ws';
import { User } from './entities/User.js';
import { Chat } from './entities/Chat.js';
import { Message } from './entities/Message.js';

const users = [];
const chats = [];

const methods = {
    pull: (body) => {
        // body format: { method: pull, user: UserObj }

        let user;

        if (body.user) user = users.filter((user) => user.id == body.user.id)[0] ?? methods.createUser();
        else user = methods.createUser()

        methods.setOnline(user);

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
    getUsers: (body) => {
        return { method: 'setUserList', users };
    },

    setOnline: (user) => {
        user.active = true;
    },

    createUser: () => {
        const user = new User();
        users.push(user);
        methods.setOnline(user);

        return user;
    },
    
}

const validateMessageFormat = (message) => {

    return true;
}

const server = new WebSocketServer({ port: 3000 });

const writeState = () => {
    console.clear();
    console.log('Server state');
    console.log(`Users: ${JSON.stringify(users)}`);
    console.log(`Chats: ${JSON.stringify(chats)}`);
}

server.on('connection', (ws) => {

    writeState();

    ws.send(JSON.stringify({ method: 'pull' }));

    ws.on('message', (message) => {
        if (validateMessageFormat(message)) {
            message = JSON.parse(message);

            const { method } = message;
            const result = methods[method](message);

            ws.send(JSON.stringify(result));
        }

        writeState();
    });
});