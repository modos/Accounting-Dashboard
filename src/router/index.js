import Vue from 'vue'
import Dashboard from '../views/Dashboard/Dashboard.vue'
import AccountReview from '../views/Dashboard/AccountReview.vue'
import VueRouter from 'vue-router'
import Main from '../views/Dashboard/Main.vue'
import Login from '../views/Login.vue'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        name: 'Main',
        path: '',
        component: Main
      },
      {
        path: 'accountreview',
        component: AccountReview
      }
    ]
  }
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next({name: 'Login'})
  } else {
    next()
  }
})

export default router
