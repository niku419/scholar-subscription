import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore'

const app = firebase.initializeApp({
  apiKey: "AIzaSyB8Q_zOtu51kTcpRlE9ET1YRBMS6CZXk98",
  authDomain: "react-admin-tutor.firebaseapp.com",
  projectId: "react-admin-tutor",
  storageBucket: "react-admin-tutor.appspot.com",
  messagingSenderId: "203777102018",
  appId: "1:203777102018:web:0eb7bbbba758b50734eb5b",
  measurementId: "G-WHFX2R8PSR"
})
const firestore = app.firestore()
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const auth = app.auth()
export const database = {
  plans: firestore.collection('plans'),
}
export default app