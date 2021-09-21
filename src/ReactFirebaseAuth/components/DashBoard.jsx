import React from 'react'
import { Container } from 'react-bootstrap'
import { useAuth } from "../Context"
import NavBar from './NavBar'
import NavbarBottom from './NavbarBottom'
import { Redirect } from 'react-router-dom'

export default function Dashboard() {
  const {currentUser} = useAuth()
    return (
    <Container fluid className="p-0 m-0">
      {!currentUser && <Redirect to='/'/>}
      <NavBar/> 
      <h1 className="heading" style={{color: "white"}}>You just logged in!!</h1>
      <NavbarBottom/>
    </Container>
  )
}