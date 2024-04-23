import { User } from './User';
import { UserDto } from '../brokers/dto/user.dto';
import { Message } from './Message';
import { ChatDto } from '../brokers/dto/chat.dto';

export class Chat {

    static TYPE_CHAT: number = 1;
    static TYPE_DIALOG: number = 0;

    public id: number;
    public title: String;
    public users: Array<UserDto | number>;
    public messages: Array<Message>;
    public type: number;
    public created_at: Date;
    public update_at: Date;

    public usersTyping: Array<User> = [];

    constructor(chatInfo: ChatDto) {
        this.id = chatInfo.id;
        this.users = chatInfo.users;
        this.messages = chatInfo.messages.map((messageInfo) => new Message(messageInfo)) ?? [];
        this.title = chatInfo.title;
        this.type = chatInfo.type;
        this.created_at = chatInfo.created_at ?? new Date;
        this.update_at = chatInfo.updated_at;
    }

    public setTitle(title: String) {
        this.title = title;
    }
}