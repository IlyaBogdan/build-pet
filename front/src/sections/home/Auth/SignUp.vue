<template>
    <div>
        <form>
            <input-ui label="Login" />
            <input-ui label="Password"/>
            <input-ui label="Password repeat"/>
            <button-ui type="primary" @click="signUp">Register</button-ui>
        </form>

        <router-link to="/sign-in">Sign In</router-link>
    </div>
</template>
<script>
import { API } from '@/utils/API.js';

export default {
    data() {
        return {
            login: undefined,
            password: undefined,
            passwordsEquals: false,
        }
    },
    methods: {
        signUp() {
            API.signUp(this.login, this.password)
                .then((response) => {
                    // redirect
                    console.log(response);
                });
        }
    }
}
</script>
<style lang="scss">
    
</style>