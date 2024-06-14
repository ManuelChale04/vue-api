import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia' // Importa createPinia desde Pinia

const app = createApp(App)

app.use(router)
// Configura Pinia
const pinia = createPinia()
app.use(pinia)


app.mount('#app')
