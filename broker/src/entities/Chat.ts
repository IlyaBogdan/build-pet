import { v4 as uuidv4 } from 'uuid';
import { User } from './User';
import { Message } from './Message';

export class Chat {

    public id: String;
    public title: String;
    public users: Array<User>;
    public messages: Array<Message>;

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