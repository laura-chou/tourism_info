import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoadData from '@/views/LoadData.vue'
import ShowData from '@/views/ShowData.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/:type',
      component: LoadData,
      children: [
        { path: ':region/:town', component: LoadData }
      ]
    },
    {
      path: '/show/:type',
      component: ShowData,
      children: [
        { path: ':region/:town', component: ShowData }
      ]
    },
    {
      path: '/404',
      component: NotFound
    }
  ]
})
export default router
