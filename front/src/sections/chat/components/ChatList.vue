<template lang="">
    <div class="user-list" v-if="users.length">
        <div class="user-list-title">Users: </div>
        <div class="user-list-items">
            <div class="user-list-item" v-for="(user) in users" :key="user.id">
                <div>{{ user.username }}</div>
                <link-ui @click="openChat(user)">Message</link-ui>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "chat-list",
    props: {
        users: {
            type: Array
        }
    }
}
</script>
<style lang="scss">
    .user-list {
        display: flex;
        flex-direction: column;

        .user-list-items {
            display: flex;
            flex-direction: column;

            .user-list-item {
                margin-top: 10px;
                display: flex;
                justify-content: space-between;

            }
        }
    }
</style>