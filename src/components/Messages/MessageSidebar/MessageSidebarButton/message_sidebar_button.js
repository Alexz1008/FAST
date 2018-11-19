import React from 'react'
import './message_sidebar_button.css'

export class MessageSidebarButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {active: this.props.active}
  }
  render() {
    return (
      <button className={this.state.active ? 'conversation-button-active' : 'conversation-button'}>
        <img className="conversation-picture" src={this.props.image} alt="did not load" />
        <div className="conversation-title">{this.props.title}</div>
      </button>
    );
  }
}
