import { v4 as uuidv4 } from 'uuid';
import { Chat } from './Chat';

export class User {

    public id: String;
    public username: String;
    public active: Boolean = false;

    constructor() {
        this.id = uuidv4();
        this.username = `Username #${this.id}`;
    }

    setUsername(username: String): this {
        this.username = username;

        return this;
    }
}