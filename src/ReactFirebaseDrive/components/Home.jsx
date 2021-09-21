import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Context from '../Context'
import Login from '../Authentication/Login'
import Signup from '../Authentication/Signup'
import DashBoard from './DashBoard'
import ForgotPassword from '../Authentication/ForgotPassword'
import SetUsername from "../Authentication/SetUsername"
import MainPage from './MainPage'
import Chat from '../reactSocket/Chat'
import SecureRoute from '../Authentication/SecureRoute'

export default function Home() {
  return (
    <Router>
      <Context>
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path='/forgotPassword' component={ForgotPassword}/>
          <Route exact path='/setUsername' component={SetUsername}/>
          <SecureRoute exact path="/Dashboard" component={DashBoard}/>
          <SecureRoute exact path='/folder/:folderId' component={DashBoard}/>
          <SecureRoute exact path='/Chat' component={Chat}/>
        </Switch>
      </Context>
    </Router>
  )
}