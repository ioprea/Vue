import Vue from 'vue'
import VueRouter from 'vue-router'
import GMap from '../components/home/GMap.vue'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'GMap',
    component: GMap,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "about" */ '../components/auth/Signup.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../components/auth/Login.vue')
  },
  {
    path: '/profile/:id',
    name: 'ViewProfile',
    component: () => import(/* webpackChunkName: "about" */ '../components/profile/ViewProfile.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = firebase.auth().currentUser
    if (user) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router
