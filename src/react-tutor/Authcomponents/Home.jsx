import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Context from '../Context'
import Login from '../Authentication/Login'
import Signup from '../Authentication/Signup'
import ForgotPassword from '../Authentication/ForgotPassword'
import MainPage from './MainPage'
import SecureRoute from '../Authentication/SecureRoute'
import ViewPlans from '../tutor-components/ViewPlans'
import CreatePlan from '../tutor-components/CreatePlan'

export default function Home() {
  return (
    <Router>
      <Context>
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path='/forgotPassword' component={ForgotPassword}/>
          <SecureRoute exact path="/plans" component={ViewPlans}/>
          <SecureRoute exact path="/createPlan" component={CreatePlan}/>
        </Switch>
      </Context>
    </Router>
  )
}