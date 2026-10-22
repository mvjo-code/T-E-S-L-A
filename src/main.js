// Ponto de entrada: cria o app Vue e "monta" ele dentro da <div id="app"> do index.html
import { createApp } from 'vue'
import App from './App.vue'
import './styles/base.css'

createApp(App).mount('#app')
