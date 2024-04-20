<template>
    <div>
        <form>
            <input-ui label="Login" v-model="login"/>
            <input-ui label="Password" v-model="password"/>
            <button-ui type="primary" @click="loginHandle" >Sign In</button-ui>
        </form>

        <router-link to="/sign-up">Sign Up</router-link>
    </div>
</template>
<script>
import { API } from '@/utils/API.js';

export default {
    data() {
        return {
            login: undefined,
            password: undefined
        }
    },
    methods: {
        loginHandle() {
            API.login(this.login, this.password)
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