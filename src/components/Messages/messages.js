import React from 'react'
import Header from '../Header/header'
import MessageSidebar from './MessageSidebar/message_sidebar'
import './messages.css'
import fire from '../Fire/fire'
import { addToUserList, addToConversationList } from '../Utilities/utilities'

export class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.getConversations = this.getConversations.bind(this);
    this.getActiveConversation = this.getActiveConversation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.postMessage = this.postMessage.bind(this);
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
            listing['Conv_Seller_Confirmed'] = snapshot.child("Conversation/" + userConvs[i] + "/Seller_Confirm");
            listings.push(listing);
          
            // Figure out if a seller has confirmed this listing once before
            var listingConfirmed = listing.Seller_Confirmed;
            var convSellerConfirmed = 
            this.setState({currID: userConvs[i], listingConfirmed: listing.Seller_Confirmed,
                            confirmText: listing.Seller_Confirmed ? 'Already confirmed' : 'Confirm Transaction'}, () => {
                this.getMessages();
            });
          }
        }
      }
      this.setState({conversations: userConvs[i], listings: listings.reverse(), loaded: true});
    });
  }

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
        addToConversationList(Conversation_ID, Message_ID);
        constDB.child("Next_Message_ID").set(Message_ID + 1);
      });
      document.getElementById('messages-input').value = '';
    }
  }
 
  getMessages() {
    fire.database().ref().on('value', snapshot => {
      let messages = [];
      console.log(this.state.currID);
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
    if(this.state.messages && this.state.messages.length >= 0) {
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
    if(this.state.loaded && this.state.listings.length === 0) {
      messages = "";
    }
    return (
      <div className="messages">
        <Header />
        {this.state.loaded ?
        <div className="messages-content">
          <MessageSidebar listings={this.state.listings} currID={this.state.currID} callbackFunction={this.getActiveConversation}/>
          <div className="messages-messenger">
            <div className="messages-messages" id="messageBody">
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
