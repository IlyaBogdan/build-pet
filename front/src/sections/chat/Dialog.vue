
<template>
    <div class="container dialog" v-if="chat">
        <div class="chat-info">
            <avatar-icon class="chat-info__avatar" :avatar="chatInfo.avatar" :online="chatInfo.online" />
            <div class="chat-info__title" >{{ chatInfo.title }}</div>
            <div v-if="chatInfo.typing" class="chat-info__typing" >
                <div class="text">{{ chatInfo.shortName }} typing</div>
                <div class="typing">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
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
            typingUsers: []
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
        setTyping(state) {
            this.connection.call('setTyping', { chat: this.chat, user: this.user, typing: state });
        },
        scrollToLastMessage() {
            
            const lastMessageElement = this.$refs.messagesContainer?.lastElementChild;
            if (lastMessageElement) {
                lastMessageElement?.scrollIntoView({behavior: 'smooth'});
                return true;
            }
            return false;
        },
        showUserTyping(state) {
            const typingState = state.state;
            const userId = state.user.id;
            if (typingState) {
                this.typingUsers.push(userId);
            } else {
                this.typingUsers = this.typingUsers.filter(id => id != userId);
            }
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
                    chatInfo.id = oponent.id;
                    chatInfo.title = `${oponent.first_name} ${oponent.last_name}`;
                    chatInfo.avatar = this.staticUrl(oponent.avatar);
                    chatInfo.typing = this.typingUsers.indexOf(oponent.id) != -1;
                    chatInfo.shortName = oponent.first_name;
                    chatInfo.online = this.chat.online.indexOf(oponent.id) != -1;

                    this.connection.call('getOnlineUsers', { users: [oponent.id] });
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
    .dialog {
        position: relative;
        .chat-info {
            padding: 15px;
            height: 10%;
            display: flex;
            align-items: center;
            border-bottom: 1px solid var(--gray-ui);
            margin-bottom: 10px;

            &__avatar {
                cursor: pointer;
            }

            &__title {
                margin-left: 15px;
                cursor: pointer;
            }

            &__typing {
                display: flex;
                padding: 10px;
                margin-bottom: -3px;

                .text {
                    font-size: 14px;
                    animation: colorChange 1.8s infinite ease-in-out;
                    color: #6CAD96;
                }

                .typing {
                    align-items: end;
                    display: flex;
                    height: 17px;
                    margin-left: 5px;

                    .dot {
                        animation: mercuryTypingAnimation 1.8s infinite ease-in-out;
                        background-color: #6CAD96;
                        border-radius: 50%;
                        height: 7px;
                        margin-right: 4px;
                        vertical-align: middle;
                        width: 7px;
                        display: inline-block;

                        &:nth-child(1) {
                            animation-delay: 200ms;
                        }
                        &:nth-child(2) {
                            animation-delay: 300ms;
                        }
                        &:nth-child(3) {
                            animation-delay: 400ms;
                        }
                        &:last-child {
                            margin-right: 0;
                        }
                    }
                }
            
            }

            @keyframes colorChange {
                0% { color:#6CAD96; }
                28% { color:#9ECAB9; }
                44% { color: #B5D9CB; }
            }
            
            @keyframes mercuryTypingAnimation {
                0% {
                    transform: translateY(0px);
                    background-color:#6CAD96;
                }
                28% {
                    transform: translateY(-7px);
                    background-color:#9ECAB9;
                }
                44% {
                    transform: translateY(0px);
                    background-color: #B5D9CB;
                }
            }
            
        } 
    
        .dialog-messages {
            height: calc(var(--container-height) - 150px);
            overflow-y: scroll;
            padding: 0 10px;

            &::-webkit-scrollbar {
                display: none;
            }
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */

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
            position: absolute;
            bottom: 0;
            width: 100%;
        }
    }
</style>