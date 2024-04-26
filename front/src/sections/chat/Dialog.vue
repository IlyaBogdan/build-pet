
<template>
    <div class="container dialog" v-if="chat">
        <div class="chat-info">
            <avatar-icon class="chat-info__avatar" :avatar="chatInfo.avatar" />
            <div class="chat-info__title" >{{ chatInfo.title }}</div>
        </div>
        <div class="dialog-messages">
            <div class="dialog-messages__content" ref="messagesContainer">
                <div v-for="(message, index) in chat.messages" :key="message.id">
                    <dialog-message :next="nextAuthor(index)" :message="message"/>
                </div>
            </div>
        </div>
        <send-message-field 
            @sendMessage="send" 
            @typing="setTyping"
        />
    </div>
</template>
<script>
/**
 * TODO
 * 1) Groping messages by date like VK
 * 2) Show, if other user typing message
 * 3) Time view
 * 4) Prop "Chat" with structure bt reference
 */

import DialogMessage from './components/DialogMessage.vue';
import SendMessageField from './components/SendMessageField.vue';
import chatMixin from '@/mixins/chat';
import imgMixin from '@/mixins/img';

export default {
    components: { DialogMessage, SendMessageField },
    mixins: [ chatMixin, imgMixin ],
    name: "chat-dialog",
    data() {
        return {
            chat: undefined,
        }
    },
    watch: {
        chat(chat) {
            if (chat) {
                const interval = setInterval(() => {
                    if (this.scrollToLastMessage()) clearInterval(interval);
                }, 100);
            }            
        }
    },
    methods: {
        nextAuthor(index) {
            if (index + 1 != this.chat.messages.length) {
                return this.chat.messages[index + 1].user;
            }

            return undefined;
        },
        send(message) {

            const messageFormated = {
                date: new Date(),
                content: message,
                author: this.user
            }

            this.connection.call('sendMessage', { chat: this.chat, message: messageFormated });
        },
        setTyping() {

        },
        scrollToLastMessage() {
            
            const lastMessageElement = this.$refs.messagesContainer?.lastElementChild;
            if (lastMessageElement) {
                lastMessageElement?.scrollIntoView({behavior: 'smooth'});
                return true;
            }
            return false;
        }
    },
    mounted() {
        const chatId = parseInt(this.$route.query.id);
        const userId = parseInt(this.$route.query.user);

        if (chatId) {
            this.connection.call('getChat', { chat: { id: chatId } });
        } else if (userId) {
            this.connection.call('createChat', { users: [this.user.id, userId] });
        }
    },
    computed: {
        chatInfo() {
            if (this.chat) {
                let chatInfo = {};
                if (this.chat.type == 0) {
                    const oponent = this.chat.users.filter((user) => user.id != this.user.id)[0];
                    chatInfo.title = `${oponent.first_name} ${oponent.last_name}`;
                    chatInfo.avatar = oponent.avatar;
                }
                if (this.chat.type == 1) {
                    chatInfo.title = 'chat';
                    chatInfo.avatar = this.avatar;
                } 

                return chatInfo;
            }
            return {};
        }
    }
}
</script>
<style lang="scss">
    .chat-info {
        padding: 15px;
        display: flex;
        align-items: center;

        &__avatar {
            cursor: pointer;
        }

        &__title {
            margin-left: 15px;
            cursor: pointer;
        }
    } 
    
    .dialog {
        position: relative;
        &-messages {
            &__content {
                height: calc(var(--container-height) - 70px);
                overflow-y: scroll;

                &::-webkit-scrollbar {
                    display: none;
                }
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */


                .dialog-message {
                    margin-bottom: 20px;
                    &.grouped {
                        margin-bottom: 2px;
                    }
                }
            }
        }

        .send-message {
            position: absolute;
            bottom: 0;
            left: 0;
        }
    }
</style>