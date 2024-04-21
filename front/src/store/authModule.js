export const authModule = {
    state: () => ({
        authenticated: false
    }),
    getters: {

    },
    mutations: {
        setAuth(state, auth) {
            state.authenticated = auth;
        }
    },
    actions: {

    }
}