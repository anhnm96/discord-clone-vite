import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/Home.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('./pages/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./pages/Login.vue'),
  },
  {
    path: '/channels/me',
    name: 'Channels',
    component: () => import('./pages/Home.vue'),
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
