import { ChatConnection } from "@/utils/connections/chat/ChatConnection.js";

export default {
    data() {
        return {
            connection: undefined,
            user: undefined
        }
    },
    mounted() {
        this.user = this.$store.state.authModule.user;
        this.connection = new ChatConnection().intercept(this);
        this.connection.onOpen(() => {
            this.online = true;
            this.connection.call('pull', { token: localStorage.getItem('apiToken') });
        })
        .onClose(() => {
            this.online = false;
        })
    },
    methods: {
        sendMessage(message) {
            message.user = this.user;
            this.connection.call('sendMessage', message);
        },
        convertChatInfo(chat) {
            let chatInfo = {};
            if (chat.type == 0) {
                const oponent = chat.users.filter((user) => user.id != this.user.id)[0];
                chatInfo.id = oponent.id;
                chatInfo.title = `${oponent.first_name} ${oponent.last_name}`;
                chatInfo.avatar = this.staticUrl(oponent.avatar);
                //chatInfo.typing = this.typingUsers.indexOf(oponent.id) != -1;
                chatInfo.shortName = oponent.first_name;
                //chatInfo.online = this.chat.online.indexOf(oponent.id) != -1;

                //this.connection.call('getOnlineUsers', { users: [oponent.id] });
            }
            if (chat.type == 1) {
                chatInfo.title = 'chat';
                chatInfo.avatar = this.avatar;
            } 

            return chatInfo;
        }
    }
}