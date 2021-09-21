import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Context from '../Context'
import Login from '../Authentication/Login'
import Signup from '../Authentication/Signup'
import ForgotPassword from '../Authentication/ForgotPassword'
import SecureRoute from '../Authentication/SecureRoute'
import ViewPlans from '../student-components/ViewPlans'
import ClassContent from '../student-components/ClassContent'

export default function Home() {
  return (
    <Router>
      <Context>
        <Switch>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/" component={Login}/>
          <Route exact path='/forgotPassword' component={ForgotPassword}/>
          <SecureRoute exact path="/plans" component={ViewPlans}/>
          <SecureRoute exact path="/class/:userId/:planId" component={ClassContent}/>
        </Switch>
      </Context>
    </Router>
  )
}