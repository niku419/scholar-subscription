import React from 'react'
import { v4 as uuidV4 } from 'uuid'
import { Redirect } from 'react-router-dom'

export default function RedirectPage() {
  const redirectURL = `/${uuidV4()}`
  return (
    <div>
      <Redirect to={redirectURL}/>
    </div>
  )
}
