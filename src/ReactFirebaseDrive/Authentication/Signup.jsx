import React,{useRef, useState} from 'react'
import { Container, Form, Alert, Button} from 'react-bootstrap'
import {Redirect, Link} from 'react-router-dom'
import { useAuth } from "../Context"
import  '../../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [redirectPossible, setRedirectPossible] = useState(false)
  const {signup, currentUser, signinWithGoogle} = useAuth()
  async function handleSigninWithGoogle(e){
    e.preventDefault()
    try{
      await signinWithGoogle()
    }catch(err){
      setError("Couldn't Signin with Facebook")
    }
  }
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if(passwordRef.current.value !== confirmPasswordRef.current.value){
        return setError("Passwords do not match")
      }
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      setRedirectPossible(true)
    } catch {
      setError("Failed to signup")
    }
    setLoading(false)
  }
  return (
    <Container className="main signup row">
      {redirectPossible && <Redirect to="/setUsername" />}
      <div className="col-md-6 center-head mt-md-0 mt-3"><h1 className="heading signup-heading">Sign Up to this Drive</h1></div>
      <Container className="shadow-lg p-3 my-5 col-md-6 rounded">
        {error && <Alert variant="primary">{error}</Alert>}
        {currentUser && currentUser.email}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={emailRef} required/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={passwordRef} required/>
          </Form.Group>
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={confirmPasswordRef} required/>
          </Form.Group>
          <Button disabled={loading} variant="primary yellow" type="submit">
            Submit
          </Button>
          {!currentUser && (
            <div className="float-right">
              Already have an account?      
              <Link to="/login"><u className="ml-1">Login</u></Link>
            </div>
          )}
        </Form>
      </Container>
      <Container className="mb-2">
        <Button disabled={loading} type="submit" className="yellow" variant="primary yellow" onClick={handleSigninWithGoogle}>
          Sign in with <FontAwesomeIcon icon={faGoogle}/>
        </Button>
        {/* <Button disabled={loading} type="submit" className="silver" variant="primary" onClick={handleSigninWithFacebook}>
          <FontAwesomeIcon icon={faFacebookF}/>
        </Button> */}
        </Container>
    </Container>
  )
}
