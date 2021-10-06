import React from 'react'
import { Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../Context'

export default function Main() {
  const role = localStorage.getItem("role")
  const { currentUser } = useAuth()
  return (
    <>
      <Container style={{height: "75vh"}} fluid className="d-flex justify-content-around align-items-center flex-column">
        {currentUser && (
          role ==="student" && <Redirect to={'/subscriptions'}/>
        )}
        {currentUser && (
          role ==="teacher" && <Redirect to={'/plans'}/>
        )}
        <div className="heading">
          <div className="react-heading">
            Scholar Subscription
          </div>
        </div>
        <Container style={{height: "10vh"}}>
          <div className="d-flex justify-content-evenly">
            <a href="/student-login" role="button" className="btn btn-primary">Student</a>
            <a href="/teacher-login" role="button" className="btn btn-primary">Teacher</a>
          </div>
        </Container>
      </Container>
    </>
  )
}
