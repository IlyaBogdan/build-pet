
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
}