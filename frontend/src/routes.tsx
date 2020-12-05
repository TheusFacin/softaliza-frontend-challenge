import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import List from './pages/List'
import EventDetails from './pages/EventDetails'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={List} />
        <Route path="/event/:id" component={EventDetails} />
        <Route path="/create" component={() => <h1>Create</h1>} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
