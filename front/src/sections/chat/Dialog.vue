
<template>
    <div class="dialog">
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
import Ava1 from '@/assets/billy-herrington.webp';
import Ava2 from '@/assets/van.webp';


const user1 = { username: "Billy", id: '4527135', avatar: Ava1, typing: false };
const user2 = { username: "Van", id: '4527135', avatar: Ava2, typing: false };

const Chat = {
    users: [user1, user2],
    messages: [
        { id: 'asdasas12eafs', type: 'out', date: new Date(), content: 'Hello! How are you?', user: user1},
        { id: 'asdasas1214ac', type: 'in', date: new Date(), content: 'Good. Nice cook!', user: user2},
        { id: 'hfdsg32tsgdfa', type: 'out', date: new Date(), content: 'Fisting 300 bucks', user: user1},
        { id: 'trjdhfbvcacer', type: 'out', date: new Date(), content: 'Are you agree?', user: user1},
        { id: 'mnrbevscwetts', type: 'in', date: new Date(), content: 'YES!!!', user: user2},
    ]
}

export default {
    components: { DialogMessage, SendMessageField },
    name: "chat-dialog",
    data() {
        return {
            chat: Chat
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

}
</script>
<style lang="scss">
    .dialog {

        padding: 15px;
        border: 3px solid var(--gray-ui);
        width: 800px;

        &-messages {

            padding: 20px;

            &__content {
                .dialog-message {
                    margin-bottom: 20px;
                    &.grouped {
                        margin-bottom: 2px;
                    }
                }
            }
        }

        .send-message {
            margin: 20px;
        }
    }
</style>