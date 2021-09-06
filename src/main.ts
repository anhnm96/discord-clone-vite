import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import router from './router'
import pinia from './plugins/pinia'
import { Form, Field, ErrorMessage } from 'vee-validate'

const app = createApp(App)
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.use(router)
app.use(pinia)

app.mount('#app')
