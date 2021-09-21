import React, { useState, useEffect } from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Loading from '../Authcomponents/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons'
import NavBar from '../Authcomponents/NavBar'
import NavbarBottom from '../Authcomponents/NavbarBottom'

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
  if(loading){
    return <Loading />
  }
  return (
    <>
    <Container className="p-3">
      <NavBar brand="Plans"/>
      {plans && (
      <Row xs={1} md={2} className="g-4 d-flex justify-content-center">
        {plans.map((plan, idx) => (
          <Col key={idx} className="col-lg-4 col-md-6 mb-2">
            <Card text="white" style={{background: "#f76c6c"}}>
              <Card.Header><h4>{plan.item.name}</h4></Card.Header>
              <Card.Body>
                <Card.Title className="p-1 d-flex inline">
                  <div >{'amount: '}<FontAwesomeIcon icon={faRupeeSign}/></div>
                  <div>{" "}{plan.item.amount}</div>
                </Card.Title>
                <Card.Text>
                  <div className="d-flex inline">
                    <div style={{textTransform: "capitalize", fontStyle:"italic"}} className="pr-1">{'description: '}</div>
                    <div >{" "}{plan.item.description}</div>
                  </div>
                  <div className="d-flex inline">
                    <div style={{textTransform: "capitalize", fontStyle:"italic"}} className="pr-1">{'period: '}</div>
                    <div >{" "}{plan.period}</div>
                  </div>
                </Card.Text>
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
    <NavbarBottom/>
    </>
  )
}
