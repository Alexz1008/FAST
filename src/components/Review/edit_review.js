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
          this.setState({listingID: listing_id, loaded: true});
          
          // Somehow check firebase for your old title, rating, and review, and set them in the boxes
          //
          //
          //
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
    
    
    var Review_ID;
    var Is_Seller;
    var Transaction_Date;
    const { history } = this.props;
    fire.database().ref().once('value', snapshot => {
      // Make sure the review ID does not exist yet
      var next_id = snapshot.child("Constants/Next_Review_ID").val();
      var idExists = snapshot.child("Review/" + next_id).exists();
      const Seller_ID = snapshot.child("Listing/" + Listing_ID + "/Seller_ID").val();
      const Buyer_ID = snapshot.child("Listing/" + Listing_ID + "/Buyer_ID").val();
      while(idExists) {
        next_id += 1;
        idExists = snapshot.child("Review/" + next_id).exists();
      }
      Review_ID = next_id;
      fire.database().ref().child("Constants/Next_Review_ID").set(next_id + 1);
      
      // Check if this review is by the seller or buyer
      Is_Seller = !(snapshot.child("Listing/" + Listing_ID + "/Seller_ID").val() === User_ID);
      var Reviewed_User = Is_Seller ? Seller_ID : Buyer_ID;
      Transaction_Date = snapshot.child("Listing/" + Listing_ID + "/Transaction_Date").val();
        
      fire.database().ref().child("Review/" + next_id).set({Review_Title, Review_Rating, Review_Content, Review_ID, Is_Seller, Transaction_Date, Review_Author: User_ID});
      
      // Add to reviewee's review list
      Is_Seller ? addToUserList(Seller_ID, next_id, "Reviews") : addToUserList(Buyer_ID, next_id, "Reviews");
      Is_Seller ? fire.database().ref().child("Listing/" + Listing_ID + "/Seller_Reviewed").set(true) : fire.database().ref().child("Listing/" + Listing_ID + "/Buyer_Reviewed").set(true);
      
      var sumOfReviews = snapshot.child("Users/" + Reviewed_User + "Sum_Of_Reviews").val();
      var totalReviews = snapshot.child("Users/" + Reviewed_User + "Reviews").val().split(",").length;
      fire.database().ref().child("Users/" + Reviewed_User + "/Average_Review").set(sumOfReviews / totalReviews);
    });
      
  }
  
  render() {
    return(
      <div className="center">
        <Header />
        <form className="listing-form" autoComplete="off">
        <div>
        
        {this.state.loaded ?
          <div className="content-box">
            <h3 id="create-review-title" className="basic-title">Write review for Gary Gillespie</h3>
      
            <label htmlFor="review-title"><strong>Title:</strong></label> <br /> 
            <input onChange={this.handleChange} id="review-title" type="text" className="review-input" name="title" required/> <br />

            <label htmlFor="review-rating"><strong>Rating:</strong></label> <br /> 
            <input onChange={this.handleChange} id="review-rating" type="number" min="1" max="5" className="review-input" name="rating" required/> <br /><br />
      
            <label htmlFor="review-content" name="review"><strong>Review:</strong></label> <br /> 
            <textarea onChange={this.handleChange}  name="review" id="review-content" /> <br />
      
      
            <br />
      
            <button onClick={this.submit_review} type="submit" className="basic-button" id="create-review-button"><Link to='/transaction_history'>Post review</Link></button> <br />
          </div>
          :
          null}
        </div>
        </form>
      </div>
    );
  }
}
