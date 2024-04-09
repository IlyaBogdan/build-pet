<template>
    <div v-if="user && user.chats.length">
        <div v-for="(chat, index) in user.chats" :key="index">
            <div>{{ chat.id }}</div>
        </div>
    </div>
    <div v-else>
        <div>
            You don't have any dialogs
        </div>
    </div>
</template>

<script>
/**
 * TODO
 * 1) Open chat whit other users by link
 * 2) 
 */


//import { ChatConnection } from "@/utils/connections/chat/ChatConnection";
//import ChatDialog from './Dialog.vue';
//import ChatList from './components/ChatList.vue';
import chatMixin from '@/mixins/chat';

export default {
    components: {  },
    mixins: [ chatMixin ],
    name: "chat-element",
    data() {
        return {
            user: undefined,
            online: false,
            connection: undefined
        }
    },
    mounted() {
        this.connection.call('chatList', { user: this.user.id });
    },
    methods: {
        openChat(dst) {
            const url = `/chat?user=${dst.id}`;

            window.history.replaceState({}, '', url);
        },
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