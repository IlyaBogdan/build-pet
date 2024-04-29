<template lang="">
    <div class="pesonal" v-if="user">
        <pre-loader v-if="loading"/>
        <div class="personal__parameter avatar">
            <avatar-icon :avatar="avatarImage" :online="true"/>
            <upload-file 
                title="Change"
                accept="image/*"
                @selected="avatarPreview"
            />            
        </div>

        <div class="personal__parameter">
            <div class="personal__parameter-title">First name: </div>
            <div v-if="!edit" class="personal__parameter-value">{{ user.first_name }}</div>
            <input-ui v-if="edit" v-model:value="clone.first_name" />
        </div>

        <div class="personal__parameter">
            <div class="personal__parameter-title">Last name: </div>
            <div v-if="!edit" class="personal__parameter-value">{{ user.last_name }}</div>
            <input-ui v-if="edit" v-model:value="clone.last_name" />
        </div>

        <div class="personal__parameter">
            <div class="personal__parameter-title">Email: </div>
            <div v-if="!edit" class="personal__parameter-value">{{ user.email }}</div>
            <input-ui v-if="edit" v-model:value="clone.email" />
        </div>

        <div class="personal__parameter">
            <div class="personal__parameter-title">Status: </div>
            <div v-if="user.online" class="personal__parameter-value online">{{ status }}</div>
            <div v-else class="personal__parameter-value offline">{{ status }}</div>
        </div>
        
        <div class="personal__edit">
            <button-ui v-if="!edit" type="primary" @click="edit = true">Edit</button-ui>
            <button-ui v-if="edit"  type="success" @click="submit">Submit</button-ui>
            <button-ui v-if="edit"  type="warning" @click="edit = false">Cancel</button-ui>
        </div>
    </div>
</template>
<script>
import authGuard from '@/mixins/authGuard';
import imgMixin from '@/mixins/img';
import { API } from '@/utils/API';

export default {
    name: 'personal-cabinet',
    mixins: [authGuard, imgMixin],
    data() {
        return {
            user: this.$store.state.authModule.user,
            edit: false,
            clone: {},
            avatar: null,
            loading: false
        }
    },
    mounted() {
        if (!this.user) this.getUser();
    },
    watch: {
        edit() {
            if (this.edit) {
                this.clone = Object.assign({}, this.user);
            }
        },
    },  
    methods: {
        submit() {
            const { first_name, last_name, email } = this.clone;
            const data = { first_name, last_name, email };
            this.loading = true;
            API.updateProfile(data)
                .then((result) => { 
                    this.user = result;
                    this.$store.commit('setAuthUser', result);
                    this.edit = false;
                    this.loading = false;
                });
        },
        avatarPreview(avatar) {
            const reader = new FileReader();
            reader.onload = () => {
                this.avatar = reader.result;
                this.updateAvatar();
            }
            if (avatar) reader.readAsDataURL(avatar);
        },
        updateAvatar() {
            API.updateAvatar(this.avatar);
        },
        getUser() {
            API.getAuthUserInfo()
                .then((response) => {
                    this.$store.commit('setAuthUser', response);
                })
        }
    },
    computed: {
        status() {
            if (this.user.online) {
                return 'online'
            } else {
                return `Last visit: 23.04 16:37`;
            }
        },
        avatarImage() {
            return this.avatar ?? this.staticUrl(this.user.avatar);
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

            &.avatar {
                align-items: end;

                .input-file {
                    margin-left: 10px;
                }
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

        &__edit {
            padding: 10px;

            button {
                width: 100px;
                margin-right: 20px;
            }
        }
    }
</style>