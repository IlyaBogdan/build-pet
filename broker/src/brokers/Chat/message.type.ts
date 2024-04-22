import { User } from "../../entities/User";
import { MessageDto } from "../dto/message.dto";
import { UserDto } from "../dto/user.dto";

type UserIncomming = {
    id: number;
}
type ChatIncomming = {
    id: number;
}

export type ChatBrokerMessage = {
    user?: UserIncomming | UserDto;
    dst?: UserIncomming;
    token: String;
    chat?: ChatIncomming;
    content?: String;
    users?: Array<number>,
    message?: MessageDto
}