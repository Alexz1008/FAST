import React from 'react'
import Header from '../Header/header'
import '../App.css'
import './profile.css'
import Edit from './edit'

export class EditProfile extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div><Edit /></div>
      </div>
    );
  }
}
