import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

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
export default firebaseApp.firestore()