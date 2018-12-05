import React from 'react'
import Header from '../Header/header'
import { Reviews } from '../Review/reviews'
import '../App.css'
import './profile.css'
import ViewProfile from './view_profile'

export class Profile extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <ViewProfile />
        <Reviews />
      </div>
    );
  }
}