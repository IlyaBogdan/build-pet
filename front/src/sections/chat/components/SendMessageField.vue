<template lang="">
    <div class="send-message">
        <textarea
            ref="textArea"
            @keyup.enter="send"
            v-model="message"
            @focus="$emit('typing', true)"
            @blur="$emit('typing', false)"
            @input="$emit('typing', true)"
        ></textarea>
        <button-ui @click="send" type="primary">Send</button-ui>
    </div>
</template>
<script>
export default {
    name: "send-message-field",
    data() {
        return {
            message: '',
            typing: false
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
            const tx = this.$refs("textArea");

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
        height: 70px;

        .input-ui {
            padding: 0;
            margin-right: 15px;
            display: inline-block;
        }
    }
</style>