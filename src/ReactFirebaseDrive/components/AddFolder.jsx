import React, { useState } from 'react'
import { Button, Modal, Form } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { database } from '../Firebase'
import { useAuth } from '../Context'
import { useParams } from 'react-router-dom'

function AddFolder() {
	const {currentUser} = useAuth()
	const ROOT_FOLDER = {userId: currentUser.uid, parentFolderId: null, path: null}
	const [modalShow, setModalShow] = useState(false)
	const [folderName, setFolderName] = useState("")
	const [currentFolder, setCurrentFolder] = useState(ROOT_FOLDER)
	const [path, setPath] = useState(["root"])
	let {folderId=null} = useParams()
	if(folderId !== undefined && folderId !== null){ 
		database.folders.doc(folderId).get().then(folder => setCurrentFolder(folder.data()))
	}
	
	function openmodal(){
			setModalShow(true)
	}
	function closemodal(){
			setModalShow(false)
	}
	async function handleSubmit(e) {
		e.preventDefault()
		if(folderId === undefined){
			folderId = null
		}
		console.log(currentFolder)
		if(folderId !== null){
			setPath([...currentFolder.path])
			path.push({name: currentFolder.folderName, id: currentFolder.parentFolderId})
		}
		closemodal()
		await database.folders.add({
			folderName: folderName,
			userId: currentUser.uid,
			parentFolderId: folderId,
			createdAt: database.createdAt(),
			path: path
		})
		setFolderName("")
	}

	return (
	<>
		<Button onClick={openmodal} size="sm">
			<FontAwesomeIcon icon={faFolderPlus}/>
		</Button>
		<Modal
			show={modalShow}
			onHide={closemodal}
			aria-labelledby="contained-modal-title-vcenter"
			centered
			animation={false}
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Create Folder
				</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handleSubmit}>
				<Modal.Body>
					<Form.Control placeholder="Enter Name"
						type="text"
						onChange={
							(e)=> setFolderName(e.target.value)
						} 
						value={folderName}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button type="submit">Create Folder</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	</>
)
}

export default AddFolder
