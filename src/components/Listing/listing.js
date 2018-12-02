import React from 'react'
import { Link } from 'react-router-dom'
import './listing.css'
import fire from '../Fire/fire'
import { addToUserList, removeFromUserList } from '../Utilities/utilities'

export class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddClickSaved = this.handleAddClickSaved.bind(this);
    this.handleRemoveClickSaved = this.handleRemoveClickSaved.bind(this);
    this.handleAddInterestClick = this.handleAddInterestClick.bind(this);
    this.handleRemoveInterestClick = this.handleRemoveInterestClick.bind(this);
    this.state = {title: this.props.title, image: this.props.image, price: this.props.price, desc: this.props.desc, id: this.props.id,
                  isInterested: this.props.isInterested, saved: this.props.saved, confirmed: this.props.confirmed, isMyListing: this.props.isMyListing,
                  isLog: this.props.isLog, reviewed: this.props.reviewed, rating: this.props.rating, postdate: this.props.postdate, sellername: this.props.sellername,
                  sellerid: this.props.sellerid}

    this.constantsDB = fire.database().ref("Constants");
    this.userDB = fire.database().ref("Users");
    this.conversationDB = fire.database().ref("Conversation");

    // Load in the next unique listing DB number, or create one if it doesn't exist yet
    this.constantsDB.on('value', dataSnapshot => {
      if(dataSnapshot.child("Next_Conversation_ID").exists()) {
        let nextID = dataSnapshot.child("Next_Conversation_ID").val();
	this.setState({conversationID: nextID});
      }
      else {
        this.constantsDB.child("Next_Conversation_ID").set(1);
        this.setState({conversationID: 1});
      }
    });
  }

  // If the component gets mounted successfully, authenticate the user
  componentDidMount(){
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if(user) {
        this.setState({user});
      }
      else {
        this.setState({user: null});
      }
    });
  }

  // removes from the appropriate list of the user
  removeFromList(userID, itemID, listName) {
    let items = [];
    var user = this.userDB.child(userID);

    // if other items in the list exist, concatenate to the list
    user.once("value").then(function(snapshot) {
      if (snapshot.child(listName).exists() && snapshot.child(listName).val().indexOf(itemID) != -1) {
        items = snapshot.child(listName().val().splice(snapshot.child(listName().val().indexOf(itemID), 1 )));
      }
      user.update({[listName]: items});
    });
  }

  // adds to the appropriate list of the user
  addToList(userID, itemID, listName) {
    var items = [itemID];
    var user = this.userDB.child(userID);
    
    // if other items in the list exist, concatenate to the list
    user.once("value").then(function(snapshot) {
      if (snapshot.child(listName).exists()){
        items = items.concat(snapshot.child(listName).val());
      }
      user.update({[listName]: items});
    });
  }

  handleAddClickSaved() {
    this.setState({saved: true});
  }

  handleRemoveClickSaved() {
    this.setState({saved: false});
  }
  handleAddInterestClick() {
    this.setState({isInterested: true});
    
    const Seller_ID = this.state.sellerid;
    const Buyer_ID = this.state.user.uid;
    const Listing_ID = this.state.id;
    const Conversation_Title = this.state.title;

    var Conversation_ID = this.state.conversationID;
    var idExists = true;	      
    let constDB = this.constantsDB;
    let convDB = this.conversationDB;

    // create the new conversation in the database after making sure the id doesn't exist yet
    this.conversationDB.once("value").then(function(snapshot) {
      idExists = snapshot.child(Conversation_ID).exists();
      while(idExists) {
        Conversation_ID += 1;
        idExists = snapshot.child(Conversation_ID).exists();
      }

      convDB.child(Conversation_ID).set({Conversation_Title, Buyer_ID, Seller_ID, Listing_ID, Conversation_ID});

      // Increment the unique conversation ID and move on
      constDB.child("Next_Conversation_ID").set(Conversation_ID + 1);
    });
    // add conversation id to both users' conversation list
    addToUserList(Buyer_ID, Conversation_ID, "Conversations");
    addToUserList(Seller_ID, Conversation_ID, "Conversations");

    // add listing to buyers interested list
    addToUserList(Buyer_ID, Listing_ID, "Interest_Listings");
  }

  handleRemoveInterestClick() {
    this.setState({isInterested: false});
    this.setState({confirmed: false});
    removeFromUserList(this.state.user.uid, this.state.id, "Interest_Listings");
    var sellerId = this.state.sellerid;
    
    // Delete the conversation that was started
    fire.database().ref().once("value").then(function(snapshot) {
      
      // Get a list of all conversations the user is in
      let convs = snapshot.child("Users/" + this.user.uid + "/Conversations").val().split(",");
      
      // Iterate through every conversation until the one with matching seller id is found
      var i;
      for(i = 0; i < convs.length; i++) {
        if (snapshot.child("Conversations/" + convs[i] + "/Seller_ID").val() == sellerId) {
          snapshot.child("Conversations/" + convs[i] + "/Seller_ID").remove();
          break;
        }
      }
    });
  }
  handleDeleteListingClick() {
    console.log("delete listing");
  }
  handleEditListingClick() {
    console.log("delete listing");
  }
  handleReviewClick() {
    console.log("review");
  }
  handleDeleteReviewClick() {
    console.log("review");
  }
  render() {
    const isInterested = this.state.isInterested;
    const isMyListing= this.state.isMyListing;
    const isLog = this.state.isLog;
    const reviewed = this.state.reviewed;
    return (
	  <div className={isMyListing ? 'listing-container-self' : 'listing-container'}>
      <div className="listing-upper">
        <div className="listing-title"><b>{this.state.title}</b>Poster: {this.state.sellername}</div>
        <img className="listing-picture" src={this.state.image} alt="did not load" />
        <div className="listing-header">
          <div className="listing-header-item">
            Rating: {this.state.rating}
          </div>
          <div className="listing-header-item">
            ${this.state.price}
          </div>
          <div className="listing-header-item">
            Posted: {this.state.postdate}
          </div>
        </div>
        <hr width="80%"/>
        <div className="listing-desc">{this.state.desc}</div>
        <br />
        <center>
        </center>
      </div>
      <div className="listing-lower">
        <div>
          {isLog ?
              <div className="listing-log">
                {
                  isMyListing ?
                  console.log("invalid interested listing")
                  :
                  <button className='listing-button-unselected' id="writeReview" onClick={this.handleReviewClick}>
                    {this.state.reviewed ? 'Edit Review' : 'Write Review'}
                  </button>
                }
                {
                  reviewed ?
                  <button className='listing-button-unselected' id="deleteReview" onClick={this.handleDeleteReviewClick}>
                    Delete Review
                  </button>
                  :
                  console.log("no review")}
              </div>
            :
            <div className="listing-regular">
              <div>
                  {isMyListing ?
                    console.log("invalid interest listing")
                  : 
                  <button className={this.state.saved ? 'listing-button-selected' : 'listing-button-unselected'} id="saveButton" onClick={this.state.saved ? this.handleRemoveClickSaved : this.handleAddClickSaved}>
                    {this.state.saved ? 'Saved' : 'Save'}
                  </button>}
              </div>
              <div>
                  {isMyListing ?
                    console.log("invalid interest listing")
                  : 
                  <button className={isInterested ? 'listing-button-selected' : 'listing-button-unselected'} id="interestedListing" onClick={this.state.isInterested ? this.handleRemoveInterestClick : this.handleAddInterestClick}>
                    {isInterested ? 'Interested' : 'Show Interest'}
                  </button>}
              </div>
              <div>
                {isMyListing ?
                    <Link to="/edit_listing"><button className='listing-button-unselected' id="editListing">
                      Edit
                    </button></Link>
                    : console.log("invalid edit listing")}
              </div>
              <div>
                {isMyListing ?
                  <button className='listing-button-unselected' id="deleteListing" onClick={this.handleDeleteListingClick()}>
                    Delete
                  </button>
                : console.log("invalid delete listing")}
              </div>
            </div>
          }
        </div>
      </div>
	  </div>
    );
  }
}

export default Listing
