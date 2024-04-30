import WebSocket, { WebSocketServer, RawData } from 'ws';
import { execute } from './brokers/BrokerProvider';
import { BrokerMessage } from './abstracts/Broker/BrokerMessage';
import { BrokerApi } from './abstracts/Broker/BrokerApi';
import { SessionStore, WsSession } from './SessionStore';
import { BackendAPI } from './utils/API';
import { request } from './utils/backendRequest';
var Storage = require('node-storage');

const store = new Storage('./store.json');

const WebSocketEntry = (() => {
    let server: WebSocketServer;
    let accessToken: String = null;
    const sessionStore: SessionStore = new SessionStore();

    const getSession = (message: BrokerMessage, ws: WebSocket): WsSession => {
        let session = sessionStore.getSessionByToken(message.token);
        if (!session) session = sessionStore.createSession(message.token, ws);

        return session;
    }

    return class WebSocketEntry {
        
        public static async getServer(): Promise<WebSocketServer> {
            if (server) return server;
            else {
                await request('', {}, 'POST')
                    .then((response) => {
                        store.put('accessToken', response.access_token);
                        server = new WebSocketServer({ port: 3000 });
                        console.log('WebSocket is running on 3000 port');
                        server.on('connection', function (ws) {
                            ws.on('message', WebSocketEntry.main(ws));
                        });
                    });

                return server;
            }
        }

        public static main(ws: WebSocket) {
            return (message: RawData): void => {
                if (BrokerMessage.validateFormat(message)) {
                    const brokerMessage = BrokerMessage.getInstance();                           
                    console.log(`Accepted: `, brokerMessage);

                    getSession(brokerMessage, ws);
                        
                    execute(brokerMessage)
                        .then((result) => {
                            console.log('Response: ', result);
                            ws.send(JSON.stringify(result));
                        });
                    
                }
            }
        }

        public static getSessionStore(): SessionStore {
            return sessionStore;
        }

        public static accessToken(): String {
            return accessToken;
        }
    }
})();

WebSocketEntry.getServer();

export { WebSocketEntry }