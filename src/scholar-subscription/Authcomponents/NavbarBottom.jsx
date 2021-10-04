import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faGithub, faFacebookF, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'

export default function NavbarBottom() {
  return (
    <div>
      <Container className="d-flex flex-column-reverse p-0 m-0" fluid>
        <Navbar bg="light" variant="light" className="d-flex justify-content-between breakpoint">
          <div><Navbar.Brand><strong style={{letterSpacing:"0.12rem", color:"#24305e"}}>Niku419</strong></Navbar.Brand></div>
          <div>
            <Nav className="mr-auto">
              <Nav.Link href="https://github.com/niku419"><FontAwesomeIcon  icon={faGithub} color="#24305e" /></Nav.Link>
              <Nav.Link href="https://linkedin.com/niku-419"><FontAwesomeIcon  icon={faLinkedinIn} color="#24305e" /></Nav.Link>
              <Nav.Link href="https://instagram.com/_niku_419"><FontAwesomeIcon  icon={faInstagram} color="#24305e" /></Nav.Link>
              <Nav.Link href="https://www.facebook.com/profile.php?id=100069976086066"><FontAwesomeIcon icon={faFacebookF} color="#24305e"/></Nav.Link>
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
