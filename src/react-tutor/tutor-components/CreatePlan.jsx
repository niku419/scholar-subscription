import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default function CreatePlan() {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState("")
  const [period, setPeriod] = useState("monthly")
  const [redirect, setRedirect] = useState(false)

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
    await axios.post('http://localhost:3001/create/plan', data)
    .then(result => {
      console.log(result)
      setRedirect(true)
    })
  }
  let type = "radio"
  return (
    <Container>
      {redirect && <Redirect to='/plans'/>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Item name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="name" 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
            required 
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Item amount</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Amount" 
            onChange={(e) => setAmount(e.target.value)} 
            value={amount} 
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
        <Button type="submit">Create your plan</Button>
      </Form>
    </Container>
  )
}