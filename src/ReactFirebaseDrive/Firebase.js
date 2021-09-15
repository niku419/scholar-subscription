import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/database'
import 'firebase/storage'
import 'firebase/firestore'

const app = firebase.initializeApp({
  apiKey: "AIzaSyAwmxWzVZII73hLf9SgSDJGiPsr_RJv8_w",
  authDomain: "atomic-shine-268217.firebaseapp.com",
  projectId: "atomic-shine-268217",
  storageBucket: "atomic-shine-268217.appspot.com",
  messagingSenderId: "721092129166",
  appId: "1:721092129166:web:5ed30fa8ac32d2c261b4df",
  measurementId: "G-8P54N9F2W9"
})
const firestore = app.firestore()
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const auth = app.auth()
export const database = {
  userDetails: firestore.collection('userDetails'),
  folders: firestore.collection('folders'),
  files: firestore.collection('files'),
  createdAt: firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage()
export default app