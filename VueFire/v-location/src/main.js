import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'materialize-css/dist/css/materialize.min.css'
// import './registerServiceWorker.js'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'long-press-event/dist/long-press-event.min'
import 'material-icons/iconfont/material-icons.scss'
import { messaging } from './firebase/init'
import db from './firebase/init'
messaging.usePublicVapidKey("BMsuJeQvdWSvZNq2Hl_CbFbK1chZidQZ_XQ21lQthCCYxCpORUjogCYGqIESGAGcT-8vVKOkap7Mdo06pNbzWZs")
console.log('messaging', messaging);
messaging.requestPermission().then((resp) => {
  console.log('Notification permission granted.', resp);

  console.log('Notifications', messaging)
  // Get Token
  messaging.getToken().then((token) => {
    console.log('Notification token', token)
    db.collection('tokens').doc('token').set({[token]: token}, {merge: true});
  })
}).catch((err) => {
  console.log('Unable to get permission to notify.', err);
});

Vue.config.productionTip = false
let app = null
messaging.getToken
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

