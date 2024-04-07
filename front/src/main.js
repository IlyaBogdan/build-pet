import { createApp } from 'vue';
import App from './App.vue';
import components from './components/UI/index.js';
import { router } from './router';
import '../styles.scss';

const app = createApp(App);

components.forEach((component) => {
    app.component(component.name, component);
});


app
    .use(router)
    .mount('#app');
