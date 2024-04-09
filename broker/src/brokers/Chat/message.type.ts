import { User } from "../../entities/User";

type UserIncomming = {
    id: String;
}
type ChatIncomming = {
    id: String;
}

export type ChatBrokerMessage = {
    user?: UserIncomming;
    dst?: UserIncomming;
    chat?: ChatIncomming;
    content?: String;
    users?: Array<String>,
    message?: { date: Date, content: String, author: User }
}