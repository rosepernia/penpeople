import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//Importando archivo global de css
import "@/assets/_global.scss" 

createApp(App).use(store).use(router).mount('#app')

