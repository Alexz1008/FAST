import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/header'
import Sidebar from '../Sidebar/sidebar'
import '../App.css'
import './profile.css'
import EditProfile from './editProfile'

// const profileFormContainer = document.querySelector('.profile-form-container')


const Profile = () => (
  <div>
    <Header />
    <div className = "content">
      <Sidebar />
      <h1>My Profile</h1>
      <div><EditProfile /></div>

	</div>

  </div>
)

export default Profile
