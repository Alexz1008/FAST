import React from 'react'
import Header from '../Header/header'
import MessageSidebar from './MessageSidebar/message_sidebar'
import './messages.css'
import fire from '../Fire/fire'


const messageid = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const fromSender = [true, false, false, true, true, false, true, false, true, false]
const messages = ["Hello?","Hello!","Are you still interested in purchasing this banana?", "Yes I am.", "Where can we meet up?",
"How about we meet up in front of Geisel at 10 AM tomorrow?", "I can't make 10 AM, can you do 11 AM instead?", "Sure, that's fine!",
"Great, see you then!", "Yep, see you!"];
const timestamps = ["3:02:21 PM", "3:02:28 PM", "3:02:48 PM", "3:03:12 PM", "3:03:16 PM", "3:03:44 PM", "3:05:10 PM", "3:05:25 PM",
"3:05:31 PM", "3:05:34 PM"];
const recipient = "John";
const user = "You";
const getMessages = messageid.map((id) =>
  <div>
    {(fromSender[id]) ? (
      <div className="messages-sent">
        <div className = "messages-sent-text">
          {messages[id]}
        </div>
        <div className="hover">
          [{timestamps[id]}]
        </div>
      </div>)
      :
      (<div className="messages-received">
        <div className = "messages-received-text">
        {messages[id]}
        </div>
        <div className="hover">
          [{timestamps[id]}]
        </div>
      </div>)}
  </div>
);

export class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.getConversations = this.getConversations.bind(this);
    this.getMessageSidebar = this.getMessageSidebar.bind(this);
  }

  getConversations() {
    this.userDB = fire.database().ref("Users");
    this.conversationDB = fire.database().ref("Conversation");
    this.listingDB = fire.database().ref("Listing");

    // access conversations in list database
    this.userDB.child(this.state.user.uid).child("Conversations").once('value', listSnapshot => {

      // access conversation database
      this.conversationDB.once('value', convSnapshot => {

        // access listing database
        this.listingDB.once('value', listingSnapshot => {

          let conversations = [];
          let listings = [];

	  // go through each conversation
          let conv = listSnapshot.val();
          var convID = "";
          var separator = ","
	  console.log(conv);
            
	  // get conversation ids of user list
          for (var i = 0; i<conv.length; i++) {
            var curr = conv.charAt(i);
	    if (curr !== separator) {
	      convID = convID + curr;
	    } else {
              conversations.push(convID);
              convID = "";
	    }
          }

	  if (convID) {
            conversations.push(convID);
	  }
	      
          conversations.forEach((conv) => {
	    // get listing id from conversation database and get listing from listing database
	    let id = convSnapshot.child(conv).child("Listing_ID").val();
	    let listing = listingSnapshot.child(id).val();
            console.log(listing);
	    listings.push(listing);
          });
          this.setState({conversations: conversations}, () => {
	    console.log(this.state.conversations);
          });
          this.setState({listings: listings}, () => {
	    console.log(this.state.listings);
          });
        });
      });
    });
  }

  // If the component gets mounted successfully, authenticate the user
  componentDidMount(){
    this.authListener(() => {
      this.getConversations(); 
    });
  }

  // Create a method to authenticate the user with our existing database
  authListener(callback) {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      // If the user is detected, save it to the current state
      if(user) {
        this.setState({user});
        //localStorage.setItem('user',user.uid);
	callback();
      }
      // Otherwise set the current user to null
      else {
        this.setState({user: null});
        //localStorage.removeItem('user');
      }
    });
  } 

  getMessageSidebar() {
    if (this.state && this.state.listings) {
     return <MessageSidebar listings={this.state.listings}/>
    } else {
     return <MessageSidebar />
    }
  }

  render() {
    return (
      <div className="messages">
        <Header />
        <div className="messages-content">
	  {this.getMessageSidebar()}
          <div className="messages-messenger">
            <div className="messages-messages">
              {getMessages}
            </div>
            <div className="messages-messenger-container">
              <input className="messages-messenger-input"></input>
              <button className="messages-messenger-sender">Send</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
