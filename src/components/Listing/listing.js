import React from 'react'
import { Link } from 'react-router-dom'
import './listing.css'

export class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddClickSaved = this.handleAddClickSaved.bind(this);
    this.handleRemoveClickSaved = this.handleRemoveClickSaved.bind(this);
    this.handleAddInterestClick = this.handleAddInterestClick.bind(this);
    this.handleRemoveInterestClick = this.handleRemoveInterestClick.bind(this);
    this.updateList = this.updateList.bind(this);
    this.state = {title: this.props.title, image: this.props.image, price: this.props.price, desc: this.props.desc, id: this.props.id,
                  isInterested: this.props.isInterested, saved: this.props.saved, confirmed: this.props.confirmed, isMyListing: this.props.isMyListing,
                  isLog: this.props.isLog, reviewed: this.props.reviewed, rating: this.props.rating, postdate: this.props.postdate, sellername: this.props.sellername, sellerid: this.props.sellerid, buyerid: this.props.buyerid}

    this.constantsDB = this.props.db.database().ref("Constants");
    this.listsDB = this.props.db.database().ref("Lists");
    this.conversationDB = this.props.db.database().ref("Conversation");

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

  // adds conversation to conversation list of user
  updateList(userID, itemID, listName) {
    var items = [itemID];
    let userDB = this.listsDB.child(userID);

    // if user has other conversations
    userDB.once("value").then(function(snapshot) {
    if (snapshot.child(listName).exists()){
      items = items.concat(snapshot.child(listName).val());
    }
      userDB.set({[listName]: items});
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
    
    const sellerID = this.state.sellerid;
    const buyerID = this.state.buyerid;
    const listID = this.state.id;
    const title = this.state.title;

    var convID = this.state.conversationID;
    var idExists = true;	      
    let constDB = this.constantsDB;
    let convDB = this.conversationDB;

    // create the new conversation in the database after making sure the id doesn't exist yet
    this.conversationDB.once("value").then(function(snapshot) {
      idExists = snapshot.child(convID).exists();
      while(idExists) {
        convID += 1;
        idExists = snapshot.child(convID).exists();
      }

      convDB.child(convID).set({title, buyerID, sellerID, listID, convID});

      // Increment the unique conversation ID and move on
      constDB.child("Next_Conversation_ID").set(convID + 1);
    });
    // add conversation id to both users' conversation list
    this.updateList(buyerID, convID, "Conversations");
    this.updateList(sellerID, convID, "Conversations");

    // add listing to buyers interested list
    this.updateList(buyerID, listID, "Interested");
  }

  handleRemoveInterestClick() {
    this.setState({isInterested: false});
    this.setState({confirmed: false});
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
