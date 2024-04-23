export const authModule = {
    state: () => ({
        authenticated: !!localStorage.getItem('apiToken'),
        user: JSON.parse(localStorage.getItem('user'))
    })
}