import React from 'react'
import Header from '../Header/header'
import MessageSidebar from './MessageSidebar/message_sidebar'
import './messages.css'
import fire from '../Fire/fire'
import { addToUserList } from '../Utilities/utilities'


// const messageid = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// const fromSender = [true, false, false, true, true, false, true, false, true, false]
// const messages = ["Hello?","Hello!","Are you still interested in purchasing this banana?", "Yes I am.", "Where can we meet up?",
// "How about we meet up in front of Geisel at 10 AM tomorrow?", "I can't make 10 AM, can you do 11 AM instead?", "Sure, that's fine!",
// "Great, see you then!", "Yep, see you!"];
// const timestamps = ["3:02:21 PM", "3:02:28 PM", "3:02:48 PM", "3:03:12 PM", "3:03:16 PM", "3:03:44 PM", "3:05:10 PM", "3:05:25 PM",
// "3:05:31 PM", "3:05:34 PM"];
// const recipient = "John";
// const user = "You";
// const getMessages = messageid.map((id) =>
  // <div>
    // {(fromSender[id]) ? (
      // <div className="messages-sent">
        // <div className = "messages-sent-text">
          // {messages[id]}
        // </div>
        // <div className="hover">
          // [{timestamps[id]}]
        // </div>
      // </div>)
      // :
      // (<div className="messages-received">
        // <div className = "messages-received-text">
        // {messages[id]}
        // </div>
        // <div className="hover">
          // [{timestamps[id]}]
        // </div>
      // </div>)}
  // </div>
// );

