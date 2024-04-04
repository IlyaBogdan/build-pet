import { v4 as uuidv4 } from 'uuid';

export class Chat {

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