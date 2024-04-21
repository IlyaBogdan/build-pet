import { createApp } from 'vue';
import App from './App.vue';
import components from './components/UI/index.js';
import componentsCommon from './components/common/index.js';
import { router } from './router';
import store from './store/index.js';
import '../styles.scss';

const app = createApp(App);

components.concat(componentsCommon).forEach((component) => {
    app.component(component.name, component);
});

app
    .use(router)
    .use(store)
    .mount('#app');