export class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.getConversations = this.getConversations.bind(this);
    this.getActiveConversation = this.getActiveConversation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.addToConversationList = this.addToConversationList.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.handleConfirmTransaction = this.handleConfirmTransaction.bind(this);
    this.handleCancelTransaction = this.handleCancelTransaction.bind(this);

    this.messagesDB = fire.database().ref("Message");
    this.conversationsDB = fire.database().ref("Conversation");
    this.constantsDB = fire.database().ref("Constants");
    this.usersDB = fire.database().ref("Users");
    this.listingsDB = fire.database().ref("Listing");

    this.state = {
      confirmText: "Loading...",
      listingConfirmed: false,
      loaded: false,
      conversations: "",
      listings: ""
    };
  }
  
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.postMessage()
      
    }
  }
  
  getConversations() {
    // Evan code fix
    var userID = this.state.user.uid;
    let listings = [];
    fire.database().ref().once('value', snapshot => {
      // Check if the user has any conversations
      let userConvs = snapshot.child("Users/" + userID + "/Conversations").val().split(",");
      
      // Load in every conversation the user has
      var i;
      for(i = 0; i < userConvs.length; i++) {
        if(userConvs[i] != "") {
          let id = snapshot.child("Conversation/" + userConvs[i] + "/Listing_ID").val();
          let listing = snapshot.child("Listing/" + id).val();
          if(listing != null) {
            listing['Conversation_ID'] = userConvs[i];
            listings.push(listing);
          }
          
          // Push the last listing as the active conversation
          this.setState({currID: userConvs[i], listingConfirmed: listing.Seller_Confirmed,
                          confirmText: listing.Seller_Confirmed ? 'Already confirmed' : 'Confirm Transaction'}, () => {
              this.getMessages();
          });
        }
      }
      this.setState({conversations: userConvs[i], listings: listings.reverse(), loaded: true});
    });
  }
    
    // access conversations in list database (Old evan code)
    /*
    this.userDB = this.usersDB;
    this.conversationDB = this.conversationsDB;
    this.listingDB = this.listingsDB;
    this.userDB.child(this.state.user.uid).child("Conversations").once('value', listSnapshot => {

      if (listSnapshot.exists()) {
        // access conversation database
        this.conversationDB.once('value', convSnapshot => {

          // access listing database
          this.listingDB.once('value', listingSnapshot => {

            let conversations = [];
            let listings = [];

            // go through each conversation
            let conv = listSnapshot.val();
            conversations = this.getArrayFromList(conv);
            if(conversations && conversations.length > 0) {    
              conversations.forEach((conv) => {
                // get listing id from conversation database and get listing from listing database
                let id = convSnapshot.child(conv).child("Listing_ID").val();
                let listing = listingSnapshot.child(id).val();
                if(listing != null) {
                  listing['Conversation_ID'] = conv;
                  listings.push(listing);
                }

                // set the current active conversation
                if (!this.state.currID) {
                  this.setState({currID: conv}, () => {
                          this.getMessages();
                  });
                }
              });
            }
            this.setState({conversations: conversations}, () => {
              console.log(this.state.conversations);
            });
            this.setState({listings: listings}, () => {
              console.log(this.state.listings);
            });
          });
        });
      }
    });
    */

  getActiveConversation(id, listing){
    this.setState({currID: id}, () => {
      this.getMessages();
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
      if(user) {
        this.setState({user});
        callback();
      }
      else {
        this.setState({user: null});
      }
    });
  }

  handleChange(e) {
    this.setState({message: e.target.value});
  }

  postMessage(e) {
    if(this.state.message) {
      const Message = this.state.message;
      const Sender_ID = this.state.user.uid;
      const Conversation_ID = this.state.currID;

      var TimeStamp;
      var Message_ID;
      var idExists = true;
      var d = new Date();
      let messageDB = this.messagesDB;
      let constDB = this.constantsDB
      let messages = [];

      TimeStamp = "" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

      fire.database().ref().once("value").then((snapshot) => {
        Message_ID = snapshot.child("Constants/Next_Message_ID").val();
        idExists = snapshot.child("Message/" + Message_ID).exists();
        while(idExists) {
          Message_ID += 1;
          idExists = snapshot.child("Message/" + Message_ID).exists();
        }
        const NewMessage = {Message, Sender_ID, TimeStamp, Message_ID};
        
        // Add to the new messages list locally
        let messageIDList = snapshot.child("Conversation/" + Conversation_ID + "/Message_List").val().split(",");
        
        // Add the new message to the message list DB
        messageDB.child(Message_ID).set(NewMessage);
        this.addToConversationList(Conversation_ID, Message_ID);
        constDB.child("Next_Message_ID").set(Message_ID + 1);
      });
      document.getElementById('messages-input').value = '';

      
    }
  }

  addToConversationList(convID, messageID) {
    var separator = ",";
    var list = "" + messageID;
    var db = this.conversationsDB.child(convID);
    var listName = "Message_List";

    db.once("value").then(function(snapshot) {
      // if other items in the list exist, concatenate to the list
      if (snapshot.child(listName).exists()){
        list = snapshot.child(listName).val().split(separator);

      // if this id is a duplicate, don't concatenate    
      if(list.indexOf("" + messageID) == -1) {
          list = list.concat(messageID);
      }

      //Filter the list to remove any empty items in the list
      list = list.filter(function (el) {
        return el != "";
      });
      list = list.join(separator);
      }
      db.child(listName).set(list);
      
    });
  }
 
  getMessages() {
    // Evan code fix
    fire.database().ref().on('value', snapshot => {
      let messages = [];
      let messageIDList = snapshot.child("Conversation/" + this.state.currID + "/Message_List").val().split(",");
      
      // For each message in the list, add them to messages
      var i;
      for(i = 0; i < messageIDList.length; i++) {
        if(messageIDList[i] != "") {
          messages.push(snapshot.child("Message/" + messageIDList[i]).val());
        }
      }
      this.setState({messages: messages});
      var chatScroll = document.getElementById("messageBody");
      chatScroll.scrollTop = chatScroll.scrollHeight;
      
    });
  }
      
    /*
    if (this.state && this.state.user && this.state.currID) {
      let convDB = this.conversationsDB;
      let userDB = this.usersDB;
      let messageDB = this.messagesDB;
      let messages = [];
      let convID = this.state.currID;
      let user = this.state.user.uid;

      // get user's name
      userDB.once('value', dataSnapshot => {
        let username = dataSnapshot.child(user).child("Name").val();
        this.setState({username: username});
      });

      convDB.on('value', dataSnapshot => {
        var messageList = dataSnapshot.child(convID).child("Message_List").val();
        var messageArray = this.getArrayFromList(messageList);
      
        messageDB.on('value', snapshot => {
          messageArray.forEach((item) => {
            messages.push(snapshot.child(item).val());
          });
        });
        this.setState({messages: messages}, () => {
          this.forceUpdate();
        });
      });
    }
    */
  
  handleConfirmTransaction() {
    // Check if the user is the buyer or seller
    var convID = this.state.currID;
    var userID = this.state.user.uid;
    fire.database().ref().once('value', snapshot => {
      var listingID = snapshot.child("Conversation/" + convID + "/Listing_ID").val();
      var sellerID = snapshot.child("Conversation/" + convID + "/Seller_ID").val();
      var buyerID = snapshot.child("Conversation/" + convID + "/Buyer_ID").val();
      
      // Buyer confirms transaction
      if(snapshot.child("Conversation/" + convID + "/Buyer_ID").val() === userID) {
        fire.database().ref().child("Conversation/" + convID + "/Buyer_Confirm").set(true);
        
        // If seller has already confirmed, complete the transaction and log it
        if(snapshot.child("Conversation/" + convID + "/Seller_Confirm").val() === true) {
          fire.database().ref().child("Listing/" + listingID + "/Is_Transaction_Log").set(true);
          
          // Add the log to both user's transaction histories
          addToUserList(userID, listingID, "Completed_Transactions");
          addToUserList(sellerID, listingID, "Completed_Transactions");
          this.setState({listingConfirmed: true, confirmText: 'Cancel Transaction'});
        }
      }
      
      // Seller confirms transaction
      else {
        fire.database().ref().child("Conversation/" + convID + "/Seller_Confirm").set(true);
        fire.database().ref().child("Listing/" + listingID + "/Seller_Confirmed").set(true);
        if(snapshot.child("Conversation/" + convID + "/Buyer_Confirm").val()) {
          fire.database().ref().child("Listing/" + listingID + "/Is_Transaction_Log").set(true);
          
          addToUserList(userID, listingID, "Completed_Transactions");
          addToUserList(buyerID, listingID, "Completed_Transactions");
          this.setState({listingConfirmed: true, confirmText: 'Cancel Transaction'});
        }
      }
    });
  }
  
  handleCancelTransaction() {
    // Check if the user is the buyer or seller
    var convID = this.state.currID;
    var userID = this.state.user.uid;
    fire.database().ref().once('value', snapshot => {
      var listingID = snapshot.child("Conversation/" + convID + "/Listing_ID").val();
      var sellerID = snapshot.child("Conversation/" + convID + "/Seller_ID").val();
      var buyerID = snapshot.child("Conversation/" + convID + "/Buyer_ID").val();
      
      // Buyer cancels transaction
      if(snapshot.child("Conversation/" + convID + "/Buyer_ID").val() === userID) {
        fire.database().ref().child("Conversation/" + convID + "/Buyer_Confirm").set(false);
        this.setState({listingConfirmed: false, confirmText: 'Confirm Transaction'});
      }
      
      // Seller cancels transaction
      else {
        fire.database().ref().child("Conversation/" + convID + "/Seller_Confirm").set(false);
        fire.database().ref().child("Listing/" + listingID + "/Seller_Confirmed").set(false);
        this.setState({listingConfirmed: false, confirmText: 'Confirm Transaction'});
      }
    });
  }

  render() {
    var messages = "Loading...";
    var listings;
    if(this.state.messages) {
      messages = this.state.messages.map(message =>
        <div className={this.state.user.uid === message['Sender_ID'] ? 'messages-sent' : 'messages-received'} key={message['Listing_ID']}>
          <div className={this.state.user.uid === message['Sender_ID'] ? 'messages-sent-text' : 'messages-received-text'} key={message['Listing_ID']}>
            {message['Message']}
          </div>
          <div className="hover">
          {message['TimeStamps']}
          </div>
        </div>
      );
    }
    return (
      <div className="messages">
        <Header />
        {this.state.loaded ?
        <div className="messages-content">
        {console.log(this.state.listings)}
          <MessageSidebar listings={this.state.listings} currID={this.state.currID} callbackFunction={this.getActiveConversation}/>
          <div className="messages-messenger">
            <div className="messages-messages" id = "messageBody">
              {messages}
            </div>
            <div className="messages-messenger-container">
              <input className="messages-messenger-input" id="messages-input" onKeyPress={this._handleKeyPress} onChange={this.handleChange}></input>
              <button className="messages-messenger-sender" onClick={this.postMessage}>Send</button>
              <button className={this.state.listingConfirmed ? "messages-confirmtransaction-disabled" : "messages-confirmtransaction-enabled"}
              disabled={this.state.listingConfirmed} onClick={this.state.listingConfirmed ? this.handleCancelTransaction : this.handleConfirmTransaction}>{this.state.confirmText}</button>
            </div>
          </div>
        </div>
        :
        null}
      </div>
    );
  }
}
