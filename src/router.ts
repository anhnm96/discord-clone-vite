import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useUser } from '@/stores/user'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('./pages/Landing.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('./pages/Register.vue'),
    meta: {
      permission: {
        roles: ['guest'],
        noAccessRedirect: '/',
      },
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./pages/Login.vue'),
    meta: {
      permission: {
        roles: ['guest'],
        noAccessRedirect: '/',
      },
    },
  },
  {
    path: '/channels',
    name: 'Home',
    redirect: '/channels/me',
    component: () => import('./pages/Home.vue'),
    meta: {
      permission: {
        roles: ['user'],
        noAccessRedirect: '/login',
      },
    },
    children: [
      {
        path: 'me',
        component: () => import('./pages/Channels/Home.vue'),
        children: [
          { path: '', component: () => import('./pages/Channels/User.vue') },
          {
            name: 'DM',
            path: 'me/:id',
            component: () => import('./pages/Channels/Channel.vue'),
          },
        ],
      },
      {
        name: 'Guild',
        path: ':guildId/:channelId',
        component: () => import('./pages/Channels/Guild.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

interface Permission {
  roles: string[]
  noAccessRedirect: string
}

router.beforeEach((to, from, next) => {
  // const obj = mapStores(useUser)
  // const s = obj.userStore()
  const userStore = useUser()
  // If there are no permissions to check then proceed
  if (!to.meta.permission) return next()

  const { roles = [], noAccessRedirect } = to.meta.permission as Permission

  if (!roles.length) return next()

  if (userStore.isAuth && roles.includes('user')) return next()
  // routes for guests only
  if (!userStore.isAuth && roles.includes('guest')) return next()
  // No access!
  next(noAccessRedirect)
})

export default router
