<template lang="">
    <div class="pesonal">
        <avatar-icon :avatar="user.avatar" :online="true"/>

        <div class="personal__parameter">
            <div class="personal__parameter-title">First name: </div>
            <div v-if="!edit" class="personal__parameter-value">{{ user.first_name }}</div>
            <input-ui v-if="edit" v-model:value="user.first_name" />
        </div>

        <div class="personal__parameter">
            <div class="personal__parameter-title">Last name: </div>
            <div v-if="!edit" class="personal__parameter-value">{{ user.last_name }}</div>
            <input-ui v-if="edit" v-model:value="user.last_name" />
        </div>

        <div class="personal__parameter">
            <div class="personal__parameter-title">Email: </div>
            <div v-if="!edit" class="personal__parameter-value">{{ user.email }}</div>
            <input-ui v-if="edit" v-model:value="user.email" />
        </div>

        <div class="personal__parameter">
            <div class="personal__parameter-title">Status: </div>
            <div v-if="user.online" class="personal__parameter-value online">{{ status }}</div>
            <div v-else class="personal__parameter-value offline">{{ status }}</div>
        </div>
        
        <div class="personal__edit">
            <button-ui v-if="!edit" type="primary" @click="edit = true">Edit</button-ui>
            <button-ui v-if="edit"  type="success">Submit</button-ui>
            <button-ui v-if="edit"  type="warning" @click="edit = false">Cancel</button-ui>
        </div>
    </div>
</template>
<script>
import authGuard from '@/mixins/authGuard';

export default {
    name: 'personal-cabinet',
    mixins: [authGuard],
    data() {
        return {
            user: this.$store.state.authModule.user,
            edit: false
        }
    },
    computed: {
        status() {
            if (this.user.online) {
                return 'online'
            } else {
                return `Last visit: 23.04 16:37`;
            }
        }
    }
}
</script>
<style lang="scss">
    .personal {
        &__parameter {
            display: flex;
            padding: 10px 20px;
            border-bottom: 1px solid var(--gray-ui);

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

        &__edit {
            padding: 10px;

            button {
                width: 100px;
                margin-right: 20px;
            }
        }
    }
</style>