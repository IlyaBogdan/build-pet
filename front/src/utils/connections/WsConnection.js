export const WsConnection = (() => {

    let instance;

    const wsSend = (connection, body) => {
        body.date = new Date();
        const command = JSON.stringify(body);
        console.log('Send command:');
        console.log(command);

        switch (connection.readyState) {
            case WebSocket.CONNECTING:
                connection.onopen = () => {
                    connection.send(command);
                };
                break;
            case WebSocket.OPEN:
                connection.send(command);
                break;
            case WebSocket.CLOSING:
            case WebSocket.CLOSED:
                break;
        }
        
    }

    return class WsConnection {

        constructor() {
            if (instance) return instance;
            else {
                this.methods = this.api();
                this.connection = new WebSocket('ws://localhost:3000');

                instance = this;
            }
        }
    
        // abstracts
        api() {}
        interceptor(self) { return self; }

        intercept(self) {
            this._interceptor = this.interceptor(self);
            this.connection.onmessage = (response) => {
                const data = JSON.parse(response.data);
                console.log('Accepted data:');
                console.log(data);
                this._interceptor[data.method](data);
            }

            return this;
        }

        onOpen(callback=()=>{}) {
            this.connection.onopen = callback;
    
            return this;
        }
        onClose(callback=()=>{}) {
            this.connection.onclose = callback;
    
            return this;
        }

        call(methodName, options={}) {
            const methodParams = this.methods.filter((method) => method.method == methodName)[0];
            const data = Object.assign(methodParams, options);

            wsSend(this.connection, data);
        }
    }
})();
