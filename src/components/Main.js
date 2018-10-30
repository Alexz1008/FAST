import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Profile from './Profile'
import MyListings from './MyListings'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/profile' component={Profile}/>
      <Route path='/mylistings' component={MyListings}/>
    </Switch>
  </main>
)

export default Main
