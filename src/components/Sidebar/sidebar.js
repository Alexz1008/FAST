import React from 'react'
import './sidebar.css';

const Sidebar = () => (
  <div className="sidebar">
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
