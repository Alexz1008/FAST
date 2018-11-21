import React from 'react'
import Header from '../Header/header'
import '../App.css'
import './profile.css'
import ViewProfile from './view_profile'

export class Profile extends React.Component {
  render () {
    return (
      <div>
        <Header />
          <div><ViewProfile /></div>
      </div>
    );
  }
}