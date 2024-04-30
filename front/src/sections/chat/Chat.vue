<template>
    <div class="chat-list" v-if="chats && chats.length">
        <div class="chat" v-for="(chat, index) in chats.map(chat => convertChatInfo(chat))" :key="index">
            <avatar-icon class="chat-image" :avatar="chat.avatar" />
            <div class="chat-info">
                <div>{{ chat.title }}</div>
                <router-link :to="`/dialog?id=${chat.id}`">Message</router-link>
            </div>
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

import chatMixin from '@/mixins/chat';
import imgMixin from '@/mixins/img';

export default {
    components: {  },
    mixins: [ chatMixin, imgMixin ],
    name: "chat-element",
    data() {
        return {
            chats: undefined
        }
    },
    mounted() {
        this.connection.call('chatList', { user: this.user, token: localStorage.getItem('apiToken') });
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
    .chat-list {
        .chat {
            padding: 10px;
            display: flex;
            border-bottom: 1px solid var(--gray-ui);

            &-image {

            }

            &-info {
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                a {
                    font-size: 10px;
                }
            }
        }
    }
</style>