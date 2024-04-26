import { MessageDto } from "../dto/message.dto";
import { UserDto } from "../dto/user.dto";

type UserIncomming = {
    id: number;
}
type ChatIncomming = {
    users: any;
    id: number;
}

export type ChatBrokerMessage = {
    user?: UserDto;
    dst?: UserIncomming;
    token: String;
    chat?: ChatIncomming;
    content?: String;
    users?: Array<number>,
    message?: MessageDto
    typing?: Boolean
}