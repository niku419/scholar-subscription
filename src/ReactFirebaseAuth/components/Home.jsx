import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Context from '../Context'
import Login from '../Authentication/Login'
import Signup from '../Authentication/Signup'
import DashBoard from './DashBoard'
import ForgotPassword from '../Authentication/ForgotPassword'
import MainPage from './MainPage'
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
          <SecureRoute exact path="/Dashboard" component={DashBoard}/>
          <SecureRoute exact path='/folder/:folderId' component={DashBoard}/>
        </Switch>
      </Context>
    </Router>
  )
}