import { MessageDto } from "../brokers/dto/message.dto";
import { User } from "./User";

export class Message {

    public user: User;
    public message: String;
    public created_at: Date;
    public updated_at: Date;

    constructor(messageInfo: MessageDto) {
        this.user = messageInfo.user;
        this.message = messageInfo.message;
        this.created_at = messageInfo.created_at ?? new Date();
        this.updated_at = messageInfo.updated_at ?? new Date();
    }
}