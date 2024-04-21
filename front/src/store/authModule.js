export const authModule = {
    state: () => ({
        authenticated: !!localStorage.getItem('apiToken')
    })
}