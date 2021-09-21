import React, {useState} from 'react'
import { Navbar, Button, Nav, Container } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { useParams } from 'react-router'
import AddFolder from './AddFolder'
import { useAuth } from '../Context'
import AddFile from './AddFile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export default function NavBar() {
  const {logout} = useAuth()
  const [redirectPossible, setRedirectPossible] = useState(false)
  const {folderId} = useParams()

  function something() {
    setRedirectPossible(true)
    logout()
  }
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Container>
      {redirectPossible && <Redirect to="/"/>}
        <Navbar.Brand>Drive</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link className="p-0 mr-2 mb-md-2" href="/Chat" ><Button size="sm" onClick={something}><FontAwesomeIcon icon={faCommentDots} /></Button></Nav.Link>
          <Nav.Item className="p-0 mr-2 mb-md-2"><AddFolder parentFolderId={folderId}/></Nav.Item>
          <Nav.Item className="p-0 mr-2 mb-md-2"><AddFile/></Nav.Item>
          <Nav.Item className="p-0 mr-2 mb-md-2"><Button size="sm" onClick={something}><FontAwesomeIcon icon={faSignOutAlt} /></Button></Nav.Item>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
