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
    this.handleDeleteListingClick = this.handleDeleteListingClick.bind(this);
    this.handleDeleteReviewClick = this.handleDeleteReviewClick.bind(this);
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
        console.log(idExists);
        while(idExists) {
          Conversation_ID += 1;
          idExists = snapshot.child(Conversation_ID).exists();
        }
        console.log(idExists, Conversation_ID);

        convDB.child(Conversation_ID).set({Conversation_Title, Buyer_ID, Seller_ID, Listing_ID, Conversation_ID, Buyer_Confirm, Seller_Confirm, Message_List});

        // Increment the unique conversation ID and move on
        constDB.child("Next_Conversation_ID").set(Conversation_ID + 1);
        
        // add conversation id to both users' conversation list
        addToUserList(Buyer_ID, Conversation_ID, "Conversations");
        addToUserList(Seller_ID, Conversation_ID, "Conversations");
      });

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
    // Remove the listing from existence
    fire.database().ref().child("Listing/" + this.props.id).remove();
    
    // Delete any related conversations
    fire.database().ref().once('value', snapshot => {
      let convs = snapshot.child("Users/" + this.state.user.uid + "/Conversations").val().split(",");
      var i;
      for(i = 0; i < convs.length; i++) {
        let conv = snapshot.child("Conversation/" + convs[i]).val();
        if(conv && conv['Listing_ID'] === this.props.id) {
          fire.database().ref().child("Conversation/" + convs[i]).remove();
        }
      }
    });
  }
  handleEditListingClick() {
  }
  handleDeleteReviewClick() {
    // Figure out if this review is from the viewpoint of the buyer or seller
    fire.database().ref().once('value', snapshot => {
      let childToRemove = this.state.isMyListing ? "/Buyer_Review_ID" : "/Seller_Review_ID";
      let userToUpdate = this.state.isMyListing ? this.props.buyerid : this.props.sellerid;
      let reviewToRemove = this.state.isMyListing ? "/Buyer_Reviewed" : "/Seller_Reviewed";
      var Review_ID = this.state.isMyListing ? this.props.buyerreviewid : this.props.sellerreviewid; 
      var reviewScore = snapshot.child("Review/" + Review_ID + "/Review_Rating").val();
      
      // Remove the review from existence
      fire.database().ref().child("Review/" + Review_ID).remove();
      
      // Update the listing to show that the buyer/seller no longer has a review
      fire.database().ref().child("Listing/" + this.state.id + childToRemove).remove();
      fire.database().ref().child("Listing/" + this.state.id + reviewToRemove).set(false);
      
      // Update the user's average review score
      let userReviewList = snapshot.child("Users/" + userToUpdate + "/Reviews").val().split(",");
      let userReviewSum = snapshot.child("Users/" + userToUpdate + "/Sum_Of_Reviews").val();
      
      // Remove the review from the user's review list and change the review sum
      userReviewList.splice(userReviewList.indexOf(Review_ID), 1);
      userReviewSum -= reviewScore;
      
      // Update the user's review list and sum
      fire.database().ref().child("Users/" + userToUpdate + "/Sum_Of_Reviews").set(userReviewSum);
      (userReviewList.length === 0) ? fire.database().ref().child("Users/" + userToUpdate + "/Average_Review").set(0) :
      fire.database().ref().child("Users/" + userToUpdate + "/Average_Review").set(userReviewSum / userReviewList.length);
      var userReviewListJoined = userReviewList.join(",");
      fire.database().ref().child("Users/" + userToUpdate + "/Reviews").set(userReviewListJoined);
      
      // Update the listing with new info
      this.setState({reviewed: false, rating: userReviewList.length === 0 ? 0 : userReviewSum / userReviewList.length});
    });
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
        <div className="listing-poster">Seller: <Link to={"/profile?uid=" + this.props.sellerid}>{this.state.sellername}</Link></div>
        <div className="listing-header">
          <div className="listing-header-item">
            Rating: {this.state.rating === 0 ? "N/A" : this.state.rating}
          </div>
          <div className="listing-header-item">
            ${this.state.price}
          </div>
          <div className="listing-header-item">
          {isLog ? <div>Completed: {this.props.transactiondate}</div> : <div>Posted: {this.state.postdate}</div>}
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
                  <Link to={this.state.reviewed ? '/edit_review?id=' + this.getListingID() : 'write_review?id=' + this.getListingID()}>
                    <button className='listing-button-unselected' id="writeReview">
                      {this.state.reviewed ? 'Edit Review' : 'Write Review'}
                    </button></Link>
                {
                  reviewed ?
                  <button className='listing-button-unselected' id="deleteReview" onClick={this.handleDeleteReviewClick}>
                    Delete Review
                  </button>
                  :
                  null}
              </div>
            :
            <div className="listing-regular">
              <div>
                  {isMyListing ?
                    null
                  :
                  <button className={this.state.isSaved ? 'listing-button-selected' : 'listing-button-unselected'} id="saveButton" onClick={this.state.isSaved ? this.handleRemoveClickSaved : this.handleAddClickSaved}>
                    {this.state.isSaved ? 'Saved' : 'Save'}
                  </button>}
              </div>
              <div>
                  {isMyListing ?
                    null
                  :
                  <button className={isInterested ? 'listing-button-selected' : 'listing-button-unselected'} id="interestedListing" onClick={this.state.isInterested ? this.handleRemoveInterestClick : this.handleAddInterestClick}>
                    {isInterested ? 'Interested' : 'Show Interest'}
                  </button>}
              </div>
              <div>
                {isMyListing ?
                  <Link to={'/edit_listing?id=' + this.getListingID()}><button className='listing-button-unselected' id="editListing">
                    Edit
                  </button></Link>
                : null}
              </div>
              <div>
                {isMyListing ?
                  <button className='listing-button-unselected' id="deleteListing" onClick={this.handleDeleteListingClick}>
                    Delete
                  </button>
                : null}
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
