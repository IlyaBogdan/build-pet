<template lang="">
    <div v-if="userList.length" class="user-list">
        <div v-for="(user, index) in userList" :key="index">
            <div class="user-list__item">
                <avatar-icon :avatar="staticUrl(user?.avatar)"/>
                <div class="user-content">
                    <router-link :to="`/users/${user.id}`">{{ username(user) }}</router-link>
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
import imgMixin from '@/mixins/img';

export default {
    name: 'users-list',
    mixins: [ chatMixin, imgMixin ],
    data() {
        return {
            userList: [],
        }
    },  
    methods: {
        username(user) {
            return `${user.first_name} ${user.last_name}`;
        }
    },
    mounted() {
        this.connection.call('getUsers', { user: this.user});
    },
}
</script>
<style lang="scss">
    .user-list {
        &__item {
            width: calc(100% - 20px);
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