import WebSocket, { WebSocketServer, RawData } from 'ws';
import { execute } from './brokers/BrokerProvider';
import { BrokerMessage } from './abstracts/Broker/BrokerMessage';
import { BrokerApi } from './abstracts/Broker/BrokerApi';
import { SessionStore, WsSession } from './SessionStore';

const WebSocketEntry = (() => {
    let server: WebSocketServer;
    const sessionStore: SessionStore = new SessionStore();

    const getSession = (message: BrokerMessage, ws: WebSocket): WsSession => {
        let session = sessionStore.getSessionByToken(message.token);
        if (!session) session = sessionStore.createSession(message.token, ws);

        return session;
    }

    return class WebSocketEntry {
        
        public static getServer(): WebSocketServer {
            if (server) return server;
            else {
                server = new WebSocketServer({ port: 3000 });
                console.log('WebSocket is running on 3000 port');
                server.on('connection', function (ws) {
                    ws.on('message', WebSocketEntry.main(ws));
                });

                return server;
            }
        }

        public static main(ws: WebSocket) {
            return (message: RawData): void => {
                console.log(sessionStore);
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
    }
})();

WebSocketEntry.getServer();

export { WebSocketEntry }