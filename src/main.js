import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import CopyComponent from '@/components/CopyComponent.vue'
import MapComponent from '@/components/MapComponent.vue'
import ToastComponent from '@/components/ToastComponent.vue'
import SearchComponent from '@/components/SearchComponent.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import PictureComponent from '@/components/PictureComponent.vue'
import piniaPersist from 'pinia-plugin-persist'
import VueFeather from 'vue-feather'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/style/common.stylus'

const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)
app.component(VueFeather.name, VueFeather)
app.component('copy-component', CopyComponent)
app.component('map-component', MapComponent)
app.component('toast-component', ToastComponent)
app.component('search-component', SearchComponent)
app.component('pagination-component', PaginationComponent)
app.component('picture-component', PictureComponent)

app.use(pinia)
app.use(router)
app.mount('#app')
