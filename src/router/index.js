import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Chat',
    name: 'Chat',
    component: () => import('@/components/Chat.vue')
  },
  {
    path: '/MyChat',
    name: 'MyChat',
    component: () => import('@/components/MyChat.vue')
  },
  {
    path: '/Car',
    name: 'Car',
    component: () => import('@/components/Car.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
