import React from 'react'
import Header from '../Header/header'
import './my_listings.css'
import { Listing } from '../Listing/listing'
import fire from '../Fire/fire';

export class MyListings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      page: 'Interested'
    };
    this.handleInterestedClick = this.handleInterestedClick.bind(this);
    this.handleSavedClick = this.handleSavedClick.bind(this);
    this.handlePostedClick = this.handlePostedClick.bind(this);
  }

  // If the component gets mounted successfully, authenticate the user
  componentDidMount(){
    const { history } = this.props;
    fire.auth().onAuthStateChanged((user) => {
      // If the user is detected, save it to the current state
      if(user) {
        this.setState({user, page: 'Interested', saved: [], interested: [], posted: []});

        this.firebaseRef = fire.database().ref();
        this.firebaseRef.on('value', dataSnapshot => {
          let interested = [];
          let saved = [];
          let posted = [];
          let interestedlistings = dataSnapshot.child("Users/" + user.uid + "/Interest_Listings").val();
          let savedlistings = dataSnapshot.child("Users/" + user.uid + "/Saved_Listings").val();
          let postedlistings = dataSnapshot.child("Users/" + user.uid + "/Posted_Listings").val();


          var nextconversationid = dataSnapshot.child("Constants/Next_Conversation_ID").val();
          if (interestedlistings){
            interestedlistings = interestedlistings.split(",");

            // Add all interested items to interested listings
            var i;
            for (i = 0; i < interestedlistings.length; i++) {
              if(interestedlistings[i] !== '' && dataSnapshot.child("Listing/" + interestedlistings[i]).exists()) {
                let item = dataSnapshot.child("Listing/" + interestedlistings[i]).val();
                if(item['Is_Transaction_Log'] === false) {
                  if(item['Seller_Average_Review'] !== dataSnapshot.child("Users/" + item['Seller_ID'] + "/Average_Review").val()) {
                    item['Seller_Average_Review'] = dataSnapshot.child("Users/" + item['Seller_ID'] + "/Average_Review").val();
                    fire.database().ref().child("Listing/" + item['Listing_ID'] + "/Seller_Average_Review").set(item['Seller_Average_Review']);
                  }
                  item['Next_Conversation_ID'] = nextconversationid;
                  item['isInterested'] = (interestedlistings) ? (interestedlistings.indexOf("" + item['Listing_ID']) !== -1) : false;
                  item['isSaved'] = (savedlistings) ? (savedlistings.indexOf("" + item['Listing_ID']) !== -1) : false;
                  interested.push(item);
                }
              }
              else {
                interestedlistings.splice(i, 1);
              }
            }
            interestedlistings = interestedlistings.join(",");
          }
          if (savedlistings){
            savedlistings = savedlistings.split(",");
            // Add all saved items to saved listings
            var j;
            for (j = 0; j < savedlistings.length; j++) {
              if(savedlistings[j] !== '' && dataSnapshot.child("Listing/" + savedlistings[j]).exists()) {
                let item = dataSnapshot.child("Listing/" + savedlistings[j]).val();
                if(item['Is_Transaction_Log'] === false) {
                  if(item['Seller_Average_Review'] !== dataSnapshot.child("Users/" + item['Seller_ID'] + "/Average_Review").val()) {
                    item['Seller_Average_Review'] = dataSnapshot.child("Users/" + item['Seller_ID'] + "/Average_Review").val();
                    fire.database().ref().child("Listing/" + item['Listing_ID'] + "/Seller_Average_Review").set(item['Seller_Average_Review']);
                  }
                  item['Next_Conversation_ID'] = nextconversationid;
                  item['isInterested'] = (interestedlistings) ? (interestedlistings.indexOf("" + item['Listing_ID']) !== -1) : false;
                  item['isSaved'] = (savedlistings) ? (savedlistings.indexOf("" + item['Listing_ID']) !== -1) : false;
                  saved.push(item);
                }
              }
              else {
                savedlistings.splice(i, 1);
              }
            }
            savedlistings = savedlistings.join(",");
          }

          // Add all posted items to posted listings
          if (postedlistings){
            postedlistings = postedlistings.split(",");
            var k;
            for (k = 0; k < postedlistings.length; k++) {
              if(postedlistings[k] !== '' && dataSnapshot.child("Listing/" + postedlistings[k]).exists()) {
                let item = dataSnapshot.child("Listing/" + postedlistings[k]).val();
                if(item['Is_Transaction_Log'] === false) {
                  if(item['Seller_Average_Review'] !== dataSnapshot.child("Users/" + item['Seller_ID'] + "/Average_Review").val()) {
                    item['Seller_Average_Review'] = dataSnapshot.child("Users/" + item['Seller_ID'] + "/Average_Review").val();
                    fire.database().ref().child("Listing/" + item['Listing_ID'] + "/Seller_Average_Review").set(item['Seller_Average_Review']);
                  }
                  item['Next_Conversation_ID'] = nextconversationid;
                  posted.push(item);
                }
              }
              else {
                postedlistings.splice(i, 1);
              }
            }
            postedlistings = postedlistings.join(",");
          }
          // Push the newly cleaned arrays back to DB (no longer contain nonexistent listings)
          fire.database().ref().child("Users/" + user.uid + "/Interest_Listings").set(interestedlistings);
          fire.database().ref().child("Users/" + user.uid + "/Saved_Listings").set(savedlistings);
          fire.database().ref().child("Users/" + user.uid + "/Posted_Listings").set(postedlistings);

          // Load in all the listings at the end
          this.setState({saved, interested, posted, loaded: true});
        });
      }
      // Otherwise set the current user to null
      else {
        this.setState({user: null});
        history.push("/");
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
    var listings;
    const display = <div className="display-info">You have no {this.state.page} Listings.</div>;
    if (this.state.page === 'Interested' && this.state.loaded === true) {
      listings = this.state.interested.map(item =>
        <div className="listing" key={item['Listing_ID']}>
          <Listing title={item['Listing_Title']} image={item['Listing_Pic']} price={item['Listing_Price']} desc={item['Listing_Description']} id={item['Listing_ID']} saved={item['Is_Saved']}
                  isMyListing={item['Seller_ID'] === this.state.user.uid} postdate={item['Listing_Post_Date']} sellername={item['Seller_Name']} sellerid={item['Seller_ID']} buyerid={this.state.user.uid}
                  rating={item['Seller_Average_Review']} isInterested={item['isInterested']} isSaved={item['isSaved']} viewer={this.state.user} conversationID={item['Next_Conversation_ID']}/>
                  </div>
                );
    }
    else if (this.state.page === 'Saved' && this.state.loaded === true) {
      listings = this.state.saved.map(item =>
        <div className="listing" key={item['Listing_ID']}>
          <Listing title={item['Listing_Title']} image={item['Listing_Pic']} price={item['Listing_Price']} desc={item['Listing_Description']} id={item['Listing_ID']} saved={item['Is_Saved']}
                  isMyListing={item['Seller_ID'] === this.state.user.uid} postdate={item['Listing_Post_Date']} sellername={item['Seller_Name']} sellerid={item['Seller_ID']} buyerid={this.state.user.uid}
                  rating={item['Seller_Average_Review']} isInterested={item['isInterested']} isSaved={item['isSaved']} viewer={this.state.user} conversationID={item['Next_Conversation_ID']}/>
                  </div>
                );
    }
    else if (this.state.page === 'Posted' && this.state.loaded === true) {
      listings = this.state.posted.map(item =>
        <div className="listing" key={item['Listing_ID']}>
          <Listing title={item['Listing_Title']} image={item['Listing_Pic'] ? item['Listing_Pic'][item['Listing_Pic'].length-1] : null} price={item['Listing_Price']} desc={item['Listing_Description']} id={item['Listing_ID']} saved={item['Is_Saved']}
                  isMyListing={item['Seller_ID'] === this.state.user.uid} postdate={item['Listing_Post_Date']} sellername={item['Seller_Name']} sellerid={item['Seller_ID']} buyerid={this.state.user.uid}
                  rating={item['Seller_Average_Review']} isInterested={item['isInterested']} isSaved={item['isSaved']} viewer={this.state.user} conversationID={item['Next_Conversation_ID']}/>
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
            {listings && listings.length ? listings.reverse() : display}
          </div>
        </div>
      </div>
    );
  }
}

export default MyListings
