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
                    <link-ui @click="openChat(user)">Message</link-ui>
                </div>
            </div>
        </div>
        <button-ui type="primary">Test</button-ui>
    </div>
</template>

<script>

import { Chat } from "@/utils/Chat";
import { ChatInterceptor } from "@/utils/ChatInterceptor";

const interceptor = new ChatInterceptor();
const chat = new Chat();

export default {
    name: "ChatElement",
    data() {
        return {
            user: undefined,
            online: false,
            userList: [],
            messages: [],
            reconnect: undefined
        }
    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem('user'));

        console.log(chat);
        chat.onOpen(() => {
                this.online = true;
                chat.api.getUsers();
            })
            .onClose(() => {
                this.online = false;
            })
            .interceptor(
                (response) => {
                    const data = JSON.parse(response.data);
                    interceptor.api[data.method](this, data);
                }
            );
    },
    methods: {
        openChat(dst) {
            const url = `/chat?user=${dst.id}`;

            window.history.replaceState({}, '', url);
        }
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