<template lang="">
    <div class="send-message">
        <textarea 
            @keyup.enter="send"
            @input="checkSize"
            v-model="message"
            @focus="$emit('typing', true)"
            @blur="$emit('typing', false)"
        ></textarea>
        <button-ui @click="send" type="primary">Send</button-ui>
    </div>
</template>
<script>
export default {
    name: "send-message-field",
    data() {
        return {
            message: ''
        }
    },
    methods: {
        send() {
            if (this.message.length) {
                this.$emit('sendMessage', this.message);
                this.$emit('typing', false);
                this.message = '';
            }
        },
        mounted() {
            const tx = document.getElementsByTagName("textarea")[0];

            tx.setAttribute("style", "height:" + (tx[0].scrollHeight) + "px;overflow-y:hidden;");
            tx.addEventListener("input", function() {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + "px";
            }, false);
        }
    }
}
</script>
<style lang="scss">
    .send-message {
        display: flex;

        .input-ui {
            padding: 0;
            margin-right: 15px;
            display: inline-block;
        }
    }
</style>