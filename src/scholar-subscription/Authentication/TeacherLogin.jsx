import React,{useRef, useState} from 'react'
import { Container, Form, Alert, Button} from 'react-bootstrap'
import {Link, Redirect} from 'react-router-dom'
import  '../../App.css'
import { useAuth } from "../Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'

export default function TeacherLogin() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const {login, currentUser, signinWithGoogle, signinWithFacebook} = useAuth()
  async function handleSigninWithGoogle(e){
    e.preventDefault()
    try{
      await signinWithGoogle()
      localStorage.setItem("role", "teacher")
    }catch(err){
      setError("Couldn't Signin with Google")
    }
  }
  async function handleSigninWithFacebook(e){
    e.preventDefault()
    try{
      await signinWithFacebook()
      localStorage.setItem("role", "teacher")
    }catch(err){
      setError("Couldn't Signin with Facebook")
    }
  }
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      localStorage.setItem("role", "teacher")
    } catch {
      setError("Failed to log in")
    }
    setLoading(false)
  }
  
  return (
    <Container className="main row">
      {currentUser && <Redirect to='/plans'/>}
      <div className="col-md-6 center-head mt-md-0 mt-3">
        <h1 className="heading signup-heading">Create and view plans</h1>
      </div>
      <Container className="shadow-lg p-3 my-5 col-md-6 rounded">
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={emailRef}/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
          </Form.Group>
          <Button disabled={loading} variant="dark" type="submit">Submit</Button>
          <div className="mt-1 float-right">
            <div>
              <Link to="/forgotPassword"><u>Forgot Password</u></Link>
            </div>
            <div>
              <Link to="/teacher-signup"><u>Signup</u></Link>
            </div>
          </div>
        </Form>
      </Container>
      <Container className="d-flex justify-content-between">
        <Container className="mb-2">
          <Button disabled={loading} type="submit" variant="dark" onClick={handleSigninWithGoogle}>
            <FontAwesomeIcon icon={faGoogle}/>
          </Button>
          <Button disabled={loading} type="submit" variant="dark" onClick={handleSigninWithFacebook}>
            <FontAwesomeIcon icon={faFacebookF}/>
          </Button>
        </Container>
        <Container>
          <div className="d-flex justify-content-end">
            <a role="button" href="/student-login" className="btn btn-dark" style={{color:"white"}}>Student login</a>
          </div>
        </Container>
      </Container>
    </Container>
  )
}