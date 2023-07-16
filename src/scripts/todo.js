import { createApp } from 'vue'
import App from '../components/vue/todo.vue'
import { createPinia } from 'pinia'

createApp(App).use(createPinia()).mount('#app');