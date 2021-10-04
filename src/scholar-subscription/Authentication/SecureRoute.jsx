import React, { useEffect, useState } from 'react'
import {Redirect, Route} from 'react-router-dom'
import {useAuth} from '../Context'
import UnAuthorized from '../Authcomponents/UnAuthorized'

export default function SecureRoute({component: Component, currentRole, ...rest}) {
  const { currentUser } = useAuth()
  const [role, setRole] = useState("")
  useEffect(() => {
    setRole(localStorage.getItem("role"))
  }, [])

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? (
          (role === currentRole) ? <Component {...props} /> : <UnAuthorized/>
        ) : <Redirect to="/" />
      }}
  ></Route>
  )
}