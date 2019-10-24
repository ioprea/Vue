import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

var config = {
  apiKey: 'AIzaSyAiD6_TkX5kqYvECHgrIRw5NeqUphQ1NGU',
  authDomain: 'v-cocktails.firebaseapp.com',
  databaseURL: 'https://v-cocktails.firebaseio.com',
  projectId: 'v-cocktails',
  storageBucket: 'v-cocktails.appspot.com',
  messagingSenderId: '105435382687',
  appId: '1:105435382687:web:b0135025ff5fece0bb33aa',
  measurementId: 'G-19QNNH8P27'
}
const firebaseApp = firebase.initializeApp(config)
// firebaseApp.firestore().settings({ timestampsInSnapshots: true })
export default firebaseApp.firestore()