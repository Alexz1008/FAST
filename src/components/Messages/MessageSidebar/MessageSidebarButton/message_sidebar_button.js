import React from 'react'
import './message_sidebar_button.css'

export class MessageSidebarButton extends React.Component {
  render() {
    return (
      <button className="conversation-button">
        <img className="conversation-picture" src={this.props.image} alt="did not load" />
        <div className="conversation-title">{this.props.title}</div>
      </button>
    );
  }
}
