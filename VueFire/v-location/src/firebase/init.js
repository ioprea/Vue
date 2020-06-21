import firebase from 'firebase/app'
import firestore from 'firebase/firestore'
import 'firebase/messaging'

var config = {
  apiKey: "AIzaSyDkRrEjsridBjroVS8QlsVm4FIwouN-dQQ",
  authDomain: "v-location.firebaseapp.com",
  databaseURL: "https://v-location.firebaseio.com",
  projectId: "v-location",
  storageBucket: "v-location.appspot.com",
  messagingSenderId: "664944818043",
  appId: "1:664944818043:web:9546868860aae3239fefde",
  measurementId: "G-SVYVD9TBEZ"
}
const firebaseApp = firebase.initializeApp(config)
// try {
  // const messaging = firebaseApp.messaging();
  
  // messaging.usePublicVapidKey("BMsuJeQvdWSvZNq2Hl_CbFbK1chZidQZ_XQ21lQthCCYxCpORUjogCYGqIESGAGcT-8vVKOkap7Mdo06pNbzWZs"); // 1. Generate a new key pair
  // console.log('messaging', messaging);
  // // Request Permission of Notifications
  // messaging.requestPermission().then(() => {
  //   console.log('Notification permission granted.');
  
  //   console.log('Notifications', messaging.getToken())
  //   // Get Token
  //   messaging.getToken().then((token) => {
  //     console.log('Notification token', token)
  //     // firebaseApp.firestore().collection('tokens').add({tk: token});
  //   })
  // }).catch((err) => {
  //   console.log('Unable to get permission to notify.', err);
  // });
// } catch (err) { console.log('Unable to', err) }
export const messaging = firebaseApp.messaging()
export default firebaseApp.firestore()