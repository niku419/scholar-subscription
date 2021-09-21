import React, {useState,useEffect } from 'react'
import { Container, Alert } from 'react-bootstrap'
import { database, storage } from '../Firebase'
import { useParams } from 'react-router-dom'
import { useAuth } from "../Context"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'

export default function AddFile() {

  const {currentUser} = useAuth()
  const {folderId=null} = useParams()
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState('')
  const [filePath, setFilePath] = useState("")
  const types = ['image/png', 'image/jpeg', 'image/jpg']
  let imageCollection = database.files

  function handleChange(e){
    let selected = e.target.files[0]
    if (selected && types.includes(selected.type)) {
      setFile(selected)
      setError('')
      console.log(file)
    } else {
      setFile(null)
      setError('Please select an image file (png or jpg)')
    }
  }
  useEffect(() => {
  if(file){ 
    setFilePath(`${folderId}/${file.name}`)
    if(folderId === null){
      setFilePath(`${file.name}`)
    }
    const storageRef = storage.ref(`/files/${currentUser.uid}/${filePath}`)
    storageRef.put(file).on('state_changed',snapshot => {
      let transferPercent = (snapshot.bytesTransferred/snapshot.totalBytes)*100
      setProgress(transferPercent)
      console.log(file)
    }, (error)=> {
      setError(error)
    },async ()=> {
      let imageURL = await storageRef.getDownloadURL()
      setUrl(imageURL)
      await imageCollection.add({
        url: imageURL,
        createdAt: database.createdAt(),
        userId: currentUser.uid,
        parentFolderId: folderId,
      })
      setFile(null)
      console.log(imageURL)
      console.log(url)
    })
  }
  }, [file, folderId])

  return (
    <Container className="p-0">
      {error && <Alert>Some error occurred in file upload</Alert>}
      <label className="btn btn-primary btn-sm mb-0">
        <FontAwesomeIcon icon={faCloudUploadAlt} />
        <input
          type="file"
          onChange={handleChange}
          style={{ opacity: 0, position: "absolute", left: "-9999px" }}
        />
      </label>
      <div className="progress pb-3" style={{height: "1px"}}>
        <div className="progress-bar" role="progressbar" style={{ width: progress + '%'}} aria-valuenow={progress + "%"} aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </Container>
  )
}
