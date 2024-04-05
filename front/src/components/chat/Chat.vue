<template>
    <div>
        <div>
            <div class="status" :data-online="online">{{ online ? 'Online' : 'Disconnected' }}</div>
            <div v-if="!online && reconnect">Trying to reconnecting after {{ reconnect }} s</div>
        </div>
        
        <div class="user-list" v-if="userList.length">
            <div class="user-list-title">Users: </div>
            <div class="user-list-items">
                <div class="user-list-item" v-for="(user) in userList" :key="user.id">
                    <div>{{ user.username }}</div>
                    <link-ui href="">Message</link-ui>
                </div>
            </div>
        </div>
        <button-ui type="primary">Test</button-ui>
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
        setUserList: (self, body) => {
            self.userList = body.users.filter((user) => user.id != self.user.id);
        }
    };

    export default {
        name: "ChatElement",
        data() {
            return {
                user: undefined,
                online: false,
                connection: undefined,
                userList: [],
                messages: [],
                reconnect: undefined
            }
        },
        mounted() {
            this.user = JSON.parse(localStorage.getItem('user'));

            this.connection = this.getConnection();

            this.connection.onmessage = (response) => {
                const data = JSON.parse(response.data);

                ReactAPI[data.method](this, data);
            }

            this.connection.onopen  = () => { 
                this.online = true;
                this.getUsers();
            }
            this.connection.onclose = () => { 
                this.online = false;
            }

        },
        methods: {
            getConnection() {
                return new WebSocket('ws://localhost:3000');
            },
            wsSend(body) {
                this.connection.send(JSON.stringify(body));
            },

            createUser() { this.wsSend({ method: 'createUser' }); },
            pull()       { this.wsSend({ method: 'pull', user: this.user }); },
            getUsers()   { this.wsSend({ method: 'getUsers' }); }
            
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

    .user-list {
        width: 550px;
        display: flex;
        flex-direction: column;

        .user-list-items {
            display: flex;
            flex-direction: column;

            .user-list-item {
                margin-top: 10px;
                display: flex;
                justify-content: space-between;

            }
        }
    }
</style>