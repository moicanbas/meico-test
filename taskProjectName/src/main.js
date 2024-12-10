import "@/assets/styles.css";
import 'primeicons/primeicons.css'

import PrimeVue from 'primevue/config';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Aura from '@primevue/themes/aura';

import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Button from 'primevue/button';
import Password from 'primevue/password';
import Dialog from 'primevue/dialog'
import ProgressSpinner from 'primevue/progressspinner'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
 });

app.component('InputText', InputText)
app.component('FloatLabel', FloatLabel)
app.component('Button', Button)
app.component('Password', Password)
app.component('Dialog', Dialog)
app.component('ProgressSpinner', ProgressSpinner)

app.mount('#app')

