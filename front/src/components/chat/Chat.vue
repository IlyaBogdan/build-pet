<template>
    <div>
        <div class="status" :data-online="online">{{ online ? 'Online' : 'Disconnected' }}</div>
    </div>
</template>

<script>
    export default {
        name: "ChatElement",
        data() {
            return {
                online: false,
                connection: undefined
            }
        },
        mounted() {
            this.connection = new WebSocket('ws://localhost:3000');

            this.connection.onopen = () => {
                this.online = true;
            }
        }
    }
</script>

<style lang="scss">
    .status {
        text-transform: uppercase;

        border-radius: 15px;
        padding: 10px 15px;
        width: 150px;
        text-align: center;
        font-size: 16px;
        font-weight: 600;
        color: rgb(255, 255, 255);

        &[data-online="false"] {
            background-color: rgb(182, 43, 43);
        }

        &[data-online="true"] {
            background-color: rgb(74, 194, 50);
        }
    }
</style>