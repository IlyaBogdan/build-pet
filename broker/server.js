import { WebSocketServer } from 'ws';
import {v4 as uuidv4} from 'uuid';

class User {

    username;

    constructor() {
        this.id = uuidv4();
        this.active = false;
        this.chats = [];
    }

    setUsername(username) {
        this.username = username;
    }
}

class Chat {

    title;

    constructor(users) {
        this.id = uuidv4();
        this.users = [];
        this.messages = [];
        this.title = `Chat #${this.id}`;
    }

    setTitle(title) {
        this.title = title;
    }
}

class Message {

    constructor(author, content) {
        this.author = author;
        this.content = content;
    }
}

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

    setUsername: (body) => {
        // body format: { method: setUsername, user: UserObj, username: String }

        const user = users.filter((user) => user.id == body.user.id)[0];
        user.username = body.username;

        return { method: 'setUsername', user };
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