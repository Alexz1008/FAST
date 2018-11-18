import React from 'react'
import { Link } from 'react-router-dom'
import './header.css';

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <div className="navbar">
	  <div className="navbar-left">
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
    </div>
    <div className="navbar-right">
      <div className="navbar-search">
        <form action='/home' className="navbar-search-form">
          <input type="text" name="search" className = "navbar-search-input"/>
          <button type="submit" className ="navbar-search-button"><img className="navbar-search-image" src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png" alt="Search"/></button>
        </form>
      </div>
      <Link to='/login'><div className='navbar-button'>
          <div className="navbar-text">Logout</div>
      </div></Link>
    </div>
	
  </div>
)

export default Header
