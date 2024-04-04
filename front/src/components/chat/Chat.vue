<template>
    <div>
        <div class="status" :data-online="online">{{ online ? 'Online' : 'Disconnected' }}</div>
        <div>
            <input type="text" name="username" v-model="username"/>
            <button type="button" @click="setUsername">Set Username</button>
        </div>
    </div>
</template>

<script>

    const ReactAPI = {
        pull: (self) => {
            self.pull();
        },
        setUser: (self, body) => {
            self.user = body.user;
            localStorage.setItem('user', JSON.stringify(body.user));
        },
    };

    export default {
        name: "ChatElement",
        data() {
            return {
                online: false,
                connection: undefined,
                username: '',
                messages: [],
                user: undefined
            }
        },
        mounted() {
            this.user = JSON.parse(localStorage.getItem('user')) ?? undefined;

            this.connection = new WebSocket('ws://localhost:3000');

            this.connection.onopen  = () => { this.online = true; }
            this.connection.onclose = () => { this.online = false; }

            this.connection.onmessage = (response) => {
                const data = JSON.parse(response.data);
                console.log(data);

                ReactAPI[data.method](this, data);
            }
        },
        methods: {
            wsSend(body) {
                this.connection.send(JSON.stringify(body));
            },

            setUsername() { this.wsSend({ method: 'setUsername', user: this.user, username: this.username}); },
            createUser() { this.wsSend({ method: 'createUser' }); },
            pull() { this.wsSend({ method: 'pull', user: this.user }); }
            
        }
    }
</script>

<style lang="scss">
    .status {
        text-transform: uppercase;

        border-radius: 15px;
        padding: 10px 15px;
        width: 150px;
        text-align: center;
        font-size: 16px;
        font-weight: 600;
        color: rgb(255, 255, 255);

        &[data-online="false"] {
            background-color: rgb(182, 43, 43);
        }

        &[data-online="true"] {
            background-color: rgb(74, 194, 50);
        }
    }
</style>