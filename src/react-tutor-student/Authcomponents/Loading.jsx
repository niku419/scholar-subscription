import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function Loading() {
  return (
    <div style={{display: "grid", placeItems:"center", height: "100vh"}}>
      <Spinner animation="border" />
    </div>
  )
}
