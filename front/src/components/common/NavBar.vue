<template lang="">
    <nav v-if="$store.state.authModule.authenticated" class="sidebar" :class="{ 'opened': opened }">
        <close-btn @click="close"/>
        <router-link class="logo" to="/">
            <logo-full />
        </router-link>
        <router-link to="/users">Users</router-link>
        <router-link to="/messanger">Messanger</router-link>
    </nav>
</template>
<script>

import LogoFull from "./Logo.vue";

export default {
    components: { LogoFull },
    methods: {
        close() {
            this.$store.commit('setOpened', false);
            console.log(this.$store.state.sideBar.opened);
        }
    },
    computed: {
        opened() {
            return this.$store.state.sideBar.opened;
        }
    }
}
</script>
<style lang="scss">
    .sidebar {
        background-color: var(--gray-ui);
        display: flex;
        flex-direction: column;
        width: 0;
        overflow: hidden;
        position: relative;
        transition: .3s all;
        height: 100vh;

        &.opened {
            width: 240px;
        }

        .logo {
           width: 200px !important; 
        }

        .close-btn {
            position: absolute;
            right: 10px;
            top: 5px;
            z-index: 10;
        }

        a {
            padding: 10px 20px;
            min-width: 200px;
        }
    }
</style>