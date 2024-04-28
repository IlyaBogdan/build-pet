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
        }
    }
}