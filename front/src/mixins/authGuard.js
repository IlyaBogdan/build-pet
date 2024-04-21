export default {
    mounted() {
        if (!this.$store.state.authenticated) window.location.href = '/sign-in'
    },
}