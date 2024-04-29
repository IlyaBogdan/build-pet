import { WsConnection } from "../WsConnection";
import { ChatInterceptor } from "./ChatInterceptor";
    

export class ChatConnection extends WsConnection {

    api() {
        return [
            { method: 'createUser' },
            { method: 'pull' },
            { method: 'getUsers' },
            { method: 'createChat' },
            { method: 'getChat' },
            { method: 'chatList' },
            { method: 'sendMessage' },
            { method: 'setTyping' },
            { method: 'getOnlineUsers' }
        ]
    }

    interceptor(self) { return new ChatInterceptor().api(self); }
}