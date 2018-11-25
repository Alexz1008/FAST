import React from 'react'
import './sidebar.css';
import { Link } from 'react-router-dom'

const Sidebar = () => (
  <div className="sidebar">
    <button className="sidebar-button-createlisting">
      <Link to="/create_listing"><div className="sidebar-text"><b>Create Listing</b></div></Link>
    </button>
    <button className="sidebar-button">
      <div className="sidebar-text">i-Clickers</div>
    </button>
    <button className="sidebar-button">
      <div className="sidebar-text">Textbooks</div>
    </button>
    <button className="sidebar-button">
      <div className="sidebar-text">Furniture</div>
    </button>
  </div>
)

export default Sidebar
