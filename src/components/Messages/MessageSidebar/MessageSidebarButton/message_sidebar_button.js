import React from 'react'
import './message_sidebar_button.css'

export class MessageSidebarButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {active: this.props.active}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      this.setState({active: nextProps.active});
    }
  }
	
  render() {
    return (
      <button className={this.state.active ? 'conversation-button-active' : 'conversation-button'} onClick={(e) => this.props.callbackFunction(this.props.convID, this.props.listing)}>
        <img className="conversation-picture" src={this.props.image} alt="did not load" />
        <div className="conversation-button-right">
          <div className="conversation-title">{this.props.title}</div>
          <div>{this.props.userID === this.props.listing['Buyer_ID'] ? this.props.listing['Seller_Name'] : this.props.listing['Buyer_Name']}</div>
          <div>{this.props.listing['Is_Transaction_Log'] ? this.props.listing['Buyer_ID'] ? 'Transaction Complete' : 'No Longer Available' : null}</div>
        </div>
      </button>
    );
  }
}
