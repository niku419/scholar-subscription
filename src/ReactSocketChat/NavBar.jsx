import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
//import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faGithub, faFacebookF, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { Form } from 'react-bootstrap'

export default function NavBar() {
  return (
    <div>
      <Container>
        <Navbar bg="transparent" fixed="top" variant="light" className="d-flex justify-content-between">
          <div><Navbar.Brand><strong style={{color: "#000", letterSpacing:"0.12rem"}}>Niku419</strong></Navbar.Brand></div>
          <div>
            <Nav className="mr-auto">
              <Nav.Link href="https://github.com/niku419"><FontAwesomeIcon  icon={faGithub} color="#000" /></Nav.Link>
              <Nav.Link href="https://linkedin.com/niku_419"><FontAwesomeIcon  icon={faLinkedinIn}  color="#000"/></Nav.Link>
              <Nav.Link href="https://instagram.com/_niku_419"><FontAwesomeIcon  icon={faInstagram}  color="#000"/></Nav.Link>
              <Nav.Link href="https://www.facebook.com/profile.php?id=100069976086066"><FontAwesomeIcon icon={faFacebookF}  color="#000"/></Nav.Link>
            </Nav>
          </div>
          {/* <Form inline>
            <Nav className="mr-auto"> 
              <Nav.Link>made for Hiku<FontAwesomeIcon color="#8d0101" icon={faHeart} /></Nav.Link>
            </Nav>
          </Form> */}
        </Navbar>
			</Container>
    </div>
  )
}
