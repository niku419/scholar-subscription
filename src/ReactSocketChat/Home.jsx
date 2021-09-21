import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Chat from './Chat'
import RedirectPage from './RedirectPage'


export default function Home() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RedirectPage}/>
        <Route exact path="/:chatId" component={Chat}/>
      </Switch>
    </Router>
  )
}