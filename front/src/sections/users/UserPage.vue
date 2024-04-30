<template lang="">
    <div class="pesonal" v-if="user">
        <div class="user__parameter avatar">
            <avatar-icon :avatar="staticUrl(user.avatar)" :online="true"/>         
        </div>

        <div class="user__parameter">
            <div class="user__parameter-title">First name: </div>
            <div class="user__parameter-value">{{ user.first_name }}</div>
        </div>

        <div class="user__parameter">
            <div class="user__parameter-title">Last name: </div>
            <div class="user__parameter-value">{{ user.last_name }}</div>
        </div>

        <div class="user__parameter">
            <div class="user__parameter-title">Email: </div>
            <div class="user__parameter-value">{{ user.email }}</div>
        </div>

        <div class="user__parameter">
            <div class="user__parameter-title">Status: </div>
            <div v-if="user.online" class="user__parameter-value online">{{ status }}</div>
            <div v-else class="user__parameter-value offline">{{ status }}</div>
        </div>
    </div>
</template>
<script>
import { API } from '@/utils/API';
import imgMixin from '@/mixins/img';

export default {
    name: 'user-page',
    mixins: [ imgMixin ],
    data() {
        return {
            user: undefined,
            status: 'online'
        }
    },
    methods: {
        getUserProfile() {

        }
    },
    mounted() {
        API.getUserProfile(this.$route.params.id)
            .then(userProfile => this.user = userProfile);
    }
}
</script>
<style lang="scss">
    .user {
        &__parameter {
            display: flex;
            padding: 10px 20px;
            border-bottom: 1px solid var(--gray-ui);

            &.avatar {
                align-items: end;
            }

            &-title {
                width: 100px;
            }
            &-value {
                &.online {
                    color: var(--green-ui);
                }
                &.offline {
                    color: var(--gray-ui);
                }
            }
        }
    }
</style>