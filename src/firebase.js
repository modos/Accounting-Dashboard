import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDdq2aqoduVWbIrKK9HDSMUmFWPduffaM0',
  authDomain: 'atlas-11128.firebaseapp.com',
  databaseURL: '',
  projectId: 'atlas-11128',
  storageBucket: 'atlas-11128.appspot.com',
  messagingSenderId: '1085956749706',
  appId: '1:1085956749706:web:4350cc94327c994dceb073'
}

firebase.initializeApp(firebaseConfig)


const db = firebase.firestore()
const auth = firebase.auth()

const usersCollection = db.collection('users')

export {
  db,
  auth,
  usersCollection,
}