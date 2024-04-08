
<template>
    <div class="container dialog">
        <div class="dialog-messages">
            <div class="dialog-messages__content">
                <div v-for="(message, index) in chat.messages" :key="message.id">
                    <dialog-message :next="nextAuthor(index)" :message="message"/>
                </div>
            </div>
        </div>

        <send-message-field 
            @sendMessage="send" 
            @typing="(typing) => $emit('typing', typing)"
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

export default {
    components: { DialogMessage, SendMessageField },
    mixins: [ chatMixin ],
    name: "chat-dialog",
    data() {
        return {
            chat: {}
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
            this.$emit('sendMessage', {
                date: new Date(),
                content: message,
                chat: this.chat
            });
        }
    },
    mounted() {
        const chatId = this.$route.query.id;
        const userId = this.$route.query.user;

        if (chatId) {
            console.log('getChat');
            this.connection.call('getChat', { chatId });
        } else if (userId) {
            console.log('createChat');
            this.connection.call('createChat', { users: [this.user.id, userId] });
        }
    }

}
</script>
<style lang="scss">
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