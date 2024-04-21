export default {
    mounted() {
        if (!this.$store.state.authModule.authenticated) window.location.href = '/sign-in';
    },
}