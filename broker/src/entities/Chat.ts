import { v4 as uuidv4 } from 'uuid';
import { User } from './User';
import { Message } from './Message';

export class Chat {

    static TYPE_CHAT: number = 1;
    static TYPE_DIALOG: number = 0;

    public id: String;
    public title: String;
    public users: Array<User>;
    public messages: Array<Message>;
    public usersTyping: Array<User> = [];

    constructor(users: Array<User>) {
        this.id = uuidv4();
        this.users = users;
        this.messages = [];
        this.title = `Chat #${this.id}`;
    }

    public setTitle(title: String) {
        this.title = title;
    }
}