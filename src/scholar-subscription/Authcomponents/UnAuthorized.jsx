import React from 'react'
import { Container } from 'react-bootstrap'
import NavBar from './NavBar'

export default function UnAuthorized() {
  return (
    <>
      <Container style={{height: "75vh"}} fluid className="d-flex justify-content-center align-items-center">
        <NavBar show={true}/>
        <div className="heading">
          <div className="react-heading">
            You don't have access to this route!!
          </div>
        </div>
      </Container>
      <Container style={{height: "10vh"}}>
        <div className="d-flex justify-content-end">
          <a href="/" role="button" className="btn btn-dark">Go back</a>
        </div>
      </Container>
    </>
  )
}