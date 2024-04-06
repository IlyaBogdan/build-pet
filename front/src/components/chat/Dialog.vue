
<template>
    <div class="dialog">
        <div class="dialog-messages">
            <div class="dialog-messages__content">
                <div v-for="(message, index) in messages" :key="message.id">
                    <dialog-message :next="nextAuthor(index)" :message="message"/>
                </div>
            </div>
        </div>

        <send-message-field @sendMessage="send" />
    </div>
</template>
<script>

import DialogMessage from './components/DialogMessage.vue';
import SendMessageField from './components/SendMessageField.vue';
import Ava1 from '@/assets/billy-herrington.webp';
import Ava2 from '@/assets/van.webp';

const user1 = { username: "Billy", id: '4527135', avatar: Ava1 };
const user2 = { username: "Van", id: '4527135', avatar: Ava2 }

export default {
    components: { DialogMessage, SendMessageField },
    name: "chat-dialog",
    data() {
        return {
            messages: [
                { id: 'asdasas12eafs', type: 'out', date: new Date(), content: 'Hello! How are you?', user: user1},
                { id: 'asdasas1214ac', type: 'in', date: new Date(), content: 'Good. Nice cook!', user: user2},
                { id: 'hfdsg32tsgdfa', type: 'out', date: new Date(), content: 'Fisting 300 bucks', user: user1},
                { id: 'trjdhfbvcacer', type: 'out', date: new Date(), content: 'Are you agree?', user: user1},
                { id: 'mnrbevscwetts', type: 'in', date: new Date(), content: 'YES!!!', user: user2},
            ]
        }
    },
    methods: {
        nextAuthor(index) {
            if (index + 1 != this.messages.length) {
                return this.messages[index + 1].user;
            }

            return undefined;
        },
        send(message) {
            this.messages.push({
                user: user1,
                type: 'out',
                date: new Date(),
                content: message
            });
            console.log(message);
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