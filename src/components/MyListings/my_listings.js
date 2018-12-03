import React from 'react'
import Header from '../Header/header'
import './my_listings.css'
import { Listing } from '../Listing/listing'
import firebase from 'firebase';
import fire from '../Fire/fire';

export class MyListings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      page: 'Interested'
    };
  }

  // If the component gets mounted successfully, authenticate the user
  componentDidMount(){
    fire.auth().onAuthStateChanged((user) => {
      // If the user is detected, save it to the current state
      if(user) {
        this.setState({user});
        //localStorage.setItem('user',user.uid);
        this.state = {page: 'Interested', saved: [], interested: [], posted: []};
        this.handleInterestedClick = this.handleInterestedClick.bind(this);
        this.handleSavedClick = this.handleSavedClick.bind(this);
        this.handlePostedClick = this.handlePostedClick.bind(this);

        this.firebaseRef = fire.database().ref();
        this.firebaseRef.on('value', dataSnapshot => {
          let interested = [];
          let saved = [];
          let posted = [];
          let interestedlistings = dataSnapshot.child("Users/" + user.uid + "/Interest_Listings").val().split(",");
          let savedlistings = dataSnapshot.child("Users/" + user.uid + "/Saved_Listings").val().split(",");
          var nextconversationid = dataSnapshot.child("Constants/Next_Conversation_ID").val();
          dataSnapshot.child("Listing").forEach(childSnapshot => {
            let item = childSnapshot.val();
            item['Next_Conversation_ID'] = nextconversationid;
            item['isInterested'] = (interestedlistings.indexOf("" + item['Listing_ID']) !== -1);
            item['isSaved'] = (savedlistings.indexOf("" + item['Listing_ID']) !== -1);
            if(item['isSaved']) {
              saved.push(item);
            }
            if(item['isInterested']) {
              interested.push(item);
            }
            if(item['Seller_ID'] === user.uid) {
              posted.push(item);
            }
          });
          this.setState({saved});
          this.setState({interested});
          this.setState({posted});
          this.setState({loaded: true});
        });
      }
      // Otherwise set the current user to null
      else {
        this.setState({user: null});
        //localStorage.removeItem('user');
      }
    });
  }

  handleInterestedClick() {
    this.setState({page: 'Interested'});
  }

  handleSavedClick() {
    this.setState({page: 'Saved'});
  }

  handlePostedClick() {
    this.setState({page: 'Posted'});
  }

  render () {
    console.log(this.state);
    var listings;
    if (this.state.page === 'Interested' && this.state.loaded === true) {
      listings = this.state.interested.map(item =>
        <div className="listing" key={item['Listing_ID']}>
          <Listing title={item['Listing_Title']} image={item['Listing_Pic']} price={item['Listing_Price']} desc={item['Listing_Description']} id={item['Listing_ID']} saved={item['Is_Saved']}
                  isMyListing={item['Seller_ID'] === this.state.user.uid} postdate={item['Listing_Post_Date']} sellername={item['Seller_Name']} sellerid={item['Seller_ID']} buyerid={this.state.user.uid}
                  rating={item['Seller_Average_Review']} isInterested={item['isInterested']} viewer={this.state.user} conversationID={item['Next_Conversation_ID']}/>
                  </div>
                );
    }
    else if (this.state.page === 'Saved' && this.state.loaded === true) {
      listings = this.state.saved.map(item =>
        <div className="listing" key={item['Listing_ID']}>
          <Listing title={item['Listing_Title']} image={item['Listing_Pic']} price={item['Listing_Price']} desc={item['Listing_Description']} id={item['Listing_ID']} saved={item['Is_Saved']}
                  isMyListing={item['Seller_ID'] === this.state.user.uid} postdate={item['Listing_Post_Date']} sellername={item['Seller_Name']} sellerid={item['Seller_ID']} buyerid={this.state.user.uid}
                  rating={item['Seller_Average_Review']} isInterested={item['isInterested']} viewer={this.state.user} conversationID={item['Next_Conversation_ID']}/>
                  </div>
                );
    }
    else if (this.state.page === 'Posted' && this.state.loaded === true) {
      listings = this.state.posted.map(item =>
        <div className="listing" key={item['Listing_ID']}>
          <Listing title={item['Listing_Title']} image={item['Listing_Pic']} price={item['Listing_Price']} desc={item['Listing_Description']} id={item['Listing_ID']} saved={item['Is_Saved']}
                  isMyListing={item['Seller_ID'] === this.state.user.uid} postdate={item['Listing_Post_Date']} sellername={item['Seller_Name']} sellerid={item['Seller_ID']} buyerid={this.state.user.uid}
                  rating={item['Seller_Average_Review']} isInterested={item['isInterested']} viewer={this.state.user} conversationID={item['Next_Conversation_ID']}/>
                  </div>
                );
    }
    return (
      <div>
        <Header />
        <div className="content">
          <div className="content-sidebar">
            <div className="sidebar">
              <button onClick={this.handleInterestedClick} className={this.state.page === 'Interested' ? 'sidebar-button-active' : 'sidebar-button'}>
                <div className="sidebar-text">Interested Listings</div>
              </button>
              <button onClick={this.handleSavedClick} className={this.state.page === 'Saved' ? 'sidebar-button-active' : 'sidebar-button'}>
                <div className="sidebar-text">Saved Listings</div>
              </button>
              <button onClick={this.handlePostedClick} className={this.state.page === 'Posted' ? 'sidebar-button-active' : 'sidebar-button'}>
                <div className="sidebar-text">My Posted Listings</div>
              </button>
            </div>
          </div>
          <div className="content-listings">
            {listings}
          </div>
        </div>
      </div>
    );
  }
}

export default MyListings
