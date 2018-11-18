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
      <div className="navbar-text">My Profile</div>
    </div></Link>
    <Link to='/transaction_history'><div className="navbar-button">
      <div className="navbar-text">Transaction History</div>
    </div></Link>
    <Link to='/messages'><div className="navbar-button">
      <div className="navbar-text">My Messages</div>
    </div></Link>
    <div className = "navbar-search">
      <form action='/home'>
        <input type="text" name="search"/>
        <button type="submit"><img src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png" alt="Search" height = "30" width = "30"/></button>
      </form>
    </div>
      <Link to='/login'><div className='navbar-button'>
          <div className="navbar-text">Logout</div>
      </div></Link>
  </div>
)

export default Header
