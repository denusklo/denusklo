import { createApp } from 'vue'
import AppContainer from '../components/vue/apps/AppContainer.vue'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(AppContainer)

app.use(pinia)
app.mount('#app')