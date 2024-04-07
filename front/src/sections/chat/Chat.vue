<template>
    <div>
        <div>
            <div class="status" :data-online="online">{{ online ? 'Online' : 'Disconnected' }}</div>
            <div v-if="!online && reconnect">Trying to reconnecting after {{ reconnect }} s</div>
        </div>
        
        <chat-list :users="userList"/>
        <chat-dialog @sendMessage="sendMessage"/>
    </div>
</template>

<script>
/**
 * TODO
 * 1) Open chat whit other users by link
 * 2) 
 */


import { ChatConnection } from "@/utils/connections/chat/ChatConnection";
import ChatDialog from './Dialog.vue';
import ChatList from './components/ChatList.vue';

export default {
    components: { ChatDialog, ChatList },
    name: "ChatElement",
    data() {
        return {
            user: undefined,
            online: false,
            userList: [],
            reconnect: undefined,
            connection: undefined
        }
    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem('user'));

        this.connection = new ChatConnection().intercept(this);

        this.connection.onOpen(() => {
            this.online = true;
            this.connection.call('getUsers', { user: this.user });
        })
        .onClose(() => {
            this.online = false;
        })
        
    },
    methods: {
        openChat(dst) {
            const url = `/chat?user=${dst.id}`;

            window.history.replaceState({}, '', url);
        },
        sendMessage(message) {
            // 1. Prepare message
            // 2. call connection method 'sendMessage'

            message.user = this.user;
            this.connection.call('sendMessage', message);
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

    .dialog {
        margin: 20px;
        
    }
</style>