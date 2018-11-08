import React from 'react'
import { Link } from 'react-router-dom'
import './header.css';

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <div className="navbar">
    <Link to='/home'><div className="navbar-button">
      <div className="navbar-text">Home</div>
    </div></Link>
    <Link to='/my_listings'><div className="navbar-button">
      <div className="navbar-text">My Listings</div>
    </div></Link>
    <Link to='/profile'><div className="navbar-button">
      <div className="navbar-text">Profile</div>
    </div></Link>
  </div>
)

export default Header
