import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/database'
import 'firebase/storage'
import 'firebase/firestore'

const app = firebase.initializeApp({
  apiKey: "AIzaSyCFNVdkgy_yv0-No9xq_pecz2dyFFWo_Po",
  authDomain: "basic-auth-firebase.firebaseapp.com",
  projectId: "basic-auth-firebase",
  storageBucket: "basic-auth-firebase.appspot.com",
  messagingSenderId: "815608025151",
  appId: "1:815608025151:web:13d9d603c887f35dd8688a",
  measurementId: "G-XVRBMSJQVY"
})
const firestore = app.firestore()
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const auth = app.auth()
export const database = {
  userDetails: firestore.collection('userDetails'),
  createdAt: firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage()
export default app