import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia"
import { createNotivue } from 'notivue';
import 'notivue/notification.css';
import 'notivue/animations.css';
import 'notivue/notification-progress.css';
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App)
const notivue = createNotivue({
    position: "botton-right",
    limit: 5,
    notifications: {
        global: {
            duration: 2000
        }
    }
});

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

app.use(pinia)
app.use(router)
app.use(notivue);
app.mount('#app')
