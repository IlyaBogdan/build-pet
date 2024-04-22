import { Message } from "../../entities/Message";
import { User } from "../../entities/User";
import { Chat } from "../../entities/Chat";

enum ChatTypes { 
    CHAT = Chat.TYPE_CHAT,
    DIALOG = Chat.TYPE_DIALOG 
}

export type ChatDto = {
    id?: number,
    title?: string,
    type: ChatTypes,
    users: Array<User>,
    messages?: Array<Message>,
    created_at?: Date,
    updated_at?: Date
}