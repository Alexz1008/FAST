import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/header'
import Sidebar from '../Sidebar/sidebar'
import '../App.css'
import './profile.css'
import Edit from './edit'



const EditProfile = () => (
  <div>
    <Header />
    <div><Edit /></div>
  </div>
)

export default EditProfile
