import React, { useState, useEffect } from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap'
import axios from 'axios'

export default function ViewPlans() {
  const [plans, setplans] = useState([])
  useEffect(() => {
    const axiosRequest = async () => {
      const response = await axios.get('http://localhost:3001/get/plans')
      setplans(JSON.parse(...response.data.items))
    }
    axiosRequest()
  }, [])

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
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    )}
    </Container>
  )
}
