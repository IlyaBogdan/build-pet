import { User } from "./User";

export class Message {

    public author: User;
    public content: String;
    public date: Date = new Date();

    constructor(options: { author: User, content: String }) {
        this.author = options.author;
        this.content = options.content;
    }
}