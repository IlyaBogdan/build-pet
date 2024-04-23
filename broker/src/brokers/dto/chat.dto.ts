import { Chat } from "../../entities/Chat";
import { UserDto } from "./user.dto";
import { MessageDto } from "./message.dto";

enum ChatTypes { 
    CHAT = Chat.TYPE_CHAT,
    DIALOG = Chat.TYPE_DIALOG 
}

export type ChatDto = {
    id?: number,
    title?: string,
    type: ChatTypes,
    users: Array<UserDto | number>,
    messages?: Array<MessageDto>,
    created_at?: Date,
    updated_at?: Date
}