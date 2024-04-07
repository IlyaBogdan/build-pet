import { ChatConnection } from "@/utils/connections/chat/ChatConnection.js";

export default {
    data() {
        return {
            connection: undefined,
            user: undefined
        }
    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.connection = new ChatConnection().intercept(this);
        this.connection.onOpen(() => {
            this.online = true;
        })
        .onClose(() => {
            this.online = false;
        })
    },
    methods: {
        sendMessage(message) {
            // 1. Prepare message
            // 2. call connection method 'sendMessage'

            message.user = this.user;
            this.connection.call('sendMessage', message);
        }
    }
}