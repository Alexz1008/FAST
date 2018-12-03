import React from 'react'
import { MessageSidebarButton } from './MessageSidebarButton/message_sidebar_button'
import './message_sidebar.css'

const images = ['https://i5.walmartimages.ca/images/Large/580/6_r/875806_R.jpg',
                'https://cdn.discordapp.com/attachments/431923743028412427/513601584748560384/image0.jpg',
'https://uwaterloo.ca/centre-for-teaching-excellence/sites/ca.centre-for-teaching-excellence/files/styles/sidebar-220px-wide/public/iclicker.png?itok=J1P1LRte',
'https://www.pearsonhighered.com/assets/bigcovers/0/1/3/1/0131374699.jpg',
'http://cuhsphysics.weebly.com/uploads/3/8/9/5/38955313/1484413_orig.png',
'https://target.scene7.com/is/image/Target/GUEST_3954d54d-41c2-4b87-8929-d60d47a574e6'];
const ids = [0, 1, 2, 3, 4, 5];
const titles = ["Singular Banana", "Single in La Jolla Palms", "iClicker", "AP CS Textbook", "Physics Textbook", "Couch"];
const active = [true];

export class MessageSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.setState({listings: this.props.listings}, () =>{
      console.log(this.state.listings);
    });
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
        <MessageSidebarButton image={item['Listing_Pic']} title={item['Listing_Title']} 
	  convID={item['Conversation_ID']} active={item['Conversation_ID'] == currID}
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
