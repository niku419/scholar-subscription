import React,{useState, useRef, useEffect} from 'react'
import { Container, Form, Button, InputGroup, ListGroup } from "react-bootstrap";
import io from 'socket.io-client'
// import { faHeart } from '@fortawesome/free-solid-svg-icons'
// import { faInstagram, faGithub, faFacebookF, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { Nav, Navbar } from 'react-bootstrap'


export default function Chat() {
  const dummy = useRef(null);
  const socketRef = useRef()
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [pname, setPName] = useState("")
  const [chat, setChat] = useState([])

  useEffect(() => {
    socketRef.current = io.connect('https://react-socket-server.herokuapp.com/',{ transports: ['websocket', 'polling', 'flashsocket'] })
    socketRef.current.on('message',({message, name}) => {
      setChat([...chat, {message,name}])
      console.log(message, name)
    })
    dummy.current.scrollIntoView({behaviour: 'smooth'})
    return () => {
      socketRef.current.disconnect()
    }
  }, [chat]) 

  function sendMessage(e){
    setName(pname)
    socketRef.current.emit("message", {message, name})
    e.preventDefault()
    setMessage("")
  }
  function nameSubmit(e) {
    e.preventDefault()
    setName(pname)
  }
  return (
    <>
      <Container className="pt-5 flex-fill flex-column d-flex border border-light border-bottom-0">
      <div className="mb-4"><h1 className="heading">React Socket Chat</h1></div>
        <Container style={{overflow: "auto", paddingTop: "2rem"}}>
          <div style={{ width: 'fill', height:"25rem"}}>
            <ListGroup variant="flush">
              {chat.map(({ name, message }, index) => (
                <div key={index}>
                  <span style={{display: "inline"}} className="text-muted">{name}: </span>
                  <span style={{display: "inline"}}>{message}</span>
                </div>
              ))}
            </ListGroup>
            <div ref={dummy}></div>
          </div>
        </Container>
        <Container className="d-flex pt-2">
          {name ? 
          <Form className="mb-3 flex-grow-1" onSubmit={sendMessage}>
            <InputGroup >
              <Form.Control
                placeholder="Enter Message"
                aria-describedby="basic-addon2"
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                value={message}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" type="submit">Send</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form> :
          <Form className="mb-3 flex-grow-1" onSubmit={nameSubmit}>
            <InputGroup >
              <Form.Control
                placeholder="Enter Name"
                aria-describedby="basic-addon2"
                onChange={(e) =>
                  setPName(e.target.value)
                }
                value={pname}
                required
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" type="submit">Set Name</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>}
        </Container>
      </Container>
      {/* <Container>
        <Navbar bg="transparent" fixed="bottom" variant="light" className="d-flex justify-content-between">
          <div><Navbar.Brand><strong style={{color: "#000", letterSpacing:"0.12rem"}}>Niku419</strong></Navbar.Brand></div>
          <div>
            <Nav className="mr-auto">
              <Nav.Link href="https://github.com/niku419"><FontAwesomeIcon  icon={faGithub} color="#000" /></Nav.Link>
              <Nav.Link href="https://linkedin.com/niku_419"><FontAwesomeIcon  icon={faLinkedinIn}  color="#000"/></Nav.Link>
              <Nav.Link href="https://instagram.com/_niku_419"><FontAwesomeIcon  icon={faInstagram}  color="#000"/></Nav.Link>
              <Nav.Link href="https://www.facebook.com/profile.php?id=100069976086066"><FontAwesomeIcon icon={faFacebookF}  color="#000"/></Nav.Link>
            </Nav>
          </div>
          <Form inline>
            <Nav className="mr-auto"> 
              <Nav.Link>made for Hiku<FontAwesomeIcon color="#8d0101" icon={faHeart} /></Nav.Link>
            </Nav>
          </Form>
        </Navbar>
			</Container> */}
    </>
  )
}