import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requireAuth: true }
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
    if (!auth.logined) {
      next({ path: '/signIn' })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
