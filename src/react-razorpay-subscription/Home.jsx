import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ViewPlans from './ViewPlans'
import CreatePlan from './CreatePlan'

export default function Home() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ViewPlans}/>
        <Route exact path="/createPlan" component={CreatePlan}/>
      </Switch>
    </Router>
  )
}