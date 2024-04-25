import { randomUUID } from "crypto";
import WebSocket from 'ws';
import { UserDto } from "./brokers/dto/user.dto";

type Connection = {
    ws: WebSocket,
    token: String,
    listenEvents: Array<any>
}

export class WsSession {

    private user: UserDto;
    private online: boolean;
    private sessionId: string;
    private tokens: Array<String> = [];
    private connections: Array<Connection> = [];

    constructor(options: {
        user: UserDto,
        sessionId: string
    }) {
        this.user = options.user;
        this.sessionId = options.sessionId;
        this.online = true;
    }

    /**
     * Add new api token if user initialized new session
     * 
     * @param {Event} event
     * @returns {WsSession}
     */
    public addToken(token: String): WsSession {
        this.tokens.push(token);
        return this;
    }

    /**
     * Remove token from session, if user logout
     * 
     * @param {Event} event
     * @returns {WsSession}
     */
    public removeToken(token: String): WsSession {
        this.tokens = this.tokens.filter((stored) => stored !== token);
        return this;
    }


    /**
     * Accept event which will be listen for user's session.
     * 
     * @param {Event} event
     * @returns {WsSession}
     */
    public addListener(): WsSession {

        return this;
    }

    /**
     * Accept flash event for user's session.
     * After completing listener will be removed.
     * 
     * @param {Event} event
     * @returns {WsSession}
     */
    public flashEvent(): WsSession {

        return this;
    }

    public addConnection(ws: WebSocket, token: String): WsSession {
        this.connections.push({ ws, token, listenEvents: [] });
        return this;
    }

    public removeConnection(token: String): WsSession {
        this.connections = this.connections.filter((connection) => connection.token != token);
        return this;
    }

    public getConnections(): Array<Connection> {
        return this.connections;
    }

    public setOnline(online: boolean): WsSession {
        this.online = online;
        return this;
    }

    public getOnline(): boolean {
        return this.online;
    }

    public getSessionId(): String {
        return this.sessionId;
    }

    public getUser(): UserDto {
        return this.user;
    }
}

export class SessionStore {

    private sessions: Array<WsSession> = [];

    public createSession(user: UserDto, wsId: WebSocket): WsSession {
        while(true) {
            const sessionId: string = randomUUID();
            if (this.getSessionById(sessionId)) continue;

            const session = new WsSession({ sessionId, user });
            this.sessions.push(session);
            return session;
        }
        
    }

    private getSessionById(sessionId: any): WsSession|undefined {
        const session: WsSession = this.sessions.filter((session) => session.getSessionId() == sessionId)[0];
        return session;
    }

    public getSessionByToken(token: string): WsSession|undefined {
        const session: WsSession = this.sessions.filter((session) => session.getConnections().filter((connection) => connection.token == token).length)[0];
        return session;
    }

    public getSessionByUser(user: UserDto): WsSession|undefined {
        const session: WsSession = this.sessions.filter((session) => session.getUser().id == user.id)[0];
        return session;
    }
}