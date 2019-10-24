import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/Index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './App.vue')
    },
    {
      path: '/add-cocktail',
      name: 'AddCocktail',
      component: () => import(/* webpackChunkName: "about" */ './components/AddCocktail.vue')
    },
    {
      path: '/edit-cocktail/:slug',
      name: 'EditCocktail',
      component: () => import(/* webpackChunkName: "about" */ './components/EditCocktail.vue')
    }
  ]
})
