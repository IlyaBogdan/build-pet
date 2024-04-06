<template lang="">
    <div class="send-message">
        <input-ui v-model="message" />
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
            console.log(this.message);
        }
    }
}
</script>
<style lang="scss">
    .send-message {
        display: flex;

    }
</style>