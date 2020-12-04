import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={() => <h1>List</h1>} />
        <Route path="/create" component={() => <h1>Create</h1>} />
        <Route path="/event/:id" component={() => <h1>Edit</h1>} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
