import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Loading from '../Authcomponents/Loading'
import NavbarBottom from '../Authcomponents/NavbarBottom'
import NavBar from '../Authcomponents/NavBar'

export default function CreatePlan() {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState("")
  const [period, setPeriod] = useState("monthly")
  const [redirect, setRedirect] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e){
    e.preventDefault()
    let data = { 
      period,
      "interval": 1, 
      "item": {
        name,
        amount, 
        description,
        "currency": "INR"
      } 
    }
    setLoading(true)
    await axios.post('https://razorpay-subscription.herokuapp.com/create/plan', data)
    .then(result => {
      setLoading(false)
      setRedirect(true)
      console.log(JSON.parse(result.data))
    })
  }
  let type = "radio"
  if(loading){
    return <Loading />
  }
  return (
    <>
      <Container>
        <NavBar brand="Create plan"/>
        <Container style={{height: "76vh"}} className="d-flex justify-content-center align-items-center" >
          {redirect && <Redirect to='/plans'/>}
          <Form onSubmit={handleSubmit} className="p-4" style={{background: "#f76c6c", borderRadius: "15px"}}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Item Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="name" 
                onChange={(e) => setName(e.target.value)} 
                value={name} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Item Amount</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Amount" 
                onChange={(e) => setAmount(e.target.value)} 
                value={amount} 
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Add Description</Form.Label>
              <Form.Control 
                type="text-area" 
                placeholder="Item description" 
                onChange={(e) => setDescription(e.target.value)} 
                value={description}
              />
            </Form.Group>
            <div key={`inline-${type}`} className="mb-3" onChange={(e) => setPeriod(e.target.value)}>
              <Form.Check
                inline
                label="daily"
                value="daily"
                type={type}
                name="group1"
                id={`inline-${type}-1`}
              />
              <Form.Check
                inline
                label="weekly"
                type={type}
                name="group1"
                id={`inline-${type}-1`}
                value="weekly"
              />
              <Form.Check
                inline
                name="group1"
                label="monthly"
                type={type}
                id={`inline-${type}-2`}
                value="monthly"
              />
              <Form.Check
                inline
                name="group1"
                label="yearly"
                type={type}
                id={`inline-${type}-3`}
                value="yearly"
              />
            </div>
            <Button type="submit" variant="light">Create your plan</Button>
          </Form>
        </Container>
        <div className="d-flex justify-content-end">
          <a role="button" href="/plans" className="btn btn-primary">View plans</a>
        </div>
      </Container>
      <NavbarBottom/>
    </>
  )
}