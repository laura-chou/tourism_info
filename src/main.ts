import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'

import piniaPluginPersistedstate  from 'pinia-plugin-persistedstate'
import VueFeather from 'vue-feather'
import CopyComponent from '@/components/CopyComponent.vue'
import MapComponent from '@/components/MapComponent.vue'
import ToastComponent from '@/components/ToastComponent.vue'
import PictureComponent from '@/components/PictureComponent.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/style/common.stylus'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.component('VueFeather', VueFeather)
app.component('copy-component', CopyComponent)
app.component('map-component', MapComponent)
app.component('toast-component', ToastComponent)
app.component('picture-component', PictureComponent)

app.use(pinia)
app.use(router)
app.mount('#app')
