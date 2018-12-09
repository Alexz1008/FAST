import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/header'
import fire from '../Fire/fire'
import './review.css'
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
          console.log("Loaded");
          
          // Make sure we have access to the review
          if(transaction_list.indexOf(listing_id) === -1) {
            history.push("/transaction_history");
            alert("You cannot write a review for a listing you haven't completed");
          }
          
          // Somehow check firebase for your old title, rating, and review, and set them in the boxes
          var Is_Seller = snapshot.child("Listing/" + listing_id + "/Seller_ID").val() === user.uid;
          let Reviewed_User = Is_Seller ? snapshot.child("Listing/" + listing_id + "/Buyer_ID").val() : snapshot.child("Listing/" + listing_id + "/Seller_ID").val();
          let Review_ID = Is_Seller ? snapshot.child("Listing/" + listing_id + "/Buyer_Review_ID").val() : snapshot.child("Listing/" + listing_id + "/Seller_Review_ID").val();
          
          let oldRating = snapshot.child("Review/" + Review_ID + "/Review_Rating").val();
          var oldSum = snapshot.child("Users/" + Reviewed_User + "/Sum_Of_Reviews").val();
          var totalReviews = snapshot.child("Users/" + Reviewed_User + "/Reviews").val().split(",").length;
          
          var title = snapshot.child("Review/" + Review_ID + "/Review_Title").val();
          var rating = snapshot.child("Review/" + Review_ID + "/Review_Rating").val();
          var review = snapshot.child("Review/" + Review_ID + "/Review_Content").val();
          this.setState({listingID: listing_id, loaded: true, Is_Seller, Review_ID, oldSum, oldRating, Reviewed_User, title, rating, review, totalReviews}, () => {
          	document.getElementById("review-title").value = title;
          	document.getElementById("review-rating").value = rating;
          	document.getElementById("review-content").value = review;
	  });
        });
      }
      else {
        this.setState({user: null});
        history.push("/");
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
    const Review_ID = this.state.Review_ID;
    const oldRating = this.state.oldRating;
    const oldSum = this.state.oldSum;
    const totalReviews = this.state.totalReviews;
    const Reviewed_User = this.state.Reviewed_User;
    
    if(Review_Rating < 1 || Review_Rating > 5){
      alert("Rating must be between 1 and 5.");
      return;
    }
    
    // Update the review
    fire.database().ref().child("Review/" + Review_ID).update({Review_Title, Review_Rating, Review_Content});
    
    // Update review score
    console.log(oldSum, oldRating, Review_Rating);
    let sumOfReviews = oldSum - parseInt(oldRating) + parseInt(Review_Rating);
    (totalReviews === 0) ? fire.database().ref().child("Users/" + Reviewed_User + "/Average_Review").set(0) :
    fire.database().ref().child("Users/" + Reviewed_User + "/Average_Review").set(sumOfReviews / totalReviews);
    fire.database().ref().child("Users/" + Reviewed_User + "/Sum_Of_Reviews").set(sumOfReviews);
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
      
            <input onChange={this.handleChange} id="review-title" type="text" className="review-input" name="title" defaultValue="Loading..." required/> <br />

            <input onChange={this.handleChange} id="review-rating" type="number" min="1" max="5" className="review-input" maxlength="1" name="rating" defaultValue="Loading..." required/> <br /><br />
      
            <textarea onChange={this.handleChange} id="review-content" name="review" maxlength="200" defaultValue="Loading..." /> <br />
      
      
            <br />
            <Link to="/home"><button onClick={this.submit_review} className="basic-button" id="create-review-button">Save Changes</button></Link> <br />
      
          </div>
          :
          null}
        </div>
        </form>
      </div>
    );
  }
}
