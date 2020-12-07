import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import List from './pages/List'
import EventDetails from './pages/EventDetails'
import CreateEvent from './pages/CreateEvent'
import EditEvent from './pages/EditEvent'

const Routes: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={List} />
          <Route path="/event/:id" exact component={EventDetails} />
          <Route path="/event/:id/edit" component={EditEvent} />
          <Route path="/create" component={CreateEvent} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default Routes
