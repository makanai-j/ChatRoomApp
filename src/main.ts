import { createApp } from 'vue'
import './style.css'
import '@unocss/reset/tailwind.css'
import './my-reset-css.css'
import router from './router/index.ts'
import App from './App.vue'

createApp(App).use(router).mount('#app')
