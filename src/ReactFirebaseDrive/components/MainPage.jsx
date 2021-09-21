import React,{ useRef, useState } from 'react'
import { Container, Navbar, Nav, Alert } from 'react-bootstrap'
import { Redirect} from 'react-router-dom'
import {useAuth} from '../Context'
import Loading from './Loading'
// import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faGithub, faFacebookF, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MainPage() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const {login, currentUser } = useAuth()
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
          {error && <Alert>{error}</Alert>}
          <div className="col-md-6 center-head mt-3">
            <h1 className="heading mainpage-heading mt-5 mb-3 mt-lg-0 mr-lg-3">Welcome to our Drive</h1>
            <div className="description mb-md-5 mr-lg-3 text-center">welcome to our drive here you can login to your personal accounts, create folders and upload files...</div>
            <div style={{color: "white"}}>Don't have an account?<a href="/signup" className="ml-1 anchor"> Signup</a></div>
          </div>
          <div className="login-box col-md-6">
            <h2 className="h2">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="user-box">
                <input type="email" placeholder="Enter your email" ref={emailRef} required/>
              </div>
              <div className="user-box">
                <input type="password" placeholder="Enter your password" ref={passwordRef} required/>
              </div>
                <a href="submit">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <button type="submit">Submit</button>
                </a>
            </form>
          </div> 
        </Container>
        <Container className="d-flex flex-column-reverse ">
          <Navbar bg="transparent" fixed="bottom" variant="light" className="d-flex justify-content-between breakpoint">
            <div><Navbar.Brand><strong style={{color: "#ffffff", letterSpacing:"0.12rem"}}>Niku419</strong></Navbar.Brand></div>
            <div>
              <Nav className="mr-auto">
                <Nav.Link href="https://github.com/niku419"><FontAwesomeIcon  icon={faGithub} color="#ffffff" /></Nav.Link>
                <Nav.Link href="https://linkedin.com/niku_419"><FontAwesomeIcon  icon={faLinkedinIn}  color="#ffffff"/></Nav.Link>
                <Nav.Link href="https://instagram.com/_niku_419"><FontAwesomeIcon  icon={faInstagram}  color="#ffffff"/></Nav.Link>
                <Nav.Link href="https://www.facebook.com/profile.php?id=100069976086066"><FontAwesomeIcon icon={faFacebookF}  color="#ffffff"/></Nav.Link>
              </Nav>
            </div>
            {/* <Form inline>
              <Nav className="mr-auto"> 
                <Nav.Link>made for Hiku<FontAwesomeIcon color="#8d0101" icon={faHeart} /></Nav.Link>
              </Nav>
            </Form> */}
          </Navbar>
			</Container>
      </>
    )
  }
}