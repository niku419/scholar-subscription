import React, { useState, useEffect } from 'react'
import { Container, Card, Row, Col, Button } from 'react-bootstrap'
import { useAuth } from '../Context'
import axios from 'axios'
import { database } from '../Firebase'
import Loading from '../Authcomponents/Loading'
import NavBar from '../Authcomponents/NavBar'
import NavbarBottom from '../Authcomponents/NavbarBottom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons'

export default function Subscriptions() {
  const [plans, setplans] = useState([])
  const [loading, setLoading] = useState(false)
  const [subIDs, setSubIDs] = useState([])
  const { currentUser } = useAuth()

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function displayRazorpay(subscription, plan) {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }
    var options = {
      "key": "rzp_test_mPxvGUuLWXLBUY",
      "subscription_id": subscription.id,
      "name": plan.item.name,
      "description": plan.item.description,
      "handler": function(response) {
        database.subscriptions
        .add({
          subscription: subscription,
          userId: currentUser.uid,
          response: response
        }).then(() => setLoading(false))
      },
      "prefill": {
        "name": currentUser.displayName,
        "email": currentUser.email
      },
      "theme": {
        "color": "#23272b"
      }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  useEffect(() => {
    setLoading(true)
    const axiosRequest = async () => {
      const response = await axios.get('https://razorpay-subscription.herokuapp.com/get/plans')
      if(response.data){ 
        let res = JSON.parse(response.data)
        setplans(res.items)
        setLoading(false)
        setLoading(false)
      }
    }
    axiosRequest()
  }, [])

  useEffect(() => {
    return database.subscriptions
    .onSnapshot(snap => {
      let snaps = []
      snap.forEach(doc => {
        let subs = {...doc.data()}
        console.log(subs)
        snaps.push(subs.subscription.plan_id)
      })
      setSubIDs(snaps)
    })
  }, [])

  async function subscribeThis(plan){
    console.log(plan)
    let data = { 
      plan_id: plan.id, 
      total_count:12,
      quantity: 1,
      customer_notify:1,
      start_at: Math.floor(Date.now() / 1000) +50, 
      expire_by:Math.floor((Date.now()) / 1000) + 30*24*60*60+50, 
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
    const result = await axios.post('https://razorpay-subscription.herokuapp.com/create/subscription', data)
    let res = JSON.parse(result.data)
    displayRazorpay(res, plan)
  }
  if(loading){
    return <Loading />
  }
  return (
    <>
      <Container>
        <NavBar brand="Plans"/>
        {plans && (
        <Row xs={1} md={2} className="g-4">
          {plans.map((plan, idx) => (
            <Col key={idx} className="col-lg-4 col-md-6 mb-2">
              <Card bg="dark" text="white">
                <Card.Header>{plan.item.name}</Card.Header>
                <Card.Body>
                  <Card.Title className="p-1 d-flex inline">
                    <div >{'amount: '}<FontAwesomeIcon icon={faRupeeSign}/></div>
                    <div>{" "}{plan.item.amount / 100}</div>
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
                  {subIDs && (
                    subIDs.includes(plan.id) ? 
                    <a role="button" className="btn btn-light" href={`/class/${currentUser.uid}/${plan.id}}`}>View your class</a> :
                    <Button variant="light" onClick={() => subscribeThis(plan)}>Create Subscription</Button>                  
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      </Container>
      <NavbarBottom/>
    </>
  )
}
