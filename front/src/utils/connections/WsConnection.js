export const WsConnection = (() => {

    let instance;

    const wsSend = (connection, body) => {
        body.date = new Date();
        const command = JSON.stringify(body);
        console.log('Send command:');
        console.log(command);

        let timer;

        switch (connection.readyState) {
            case WebSocket.CONNECTING:
                timer = setInterval(() => {
                    if (connection.readyState == WebSocket.OPEN) {
                        clearInterval(timer);
                        connection.send(command);
                    }
                }, 1000);
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
                this.connection = new WebSocket(process.env.VUE_APP_BROKER_CONNECTION);

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
                if (data.method == 'ok') return;
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
            console.log(options);
            const methodParams = this.methods.filter((method) => method.method == methodName)[0];
            const data = Object.assign(methodParams, options, {token: localStorage.getItem('apiToken')});

            wsSend(this.connection, data);
        }
    }
})();
