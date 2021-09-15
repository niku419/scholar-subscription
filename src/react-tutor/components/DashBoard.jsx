import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useAuth } from "../Context"
import NavBar from './NavBar'
import NavbarBottom from './NavbarBottom'
import { Redirect } from 'react-router-dom'

export default function Dashboard() {
  const {currentUser} = useAuth()
  const [game, setMyGame] = useState(true)
  function handleSubmit(e){
    e.preventDefault()
    console.log('something')
  }
  useEffect(()=>{
    if(game){ 
      const Script = document.createElement("script");
      const Form = document.getElementById('donate');
      Script.setAttribute('src','https://cdn.razorpay.com/static/widget/subscription-button.js')
      Script.setAttribute('data-subscription_button_id','pl_HxiuQAvAdedWqk')
      Script.setAttribute('data-button_theme', 'rzp-dark-standard')
      Script.async = true
      // <form><script src="https://cdn.razorpay.com/static/widget/subscription-button.js" data-subscription_button_id="pl_HxiuQAvAdedWqk" data-button_theme="rzp-dark-standard" async> </script> </form>
      Form.appendChild(Script);
      setMyGame(false)
    }
  },[game])
  // 4718 6091 0820 4366
    return (
      <Container fluid className="p-0 m-0">
        {!currentUser && <Redirect to='/'/>}
        <NavBar/> 
        <h1 className="heading">You just logged in!!</h1>
        <form id="donate" onSubmit={handleSubmit}></form>
        <NavbarBottom/>
      </Container>
  )
}