import React from 'react'
import { MessageSidebarButton } from './MessageSidebarButton/message_sidebar_button'
import './message_sidebar.css'

export class MessageSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {listings: this.props.listings};
    this.getSidebarButtons = this.getSidebarButtons.bind(this);
  }
	
  componentWillReceiveProps(nextProps) {
    if (nextProps.listings !== this.props.listings) {
      this.setState({listings: nextProps.listings});
    }
  }

  // retrieves sidebar buttons
  getSidebarButtons() { 
    var currID = this.props.currID;
    // make sure this.state is loaded
    if (this.state && this.state.listings) {
      return this.state.listings.map((item) =>
        <MessageSidebarButton image={item['Listing_Pic']} title={item['Listing_Title']} userID={this.props.userID} 
	  convID={item['Conversation_ID']} key={item['Conversation_ID']} active={item['Conversation_ID'] === currID} listing={item}
	  callbackFunction={this.props.callbackFunction}/>
      );
    } else {
      return (<div></div>)
    }
  }

  render() {
    return(
      <div className="message-sidebar">
        {this.getSidebarButtons()}
      </div>
    )
  }
}
export default MessageSidebar
