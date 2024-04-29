import { createStore } from 'vuex';
import { authModule } from './authModule';
import { sideBar } from './sideBar';

export default createStore({
    modules: {
        authModule,
        sideBar
    }
});