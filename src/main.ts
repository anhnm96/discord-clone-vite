import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import router from './router'
import pinia from './plugins/pinia'
import { Form, Field, ErrorMessage } from 'vee-validate'
import Avatar from '@/components/base/Avatar.vue'
import Dropdown from '@/components/base/Dropdown.vue'
import BButton from '@/components/base/BButton.vue'
import PingIcon from '@/components/PingIcon.vue'

const app = createApp(App)
app.component('Avatar', Avatar)
app.component('BButton', BButton)
app.component('Dropdown', Dropdown)
app.component('PingIcon', PingIcon)
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.use(router)
app.use(pinia)

app.mount('#app')
