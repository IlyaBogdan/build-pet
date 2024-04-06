import { WebSocketServer, RawData } from 'ws';
import { methods } from './brokers/BrokerProvider';
import { BrokerMessage } from './abstracts/Broker/BrokerMessage';
import { BrokerApi } from './abstracts/Broker/BrokerApi';

const WebSocketEntry = (() => {
    let server: WebSocketServer;

    return class WebSocketEntry {
        
        public static getServer(): WebSocketServer {
            if (server) return server;
            else {
                server = new WebSocketServer({ port: 3000 });

                server.on('connection', function (ws) {

                    ws.send(JSON.stringify({ method: 'pull' }));
                
                    ws.on('message', (message: RawData) => {
                        if (BrokerMessage.validateFormat(message)) {
                            const brokerMessage = BrokerMessage.getInstance();
                
                            const { method } = brokerMessage;
                            const methodKey = method as keyof BrokerApi;
                            const result = methods[methodKey].action(message);
                
                            ws.send(JSON.stringify(result));
                        }
                    });
                });

                return server;
            }
            
        }
    }
})();

WebSocketEntry.getServer();

export { WebSocketEntry }