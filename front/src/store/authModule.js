export const authModule = {
    state: () => ({
        authenticated: !!localStorage.getItem('apiToken'),
        user: JSON.parse(localStorage.getItem('user'))
    }),
    mutations: {
        setAuthUser(state, value) {
            state.user = value;
            localStorage.setItem('user', JSON.stringify(value));
        }
    }
}