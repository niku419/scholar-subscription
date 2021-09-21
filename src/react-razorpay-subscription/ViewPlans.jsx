import React, { useState, useEffect } from 'react'
import { Container, Card, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import Loading from './Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons'

export default function ViewPlans() {
  const [plans, setplans] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const axiosRequest = async () => {
      const response = await axios.get('https://razorpay-subscription.herokuapp.com/get/plans')
      if(response.data){ 
        let res = JSON.parse(response.data)
        console.log(res.items)
        setplans(res.items)
        setLoading(false)
      }
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
    setLoading(true)
    await axios.post('https://razorpay-subscription.herokuapp.com/create/subscription', data)
    .then(res => {
      JSON.parse(res.data)
      setLoading(false)
    })
    
  }
  if(loading){
    return <Loading />
  }
  return (
    <Container className="p-3">
      {plans && (
      <Row xs={1} md={2} className="g-4 d-flex justify-content-center">
        {plans.map((plan, idx) => (
          <Col key={idx} className="col-lg-4 col-md-6 mb-2">
            <Card text="white" style={{background: "#f76c6c"}}>
              <Card.Header>{plan.item.name}</Card.Header>
              <Card.Body>
                <Card.Title className="p-1 d-flex inline">
                  <div >{'amount: '}<FontAwesomeIcon icon={faRupeeSign}/></div>
                  <div>{" "}{plan.item.amount}</div>
                </Card.Title>
                <Card.Text>
                  <div className="d-flex inline">
                    <div className="pr-1">{'description: '}</div>
                    <div style={{textTransform: "capitalize", fontStyle:"italic"}}>{" "}{plan.item.description}</div>
                  </div>
                  <div className="d-flex inline">
                    <div className="pr-1">{'period: '}</div>
                    <div style={{textTransform: "capitalize", fontStyle:"italic"}}>{" "}{plan.period}</div>
                  </div>
                </Card.Text>
                <Button variant="light" onClick={() => subscribeThis(plan)}>Create Subscription</Button>                  
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    )}
    <div className="d-flex justify-content-end">
      <a role="button" href="/createPlan" className="btn btn-primary">Create plan</a>
    </div>
    </Container>
  )
}
