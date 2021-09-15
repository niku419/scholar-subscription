import React,{useState, useEffect, useRef} from 'react'
import { Container, Button, Col, Nav, Navbar } from 'react-bootstrap'
import Loading from './Loading';
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from "../Context";
import { database } from '../Firebase'
import NavBar from './NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faGithub, faFacebookF, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'

export default function Dashboard() {
  const {currentUser} = useAuth()
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(true)
  const [folders, setFolders] = useState([])
  const {folderId=null} = useParams()
  const [files, setFiles] = useState([])
  let folderCollection = database.folders
  let imageCollection = database.files
  let userDetails = useRef({})
  
  useEffect(() => {
    setLoading(false)
    return folderCollection
    .where("userId","==",currentUser.uid)
    .where("parentFolderId","==",folderId)
    .onSnapshot((snapshot)=>{
      let docs = []
      snapshot.forEach(value => {
        docs.push({...value.data(), id: value.id})
      })
      setFolders(docs)
      setLoading(true)
    })
  }, [ currentUser, folderId])

  useEffect(() => {
    setLoading(false)
    return imageCollection
    .where("userId" ,"==", currentUser.uid)
    .where("parentFolderId","==", folderId)
    .onSnapshot((snapshot)=>{
      let imageDocs = []
      snapshot.forEach(value => {
        imageDocs.push({...value.data(), id: value.id})
      })
      setFiles(imageDocs)
      setLoading(true)
      console.log(imageDocs)
    })
  }, [ folderId, imageCollection])

  useEffect(() => {
    userDetails.current = database.userDetails.where('userId','==',currentUser.uid)
    userDetails.current
      .onSnapshot(snapshot => {
        snapshot.docs.map(value => value.ref.get().then(ans => {
          setUsername(ans.data().username)
          setLoading(true) 
          console.log(username)         
        }))
    })
    return () => {
      userDetails.current = {}
    }
  }, [currentUser])

  if(!loading){
    return <Loading/>
  }
  else{
    return (
      <Container>
        <NavBar/> 
        <Container>
          {folders.length>0 &&(
            <Container className="d-flex justify-content-start flex-wrap">
              {folders.map(childFolder => (
                <div key={childFolder.id} className="p-3">  
                  <Button to={`/folder/${childFolder.id}`} as={Link} variant="primary" className="row">
                    <FontAwesomeIcon icon={faFolderOpen} size="4x" className="col"/>
                    <div className="col">{childFolder.folderName}</div> 
                  </Button>
                </div>
              ))}
            </Container>
          )}
        </Container>
        <Container>
          {files.length>0 &&(
          <div className="row">
            {files.map(image => ( 
              <Col md={12} lg={4} key={image.url}>
                <a href={image.url} target="_blank" rel="noreferrer">
                  <motion.img
                    src={image.url}
                    alt="firebase error"
                    className="img-fluid mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  />
                </a>
              </Col>
            ))}
          </div>
        )}
        </Container>
        <Container className="d-flex flex-column-reverse">
          <div>
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
          </div>
			  </Container>
      </Container>
    )
  }
}