import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import NavBar from '../Authcomponents/NavBar'
import NavbarBottom from '../Authcomponents/NavbarBottom'

export default function ClassContent() {
  const { userId, planId } = useParams()
  return (
    <div>
      <NavBar brand="Class Content"/>
        <Container style={{height: "100vh"}} className="d-flex flex-row justify-content-center align-items-center">
          <h1>Class content goes here !!</h1>   
          <div>userId-{userId} planId-{planId}</div> 
        </Container>
      <NavbarBottom/>
    </div>
  )
}
