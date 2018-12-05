import React from 'react'
import { Link } from 'react-router-dom'
import './listing.css'
import fire from '../Fire/fire'
import { addToUserList, removeFromUserList, removeFromUserInterested } from '../Utilities/utilities'

export class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddClickSaved = this.handleAddClickSaved.bind(this);
    this.handleRemoveClickSaved = this.handleRemoveClickSaved.bind(this);
    this.handleAddInterestClick = this.handleAddInterestClick.bind(this);
    this.handleRemoveInterestClick = this.handleRemoveInterestClick.bind(this);
    this.getListingID = this.getListingID.bind(this);
    this.state = {title: this.props.title, image: this.props.image, price: this.props.price, desc: this.props.desc, id: this.props.id,
                  isInterested: this.props.isInterested, isSaved: this.props.isSaved, confirmed: this.props.confirmed, isMyListing: this.props.isMyListing,
                  isLog: this.props.isLog, reviewed: this.props.reviewed, rating: this.props.rating, postdate: this.props.postdate, sellername: this.props.sellername,
                  sellerid: this.props.sellerid, user: this.props.viewer, conversationID: this.props.conversationID}

    this.userDB = fire.database().ref("Users");
    this.conversationDB = fire.database().ref("Conversation");
    this.constantsDB = fire.database().ref("Constants");
  }

  handleAddClickSaved() {
    this.setState({isSaved: true});
    addToUserList(this.state.user.uid, this.state.id, "Saved_Listings");
  }

  handleRemoveClickSaved() {
    this.setState({isSaved: false});
    removeFromUserList(this.state.user.uid, this.state.id, "Saved_Listings");
  }

  handleAddInterestClick() {
    if (this.state.conversationID) {
      this.setState({isInterested: true});

      const Seller_ID = this.state.sellerid;
      const Buyer_ID = this.state.user.uid;
      const Listing_ID = this.state.id;
      const Conversation_Title = this.state.title;
      const Buyer_Confirm = false;
      const Seller_Confirm = false;
      const Message_List = "";

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

        convDB.child(Conversation_ID).set({Conversation_Title, Buyer_ID, Seller_ID, Listing_ID, Conversation_ID, Buyer_Confirm, Seller_Confirm, Message_List});

        // Increment the unique conversation ID and move on
        constDB.child("Next_Conversation_ID").set(Conversation_ID + 1);
      });
      // add conversation id to both users' conversation list
      addToUserList(Buyer_ID, Conversation_ID, "Conversations");
      addToUserList(Seller_ID, Conversation_ID, "Conversations");

      // add listing to buyers interested list
      addToUserList(Buyer_ID, Listing_ID, "Interest_Listings");
    }
  }

  handleRemoveInterestClick() {
    this.setState({isInterested: false});
    this.setState({confirmed: false});
    removeFromUserInterested(this.state.user.uid, this.state.id, this.state.sellerid);
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
    console.log("delete review");
  }
  getListingID() {
    return this.state.id;
  }
  render() {
    const isInterested = this.state.isInterested;
    const isMyListing= this.state.isMyListing;
    const isLog = this.state.isLog;
    const reviewed = this.state.reviewed;
    return (
	  <div className={isMyListing ? 'listing-container-self' : 'listing-container'}>
      <div className="listing-upper">
        <img className="listing-picture" src={this.state.image} alt="did not load" />
        <div className="listing-title">{this.state.title} </div>
        <div className="listing-poster">Poster: {this.state.sellername}</div>
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
                    <a href={this.state.reviewed ? '/edit_review?id=' + this.getListingID() : 'write_review?id=' + this.getListingID()}>
                    {this.state.reviewed ? 'Edit Review' : 'Write Review'}</a> 
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
                  <button className={this.state.isSaved ? 'listing-button-selected' : 'listing-button-unselected'} id="saveButton" onClick={this.state.isSaved ? this.handleRemoveClickSaved : this.handleAddClickSaved}>
                    {this.state.isSaved ? 'Saved' : 'Save'}
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
