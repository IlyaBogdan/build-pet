import { WebSocketServer } from 'ws';
import { methods } from './brokers/index.js';

const server = new WebSocketServer({ port: 3000 });

const validateMessageFormat = (message) => {

    return true;
}

server.on('connection', function (ws) {

    ws.send(JSON.stringify({ method: 'pull' }));

    ws.on('message', (message) => {
        if (validateMessageFormat(message)) {
            message = JSON.parse(message);

            const { method } = message;
            const result = methods[method](message);

            ws.send(JSON.stringify(result));
        }
    });
});