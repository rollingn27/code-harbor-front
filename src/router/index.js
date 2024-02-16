import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

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
          component: () => import('../components/MainPage.vue')
        },
        {
          path: 'group',
          name: 'group',
          component: () => import('../components/GroupPage.vue')
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
    const loginStatus = localStorage.getItem('code-harbor-auth')

    if (loginStatus !== '로그인 성공' && !auth.logined) {
      next({ path: '/signIn' })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
