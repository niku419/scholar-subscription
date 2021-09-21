import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore'

const app = firebase.initializeApp({
  apiKey: "AIzaSyD2puEJ07jUAHcMtc62DImFXjfU8BFSaw0",
  authDomain: "scholar-subscription.firebaseapp.com",
  projectId: "scholar-subscription",
  storageBucket: "scholar-subscription.appspot.com",
  messagingSenderId: "494839580108",
  appId: "1:494839580108:web:706ed7adc270849c644969",
  measurementId: "G-7GVQP770LB"
})
const firestore = app.firestore()
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const auth = app.auth()
export const database = {
  plans: firestore.collection('plans'),
  subscriptions : firestore.collection('subscriptions')
}
export default app