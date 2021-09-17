import React, { useState, useEffect } from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap'
import axios from 'axios'

export default function ViewPlans() {
  const [plans, setplans] = useState({})
  useEffect(() => {
    const axiosRequest = async () => {
      const response = await axios.get('http://localhost:3001/get/plans')
      console.log(...response.data.items)
      setplans(JSON.parse(...response.data.items))
      console.log(1)
    }
    axiosRequest()
  }, [])
  async function subscribeThis(plan){
    console.log(plan)
    let data = { 
      plan_id: plan.id, 
      total_count:12,
      quantity: 1,
      customer_notify:1,
      start_at: Math.floor(Date.now() / 1000), 
      expire_by:Math.floor((Date.now()) / 1000) + 30*24*60*60, 
      addons:[ 
        { 
          item: { 
            name: plan.item.name, 
            amount: plan.item.amount, 
            currency:"INR" 
          } 
        } 
      ],
    }
    const result = await axios.post('http://localhost:3001/create/subscription', data)
    console.log(result.data)
  }

  return (
    <Container>
      {plans && (
      <Row xs={1} md={2} className="g-4">
        {plans.map((plan, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Body>
                <Card.Title>{plan.item.name}</Card.Title>
                <Card.Text>{plan.item.description}</Card.Text>
                <Card.Text>{plan.item.amount}</Card.Text>
                <Card.Text>{plan.period}</Card.Text>
                {/* <Button onClick={() => subscribeThis(plan)}>Create Subscription</Button> */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    )}
    </Container>
  )
}
