<template>
    <div>
        <div>
            <div class="status" :data-online="online">{{ online ? 'Online' : 'Disconnected' }}</div>
            <div v-if="!online && reconnect">Trying to reconnecting after {{ reconnect }} s</div>
        </div>
        
        <user-list :users="userList"/>
        <chat-dialog />
    </div>
</template>

<script>
/**
 * TODO
 * 1) Open chat whit other users by link
 * 2) 
 */

import { useRouter, useRoute } from 'vue-router'

import { Chat } from "@/utils/Chat";
import { ChatInterceptor } from "@/utils/ChatInterceptor";
import ChatDialog from './Dialog.vue';
import UserList from './components/UsersList.vue';

const interceptor = new ChatInterceptor();
const chat = new Chat();

export default {
    components: { ChatDialog, UserList },
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

    .dialog {
        margin: 20px;
        
    }
</style>