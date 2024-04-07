<template lang="">
    <div v-if="userList.length" class="user-list">
        <div v-for="(user, index) in userList" :key="index">
            <div class="user-list__item">
                <div class="user-avatar">
                    <img :src="user.avatar ?? noAvatarIcon" /> 
                </div>
                <div class="user-content">
                    <router-link :to="`/users/${user.id}`">{{ user.username }}</router-link>
                    <div class="actions">
                        <router-link :to="`/dialog?user=${user.id}`">Message</router-link>
                        <router-link :to="`/call?user=${user.id}`">Call</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        no users
    </div>
</template>
<script>
import chatMixin from '@/mixins/chat';
import noIcon from '@/assets/no-icon.png';

export default {
    name: 'users-list',
    mixins: [ chatMixin ],
    data() {
        return {
            userList: [],
            noAvatarIcon: noIcon
        }
    },  
    methods: {

    },
    mounted() {
        this.connection.call('getUsers', { user: this.user});
    },
}
</script>
<style lang="scss">
    .user-list {

        width: 500px;

        &__item {
            width: 100%;
            border-bottom: 1px solid var(--gray-ui);
            display: flex;
            padding: 10px;

            .user-avatar {
                img {
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                }
                
            }

            .user-content {
                margin-left: 10px;
            }

            .actions {
                a {
                    font-size: 10px;
                    margin-left: 10px;
                }
            }
        }
    }
</style>