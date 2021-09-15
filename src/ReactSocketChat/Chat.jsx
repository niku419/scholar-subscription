import React,{useState, useRef, useEffect} from 'react'
import { Container, Form, Button, InputGroup, ListGroup } from "react-bootstrap"
import { v4 as uuidV4 } from 'uuid'
import io from 'socket.io-client'
// import { useParams } from 'react-router-dom'

export default function Chat() {
  // const {chatId} = useParams()
  const dummy = useRef(null);
  const socketRef = useRef()
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [pname, setPName] = useState("")
  const [chat, setChat] = useState([])
  const roomId = uuidV4()

  useEffect(() => {
    socketRef.current = io.connect(`http://localhost:3001`,{ transports: ['websocket', 'polling', 'flashsocket'] })
    socketRef.current.emit('join-room',{ roomId })
    socketRef.current.on('message',({message, name}) => {
      setChat([...chat, {message,name}])
      console.log(message, name)
    })
    dummy.current.scrollIntoView({behaviour: 'smooth'})
    return () => {
      socketRef.current.disconnect()
    }
  }, [chat, roomId]) 

  function sendMessage(e){
    e.preventDefault()
    setName(pname)
    socketRef.current.emit("message", {message, name})
    setMessage("")
    console.log(roomId)
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
                <Button variant="outline-dark" type="submit">Send</Button>
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
    </>
  )
}
