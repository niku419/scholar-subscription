import React,{useState} from 'react'
import { useAuth } from "../Context";
import { Container, InputGroup, FormControl, Button, Form } from 'react-bootstrap'
import { database } from '../Firebase'
import { Redirect } from "react-router-dom";


export default function SetUsername() {
  const [name, setName] = useState("")
  const [redirectPossible, setRedirectPossible] = useState(false)
  function handleSubmit(event){
    event.preventDefault()
    database.userDetails.add({
      username: name,
      userId: currentUser.uid,
      createdAt: database.createdAt()
    })
    setRedirectPossible(true)
  }
  const { currentUser } = useAuth()
  return (
    <Container className="main">
      {redirectPossible && <Redirect to="/" />}
      {
        currentUser ? ( 
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={name}
                onChange={e=> setName(e.target.value)}
              />
            </InputGroup>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        ) : <div className="center-head mt-md-0 mt-3" style={{backgroundColor: "white"}}><h1 className="heading">UserName Page</h1></div>

      }
    </Container>
  )
}
