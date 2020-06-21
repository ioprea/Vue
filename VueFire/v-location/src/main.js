import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'materialize-css/dist/css/materialize.min.css'
import './registerServiceWorker.js'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'long-press-event/dist/long-press-event.min'
import 'material-icons/iconfont/material-icons.scss'

Vue.config.productionTip = false
let app = null

// wait for firebase auth to init before app loading
firebase.auth().onAuthStateChanged(() => {

  // init app if not already created
  if(!app)
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
})

