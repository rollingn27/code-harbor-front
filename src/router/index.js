import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { getLocalStorage } from '@/utils/code-harbor-util.js'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue'),
      meta: { requireAuth: true },
      children: [
        {
          path: '',
          name: 'main',
          component: () => import('../components/MainComponent.vue')
        },
        {
          path: '/share',
          name: 'share',
          component: () => import('../components/ShareComponent.vue')
        },
        {
          path: '/help',
          name: 'help',
          component: () => import('../components/HelpComponent.vue')
        },
        {
          path: '/group',
          name: 'group',
          component: () => import('../components/GroupComponent.vue')
        }
      ]
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: () => import('../views/SignIn.vue')
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: () => import('../views/SignUp.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.matched.some((routeInfo) => routeInfo.meta.requireAuth)) {
    const codeHarborStatus = getLocalStorage('code-harbor-auth')
    if (!codeHarborStatus && !auth.logined) {
      next({ path: '/signIn' })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
