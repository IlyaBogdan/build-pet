import { v4 as uuidv4 } from 'uuid';

export class User {

    constructor() {
        this.id = uuidv4();
        this.active = false;
        this.chats = [];
        this.username = `Username #${this.id}`;
    }

    setUsername(username) {
        this.username = username;
    }
}