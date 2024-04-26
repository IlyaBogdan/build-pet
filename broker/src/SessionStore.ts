import { randomUUID } from "crypto";
import WebSocket from 'ws';
import { UserDto } from "./brokers/dto/user.dto";

type Connection = {
    ws: WebSocket,
    token: String,
    listenEvents: Array<any>
}

export class WsSession {

    private user: UserDto | undefined;
    private online: boolean;
    private sessionId: String;
    private connections: Array<Connection> = [];

    constructor(options: {
        token: String,
        sessionId: String,
        ws: WebSocket
    }) {
        this.sessionId = options.sessionId;
        this.online = true;
        this.addConnection(options.ws, options.token);
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
        ws.on('close', () => {
            this.removeConnection(token);
            if (this.getConnections().length == 0) {
                this.setOnline(false);
            }
        });
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

    public setUser(user: UserDto): WsSession {
        this.user = user;
        return this;
    }

    public getUser(): UserDto | undefined {
        return this.user;
    }
}

export class SessionStore {

    private sessions: Array<WsSession> = [];

    public createSession(token: String, ws: WebSocket): WsSession {
        while(true) {
            const sessionId: String = randomUUID();
            if (this.getSessionById(sessionId)) continue;

            const session = new WsSession({ sessionId, token, ws });
            this.sessions.push(session);
            return session;
        }
        
    }

    private getSessionById(sessionId: any): WsSession|undefined {
        const session: WsSession = this.sessions.filter((session) => session.getSessionId() == sessionId)[0];
        return session;
    }

    public getSessionByToken(token: String): WsSession|undefined {
        const session: WsSession = this.sessions.filter((session) => session.getConnections().filter((connection) => connection.token == token).length)[0];
        return session;
    }

    public getSessionByUser(user: UserDto): WsSession|undefined {
        const session: WsSession = this.sessions.filter((session) => session.getUser()?.id == user.id)[0];
        return session;
    }
}