import React from 'react'
import Header from '../Header/header'
import Sidebar from '../Sidebar/sidebar'
import './my_listings.css'

const MyListings = () => (
  <div>
    <Header />
    <div className="content">
      <Sidebar />
      Your listings here!
    </div>
  </div>
)

export default MyListings
