export const sideBar = {
    state: () => ({
        opened: localStorage.getItem('sidebar.opened') === "true"
    }),
    mutations: {
        setOpened (state, value) {
            state.opened = value;
            localStorage.setItem('sidebar.opened', value);
        }
    }
}