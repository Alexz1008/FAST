import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CreateListing from '../CreateListing/create_listing'
import ForgotPassword from '../ForgotPassword/forgot_password'
import Home from '../Home/home'
import Login from '../Login/login'
import MyListings from '../MyListings/my_listings'
import Profile from '../Profile/profile'
import Register from '../Register/register'

const Main = () => (
  <Switch>
    <Route exact path='/' component={Login}/>
    <Route path='/create_listing' component={CreateListing}/>
    <Route path='/forgot_password' component={ForgotPassword}/>
    <Route path='/home' component={Home}/>
    <Route path='/login' component={Login}/>
    <Route path='/my_listings' component={MyListings}/>
    <Route path='/profile' component={Profile}/>
    <Route path='/register' component={Register}/>
  </Switch>
)

export default Main
