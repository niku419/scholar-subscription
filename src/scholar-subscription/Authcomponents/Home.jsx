import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Context from '../Context'
import StudentLogin from '../Authentication/StudentLogin'
import StudentSignup from '../Authentication/StudentSignup'
import TeacherLogin from '../Authentication/TeacherLogin'
import TeacherSignup from '../Authentication/TeacherSignup'
import ForgotPassword from '../Authentication/ForgotPassword'
import SecureRoute from '../Authentication/SecureRoute'
import ViewPlans from '../tutor-components/ViewPlans'
import CreatePlan from '../tutor-components/CreatePlan'
import Subscriptions from '../student-components/Subscriptions'
import ClassContent from '../student-components/ClassContent'

export default function Home() {
  return (
    <Router>
      <Context>
        <Switch>
          <Route exact path="/" component={StudentLogin}/>
          <Route exact path="/student-signup" component={StudentSignup}/>
          <Route exact path="/teacher-login" component={TeacherLogin}/>
          <Route exact path="/teacher-signup" component={TeacherSignup}/>
          <Route exact path='/forgotPassword' component={ForgotPassword}/>
          <SecureRoute exact path="/subscriptions" component={Subscriptions}/>
          <SecureRoute exact path="/class/:userId/:planId" component={ClassContent}/>
          <SecureRoute exact path="/plans" component={ViewPlans}/>
          <SecureRoute exact path="/createPlan" component={CreatePlan}/>
        </Switch>
      </Context>
    </Router>
  )
}