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
import Main from './Main'

export default function Home() {
  return (
    <Router>
      <Context>
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path="/student-login" component={StudentLogin}/>
          <Route exact path="/student-signup" component={StudentSignup}/>
          <Route exact path="/teacher-login" component={TeacherLogin}/>
          <Route exact path="/teacher-signup" component={TeacherSignup}/>
          <Route exact path='/forgotPassword' component={ForgotPassword}/>
          <SecureRoute exact path="/subscriptions" currentRole="student" component={Subscriptions}/>
          <SecureRoute exact path="/class/:userId/:planId" currentRole="student" component={ClassContent}/>
          <SecureRoute exact path="/plans" currentRole="teacher" component={ViewPlans}/>
          <SecureRoute exact path="/createPlan" currentRole="teacher" component={CreatePlan}/>
        </Switch>
      </Context>
    </Router>
  )
}