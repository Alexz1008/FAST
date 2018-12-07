import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/header'
import fire from '../Fire/fire'
import './review.css'
import {addToUserList} from '../Utilities/utilities'
//by default, using styles from ./login.css

export class EditReview extends React.Component {
  constructor(props) {
    super(props);
    this.submit_review = this.submit_review.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {loaded: false};
  }
  
  componentDidMount(){
    const { history } = this.props;
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user: user});
        var listing_id = this.props.location.search.substring(4);
        fire.database().ref().once('value', snapshot => {
          var transaction_list = snapshot.child("Users/" + user.uid + "/Completed_Transactions").val().split(",");
          
          // Make sure we have access to the review
          if(transaction_list.indexOf(listing_id) === -1) {
            history.push("/transaction_history");
            alert("You cannot write a review for a listing you haven't completed");
          }
          
          // Somehow check firebase for your old title, rating, and review, and set them in the boxes
          var Is_Seller = snapshot.child("Listing/" + listing_id + "/Seller_ID").val() === user.uid;
          let Reviewed_User = Is_Seller ? snapshot.child("Listing/" + listing_id + "/Seller_ID").val() : snapshot.child("Listing/" + listing_id + "/Buyer_ID").val();
      
          let Review_ID = Is_Seller ? snapshot.child("Listing/" + listing_id + "/Seller_Review").val() : snapshot.child("Listing/" + listing_id + "/Buyer_Review").val();
          let oldRating = snapshot.child("Review/" + Review_ID + "/Review_Rating").val();
          var oldSum = snapshot.child("Users/" + Reviewed_User + "Sum_Of_Reviews").val();
          var totalReviews = snapshot.child("Users/" + Reviewed_User + "Reviews").val().split(",").length;
          document.getElementById("review-title").value = snapshot.child("Review/" + Review_ID + "/Review_Title").val();
          document.getElementById("review-rating").value = snapshot.child("Review/" + Review_ID + "/Review_Rating").val();
          document.getElementById("review-content").value = snapshot.child("Review/" + Review_ID + "/Review_Content").val();
          
          this.setState({listingID: listing_id, loaded: true, Is_Seller, Review_ID, oldRating, Reviewed_User});
        });
      }
      else {
        this.setState({user: null});
        history.push("/");
        alert("You must log in!");
      }
    });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }
  
  submit_review() {
    const Review_Title = this.state.title;
    const Review_Rating = this.state.rating;
    const Review_Content = this.state.review;
    const Listing_ID = this.state.listingID;
    const User_ID = this.state.user.uid;
    const Is_Seller = this.state.Is_Seller;
    const Review_ID = this.state.Review_ID;
    const oldRating = this.state.oldRating;
    const oldSum = this.state.oldSum;
    const totalReviews = this.state.totalReviews;
    const Reviewed_User = this.state.Reviewed_User;
    
    // Update the review
    fire.database().ref().child("Review/" + Review_ID).update({Review_Title, Review_Rating, Review_Content});
    
    // Update review score
    let sumOfReviews = oldSum - oldRating + Review_Rating;
    fire.database().ref().child("Users/" + Reviewed_User + "/Average_Review").set(sumOfReviews / totalReviews);
  }
  
  render() {
    return(
      <div className="center">
        <Header />
        <form className="listing-form" autoComplete="off">
        <div>
        {this.state.loaded ?
          <div className="content-box">
            <h3 id="create-review-title" className="basic-title">Edit review</h3>
      
            <label htmlFor="review-title"><strong>Title:</strong></label> <br /> 
            <input onChange={this.handleChange} id="review-title" type="text" className="review-input" name="title" defaultValue="Loading..." required/> <br />

            <label htmlFor="review-rating"><strong>Rating:</strong></label> <br /> 
            <input onChange={this.handleChange} id="review-rating" type="number" min="1" max="5" className="review-input" name="rating" defaultValue="Loading..." required/> <br /><br />
      
            <label htmlFor="review-content" name="review"><strong>Review:</strong></label> <br /> 
            <textarea onChange={this.handleChange} id="review-content" name="review" defaultValue="Loading..." id="review-content" /> <br />
      
      
            <br />
      
            <button onClick={this.submit_review} type="submit" className="basic-button" id="create-review-button"><Link to='/transaction_history'>Save Changes</Link></button> <br />
          </div>
          :
          null}
        </div>
        </form>
      </div>
    );
  }
}
