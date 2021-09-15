import React,{ useRef, useState } from 'react'
import { Container, Navbar, Nav, Alert } from 'react-bootstrap'
import { Redirect} from 'react-router-dom'
import {useAuth} from '../Context'
import Loading from './Loading'
// import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faGithub, faFacebookF, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavbarBottom from './NavbarBottom'

export default function MainPage() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const {login, currentUser } = useAuth()
  const [redirectPosssible, setRedirectPossible] = useState(false)
  //const {  signinWithGoogle, signinWithFacebook } = useAuth()
  // async function handleSigninWithGoogle(e){
  //   e.preventDefault()
  //   try{
  //     setRedirectPossible(true)
  //     await signinWithGoogle()
  //   }catch(err){
  //     setError("Couldn't Signin with Facebook")
  //   }
  // }
  // async function handleSigninWithFacebook(e){
  //   e.preventDefault()
  //   try{
  //     await signinWithFacebook()
  //     setRedirectPossible(true)
  //   }catch(err){
  //     setError("Couldn't Signin with Google")
  //   }
  // }
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      setRedirectPossible(true)
    } catch {
      setError("Failed to log in")
    }
    setLoading(false)
  }
  if(loading){
    return <Loading/>
  }
  else{
    return (
      <>
        <Container className="main main-page row">
          {currentUser && <Redirect to="/Dashboard"/>}
          {redirectPosssible && <Redirect to="/Dashboard"/>}
          <div className="col-md-6 center-head mt-3">
            <h1 className="heading mainpage-heading mt-5 mb-3 mt-lg-0 mr-lg-3">Welcome to FireAuth</h1>
            <div className="description mb-md-5 mr-lg-3 text-center">Welcome to firebase auth, here you can login to your personal acounts and browse through secure pages</div>
            <div style={{color: "white"}}>Don't have an account?<a href="/signup" className="ml-1 anchor"> Signup</a></div>
          </div>
          <div className="login-box col-md-6">
            <h2 className="h2">Login</h2>
            <form onSubmit={handleSubmit}>
              {error && <Alert variant="danger">{error}</Alert>}
              <div className="user-box">
                <input type="email" placeholder="Enter your email" ref={emailRef} required/>
              </div>
              <div className="user-box">
                <input type="password" placeholder="Enter your password" ref={passwordRef} required/>
              </div>
                <a>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <button type="submit">Submit</button>
                </a>
            </form>
          </div> 
        </Container>
        <NavbarBottom/>
      </>
    )
  }
}