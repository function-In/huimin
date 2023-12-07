import { createApp } from 'vue';
import App from './App.vue';
// Router
import router from './router';
// Bootstrap 5
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
// Element-Plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import { createPinia } from 'pinia';
createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(createPinia())
    .mount('#app')
