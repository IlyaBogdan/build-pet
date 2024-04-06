
export const Chat = (() => {

    let instance;
    const connection = new WebSocket('ws://localhost:3000');

    const wsSend = (body) => {
        body.date = new Date();
        connection.send(JSON.stringify(body));
    }

    return class Chat {

        constructor() {
            if (instance) return instance;
            
            this.api = {
                createUser() { wsSend({ method: 'createUser' }); },
                pull(user)       { wsSend({ method: 'pull', user }); },
                getUsers()   { wsSend({ method: 'getUsers' }); },
                getChat(dst) { wsSend({ method: 'getUsers', dst }); }
            }

            instance = this;
        }

        onOpen(callback=()=>{}) {
            connection.onopen = callback;

            return this;
        }
        onClose(callback=()=>{}) {
            connection.onclose = callback;

            return this;
        }
        interceptor(callback=()=>{}) {
            connection.onmessage = callback;

            return this;
        }
    }
})()

