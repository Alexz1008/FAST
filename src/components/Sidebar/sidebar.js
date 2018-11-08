import React from 'react'
import './sidebar.css';

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <div className="sidebar">
    <div className="sidebar-button">
      <div className="sidebar-text">Sidebar Item 1</div>
    </div>
    <div className="sidebar-button">
      <div className="sidebar-text">Sidebar Item 2</div>
    </div>
    <div className="sidebar-button">
      <div className="sidebar-text">Sidebar Item 3</div>
    </div>
  </div>
)

export default Header
