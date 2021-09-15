import React,{useRef, useState} from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../Context'

export default function ForgotPassword() {
  const emailRef = useRef()
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const {forgotPassword} = useAuth()

  async function handleSubmit(event){
    event.preventDefault()
    try{ 
      setLoading(true)
      setError("")
      await forgotPassword(emailRef.current.value)
      setMessage("Please check your inbox to reset your password")
    }catch(e){
      setError("There was an error resetting password")
    }
  }
  return (
    <Container className="main forgot-password row">
      <div className="col-md-6 center-head mt-md-0 mt-3"><h1 className="heading signup-heading">Password Reset</h1></div>
      {error && <Alert className="primary">{error}</Alert>}
      {message && <Alert className="primary">{message}</Alert>}
      <Container className="shadow-lg p-3 my-5 col-md-6 rounded">
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
        </Form>
        <Button className="primary peach" disabled={loading}>Reset password</Button> 
      </Container>
    </Container>
  )
}
