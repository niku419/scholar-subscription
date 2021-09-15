import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faGithub, faFacebookF, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'

export default function NavbarBottom() {
  return (
    <div>
      <Container className="d-flex flex-column-reverse">
        <Navbar bg="transparent" fixed="bottom" variant="light" className="d-flex justify-content-between breakpoint">
          <div><Navbar.Brand><strong style={{color: "#ffffff", letterSpacing:"0.12rem"}}>Niku419</strong></Navbar.Brand></div>
          <div>
            <Nav className="mr-auto">
              <Nav.Link href="https://github.com/niku419"><FontAwesomeIcon  icon={faGithub} color="#ffffff" /></Nav.Link>
              <Nav.Link href="https://linkedin.com/niku_419"><FontAwesomeIcon  icon={faLinkedinIn}  color="#ffffff"/></Nav.Link>
              <Nav.Link href="https://instagram.com/_niku_419"><FontAwesomeIcon  icon={faInstagram}  color="#ffffff"/></Nav.Link>
              <Nav.Link href="https://www.facebook.com/profile.php?id=100069976086066"><FontAwesomeIcon icon={faFacebookF}  color="#ffffff"/></Nav.Link>
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
