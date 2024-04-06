import { User } from "./User";

export class Message {

    public author: User;
    public message: String;
    public date: Date = new Date();

    constructor(author: User, content: String) {
        this.author = author;
        this.message = content;
    }
}