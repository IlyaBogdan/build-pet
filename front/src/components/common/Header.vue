<template lang="">
    <header :class="{'authenticated': $store.state.authModule.authenticated }">
        <div class="content guest__content" v-if="!$store.state.authModule.authenticated">
            <nav class="guest__content-nav">
                <router-link to="/personal">About</router-link>
                <router-link to="/personal">About</router-link>
                <router-link to="/personal">About</router-link>
                <router-link to="/personal">About</router-link>
            </nav>
            <div class="auth_status guest__content-auth">
                <button-ui id="sign-in_btn" type="success" @click="changeLoc('/sign-in')">Sign In</button-ui>
                <button-ui id="sign-up_btn" type="primary" @click="changeLoc('/sign-up')">Sign Up</button-ui>
            </div>
        </div>
        <div class="content authenticated__content" v-if="$store.state.authModule.user">
            <logo-full :class="{ 'opened': $store.state.sideBar.opened }" @click="openSideBar"/>
            <nav class="authenticated__content-nav">
                <router-link to="/personal">About</router-link>
                <router-link to="/personal">About</router-link>
                <router-link to="/personal">About</router-link>
                <router-link to="/personal">About</router-link>
            </nav>
            <div class="auth_status authenticated__content-profile">
                <router-link to="/personal" class="authenticated__content-info">
                    <div class="username">{{ $store.state.authModule.user.first_name }}</div>
                    <avatar-icon :avatar="userAvatar"/>
                </router-link>
                <button-ui type="primary" @click="logout">Logout</button-ui>
            </div>
        </div>
    </header>
</template>
<script>
import { API } from '@/utils/API';
import LogoFull from "./Logo.vue";

export default {
    components: { LogoFull },
    name: "HeaderElement",
    methods: {
        logout() {
            API.logout()
                .then(() => {
                    window.location.href = "/";
                });
        },
        changeLoc(loc) {
            window.location.href = loc;
        },
        openSideBar() {
            console.log('Open side bar');
            this.$store.commit('setOpened', true);
            console.log(this.$store.state.sideBar.opened);
        }
    },
    computed: {
        userAvatar() {
            return this.$store.state.authModule.user.avatar ? `${process.env.VUE_APP_BACKEND_PUBLIC}${this.$store.state.authModule.user.avatar}` : '';
        }
    }
}

</script>
<style lang="scss" scoped>
    header {
        .content {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 15px 0;

            nav {
                display: flex;
                align-items: center;
                a {
                    margin-left: 15px;
                    &:last-child {
                        margin-right: 15px;
                    }
                }
            }
            .auth_status {
                display: flex;
                align-items: center;
                min-width: 200px;
                justify-content: space-around;
            }
        }


        .guest__content {
            &-auth {
                
            }
        }

        &.authenticated {
            .authenticated__content {
                
                background-color: var(--lavanda-ui);
                &-nav {
                    flex-grow: 1;
                    a {
                        color: white;
                    }
                }

                &-profile {
                    margin-right: 20px;
                }

                &-info {
                    display: flex;
                    align-items: center;
                    color: white;
                    margin-right: 20px;

                    &:hover {
                        color: rgb(168, 168, 168);
                        text-decoration: none;
                    }
                    .username {
                        margin-right: 10px; 
                    }
                }

                .logo {
                    margin-left: 10px;
                    cursor: pointer;
                    transition: .3s all;
                    &.opened {
                        margin-left: -150px;
                    }
                }
            }
        }
    }
</style>