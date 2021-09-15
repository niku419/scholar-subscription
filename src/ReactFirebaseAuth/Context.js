import React,{useContext, useEffect, useState} from 'react'
import {auth, googleProvider, facebookProvider} from './Firebase'

const AuthContext = React.createContext()

export function useAuth(){
  return useContext(AuthContext)
}
export default function Context({children}) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  function signup(email, password){
    return auth.createUserWithEmailAndPassword(email, password)
  }
  function login(email, password){
    return auth.signInWithEmailAndPassword(email, password)
  }
  function forgotPassword(email){
    return auth.sendPasswordResetEmail(email)
  }
  function logout(){
    return auth.signOut()
  }
  function signinWithGoogle(){
    return auth.signInWithRedirect(googleProvider);
  }
  function signinWithFacebook(){
    return auth.signInWithRedirect(facebookProvider);
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    forgotPassword,
    logout,
    signinWithGoogle,
    signinWithFacebook,
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}