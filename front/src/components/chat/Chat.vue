<template>
    <div>
        <div>
            <div class="status" :data-online="online">{{ online ? 'Online' : 'Disconnected' }}</div>
            <div v-if="!online && reconnect">Trying to reconnecting after {{ reconnect }} s</div>
        </div>
        

        <div v-if="userList.length">
            <div>Users: </div>
            <div v-for="(index, user) in userList" :key="index">
                <div>{{ user.username }}</div>
            </div>
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
        setUserList: (self, body) => {
            self.userList = body.users;
            console.log(self.userList);
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
                console.log(data);

                ReactAPI[data.method](this, data);
            }

            this.connection.onopen  = () => { 
                this.online = true;
                this.getUsers();
            }
            this.connection.onclose = () => { 
                this.online = false;

                setTimeout(() => {
                    if (this.reconnect !== undefined) {
                        if (this.reconnect != 0) {
                            this.reconnect -= 1;
                        }
                    } else {
                        this.reconnect = 5;
                    }
                }, 1000);
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
</style>