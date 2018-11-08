import React from 'react'
import { Link } from 'react-router-dom'
import './header.css';

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <div className="navbar">
    <div className="navbar-button">
      <div className="navbar-text"><Link to='/home'>Home</Link></div>
    </div>
    <div className="navbar-button">
      <div className="navbar-text"><Link to='/my_listings'>My Listings</Link></div>
    </div>
    <div className="navbar-button">
      <div className="navbar-text"><Link to='/profile'>Profile</Link></div>
    </div>
  </div>
)

export default Header
