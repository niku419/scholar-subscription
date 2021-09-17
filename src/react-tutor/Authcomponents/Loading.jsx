import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function Loading() {
  return (
    <div style={{display: "grid", placeItems:"center"}}>
      <Spinner animation="border" variant="light" />
    </div>
  )
}
