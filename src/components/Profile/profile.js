import React from 'react'
import Header from '../Header/header'
import { Review } from '../Review/review'
import '../App.css'
import './profile.css'
import ViewProfile from './view_profile'
import fire from '../Fire/fire'


export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentWillReceiveProps(props) {
    const { history } = props;
    this.setState({loaded: false});
    var profileUser = props.location.search.substring(5);

    // Load in profile info and all reviews of the user we're viewing
    fire.database().ref().once("value", snapshot => {

      // Make sure the user exists before checking
      if (profileUser !== "" && snapshot.child("Users/" + profileUser).exists()) {
        let reviews = [];
        let isUser = this.state.user.uid === profileUser;
        let name = snapshot.child("Users/" + profileUser + "/Name").val();
        let rating = snapshot.child("Users/" + profileUser + "/Average_review").val();
        let image = snapshot.child("Users/" + profileUser + "/User_Pic").val();
        let tel = snapshot.child("Users/" + profileUser + "/Phone").val();
        let email = snapshot.child("Users/" + profileUser + "/UCSD_Email").val();
        let zipcode = snapshot.child("Users/" + profileUser + "/Zip").val();
        let city = snapshot.child("Users/" + profileUser + "/City").val();
        let averagereview = snapshot.child("Users/" + profileUser + "/Average_Review").val();
        this.setState({name, rating, image, tel, email, zipcode, city, isUser, averagereview});

        // Load in all reviews
        let reviewList = snapshot.child("Users/" + profileUser + "/Reviews").val().split(",");

        // push each review from reviewList
        var i;
        for (i = 0; i < reviewList.length; i++) {
          if(reviewList[i] !== "") {
            // Make sure the review exists, otherwise remove it
            if(snapshot.child("Review/" + reviewList[i]).exists()) {
              var review = snapshot.child("Review/" + reviewList[i]).val()
              review['Listing_Title'] = snapshot.child("Listing/" + review['Listing_ID'] + "/Listing_Title").val();
              reviews.push(review);
            }
            else {
              reviewList.splice(i, 1);
            }
          }
        }
        // Update the state and set the new updated review list
        reviewList = reviewList.join(",");
        fire.database().ref().child("Users/" + profileUser + "/Reviews").set(reviewList);
        this.setState({reviews, loaded: true});
      }
      else {
        history.push("/home");
        alert("User not found");
      }
    });
  }

  componentDidMount(){
    const { history } = this.props;
    fire.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({user});
        this.setState({loaded: false});
        var profileUser = this.props.location.search.substring(5);

        // Load in profile info and all reviews of the user we're viewing
        fire.database().ref().once("value", snapshot => {

          // Make sure the user exists before checking
          if (profileUser !== "" && snapshot.child("Users/" + profileUser).exists()) {
            let reviews = [];
            let isUser = user.uid === profileUser;
            let name = snapshot.child("Users/" + profileUser + "/Name").val();
            let rating = snapshot.child("Users/" + profileUser + "/Average_review").val();
            let image = snapshot.child("Users/" + profileUser + "/User_Pic").val();
            let tel = snapshot.child("Users/" + profileUser + "/Phone").val();
            let email = snapshot.child("Users/" + profileUser + "/UCSD_Email").val();
            let zipcode = snapshot.child("Users/" + profileUser + "/Zip").val();
            let city = snapshot.child("Users/" + profileUser + "/City").val();
            let averagereview = snapshot.child("Users/" + profileUser + "/Average_Review").val();
            this.setState({name, rating, image, tel, email, zipcode, city, isUser, averagereview});

            // Load in all reviews
            let reviewList = snapshot.child("Users/" + profileUser + "/Reviews").val().split(",");

            // push each review from reviewList
            var i;
            for (i = 0; i < reviewList.length; i++) {
              if(reviewList[i] !== "") {
                var review = snapshot.child("Review/" + reviewList[i]).val()
                review['Listing_Title'] = snapshot.child("Listing/" + review['Listing_ID'] + "/Listing_Title").val();
                reviews.push(review);
              }
            }
            this.setState({reviews, loaded: true});
          }
        });
      }
      // Otherwise set the current user to null
      else {
        this.setState({user: null});
        history.push("/");
      }
    });
  }

  render () {
    var reviews;
    if(this.state.loaded) {
      reviews = this.state.reviews.map(item =>
        <div>
          <Review seller={item['Is_Seller']} transactiondate={item['Transaction_Date']} reviewrating={item['Review_Rating']}
          reviewcontent={item['Review_Content']} reviewheader={item['Review_Title']} reviewtitle={item['Listing_Title']}/>
        </div>
      );
    }
    return (
      <div>
        <Header />
      {this.state.loaded ?
        <div classname="content">
          <ViewProfile name={this.state.name} rating={this.state.rating} image={this.state.image} tel={this.state.tel} email={this.state.email} zipcode={this.state.zipcode} city={this.state.city} isUser={this.state.isUser}
          averagereview={this.state.averagereview}/>
          {reviews}
        </div>
      :
      null}
      </div>
    );
  }
}
