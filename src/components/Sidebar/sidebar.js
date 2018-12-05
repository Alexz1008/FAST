import React from 'react'
import './sidebar.css';

export class Sidebar extends React.Component {
  render() {
    const categories = ["i-Clickers", "Food", "Furniture", "Housing", "Textbooks"];
    const SidebarButtons = categories.map(item => 	
      <button className="sidebar-button" name={item} onClick={(e) => this.props.callbackFunction(item)}>
        <div className="sidebar-text">{item}</div>
      </button>
    )

    return (
      <div className="sidebar">
	{SidebarButtons}
      </div>
    )
  }
}

export default Sidebar
