import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

var config = {
  apiKey: "AIzaSyCZ9ejgP9yl4VxM0tv50w0d7kfD6MwUJW4",
  authDomain: "v-chat-29597.firebaseapp.com",
  databaseURL: "https://v-chat-29597.firebaseio.com",
  projectId: "v-chat-29597",
  storageBucket: "v-chat-29597.appspot.com",
  messagingSenderId: "920625482783",
  appId: "1:920625482783:web:5dc2dff9ae3445c32ad92a",
  measurementId: "G-M70ZBFQ466"
}
const firebaseApp = firebase.initializeApp(config)
// firebaseApp.firestore().settings({ timestampsInSnapshots: true })
export default firebaseApp.firestore()