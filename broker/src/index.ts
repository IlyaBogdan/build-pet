import { WebSocketServer, RawData } from 'ws';
import { execute } from './brokers/BrokerProvider';
import { BrokerMessage } from './abstracts/Broker/BrokerMessage';
import { BrokerApi } from './abstracts/Broker/BrokerApi';
import { SessionStore } from './SessionStore';

const WebSocketEntry = (() => {
    let server: WebSocketServer;
    const sessionStore: SessionStore = new SessionStore();

    const getSessionByMessage = (message: BrokerMessage & { body: any }) => {
        let session = sessionStore.getSessionByToken(message.body.token);
        if (!session) session = sessionStore.getSessionByUser(message.body.token);
    }

    return class WebSocketEntry {
        
        public static getServer(): WebSocketServer {
            if (server) return server;
            else {
                server = new WebSocketServer({ port: 3000 });
                console.log('WebSocket is running on 3000 port');
                server.on('connection', function (ws) {
                    //ws.send(JSON.stringify({ method: 'pull' }));

                    console.log(ws);
                    ws.on('message', (message: RawData) => {
                        if (BrokerMessage.validateFormat(message)) {
                            const brokerMessage = BrokerMessage.getInstance();                           

                            console.log(`Accepted: `, brokerMessage);

                            execute(brokerMessage)
                                .then((result) => {
                                    console.log('Response: ', result);
                                    ws.send(JSON.stringify(result));
                                });
                            
                        }
                    });
                });

                return server;
            }
        }

        public static getSessionStore(): SessionStore {
            return sessionStore;
        }
    }
})();

WebSocketEntry.getServer();

export { WebSocketEntry }