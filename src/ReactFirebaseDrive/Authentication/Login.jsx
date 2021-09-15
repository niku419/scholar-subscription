import React,{useRef, useState} from 'react'
import { Container, Form, Alert, Button} from 'react-bootstrap'
import {Link, Redirect} from 'react-router-dom'
import  '../../App.css'
import { useAuth } from "../Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const {login, currentUser, signinWithGoogle} = useAuth()
  async function handleSigninWithGoogle(e){
    e.preventDefault()
    try{
      await signinWithGoogle()
    }catch(err){
      setError("Couldn't Signin with Facebook")
    }
  }
  // async function handleSigninWithFacebook(e){
  //   e.preventDefault()
  //   try{
  //     await signinWithFacebook()
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
  
  return (
    <Container className="login main row">
      {currentUser && <Redirect to='/Dashboard'/>}
      <div className="col-md-6 center-head mt-md-0 mt-3"><h1 className="heading signup-heading">Login to this Drive</h1></div>
      <Container className="shadow-lg p-3 my-5 col-md-6 rounded">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={emailRef}/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
          </Form.Group>
          <Button disabled={loading} variant="primary" className="silver" type="submit">Submit</Button>
          <div className="mt-1 float-right">
            <div>
              <Link to="/forgotPassword"><u>Forgot Password</u></Link>
            </div>
            <div>
              <Link to="/signup"><u>Signup</u></Link>
            </div>
          </div>
        </Form>
      </Container>
      <Container className="mb-2">
        <Button disabled={loading} type="submit" className="silver" variant="primary" onClick={handleSigninWithGoogle}>
          Sign in with <FontAwesomeIcon icon={faGoogle}/>
        </Button>
        {/* <Button disabled={loading} type="submit" className="silver" variant="primary" onClick={handleSigninWithFacebook}>
          <FontAwesomeIcon icon={faFacebookF}/>
        </Button> */}
        </Container>
    </Container>
  )
}