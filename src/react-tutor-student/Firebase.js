import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore'

const app = firebase.initializeApp({
  apiKey: "AIzaSyAJZGCKsqjsX8ESlZP60IHY20RkieRKkww",
  authDomain: "react-tutor-student.firebaseapp.com",
  projectId: "react-tutor-student",
  storageBucket: "react-tutor-student.appspot.com",
  messagingSenderId: "932933430031",
  appId: "1:932933430031:web:1ec8d6b7f97247e5576c7a",
  measurementId: "G-D1746M7XT6"
})
const firestore = app.firestore()
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const auth = app.auth()
export const database = {
  subscriptions : firestore.collection('subscriptions')
}
export default app