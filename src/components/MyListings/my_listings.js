import React from 'react'
import Header from '../Header/header'
import './my_listings.css'
import { Listing } from '../Listing/listing'
import firebase from 'firebase';
import fire from '../Fire/fire';
import { checkInterest } from '../Utilities/utilities'

const listingid = [4];
const listingtitles = ["Singular Banana", "Single in La Jolla Palms", "iClicker", "AP CS Textbook", "Physics Textbook", "Couch"];
const images = ['https://i5.walmartimages.ca/images/Large/580/6_r/875806_R.jpg',
                'https://cdn.discordapp.com/attachments/431923743028412427/513601584748560384/image0.jpg',
'https://uwaterloo.ca/centre-for-teaching-excellence/sites/ca.centre-for-teaching-excellence/files/styles/sidebar-220px-wide/public/iclicker.png?itok=J1P1LRte',
'https://www.pearsonhighered.com/assets/bigcovers/0/1/3/1/0131374699.jpg',
'http://cuhsphysics.weebly.com/uploads/3/8/9/5/38955313/1484413_orig.png',
'https://target.scene7.com/is/image/Target/GUEST_3954d54d-41c2-4b87-8929-d60d47a574e6'];
const listingprice = [50, 1200, 20, 30, 40, 50, 40, 854, 234]
const listingdescriptions = ["Cheap singular banana, I wanted to eat it but now I don't so it's yours if you want it.",
"Single for Spring Quarter, utilities included, you get your own bathroom. Monthly rent is $1200.",
"Don't need it anymore, graduating.",
"Good condition, but has highlighting in it. About 20% cheaper than market price.",
"I regret choosing physics as my major because now I cannot be in Gary's CSE 110 class.",
"Comfy couch that I don't need anymore. Barely any wear and tear, looks just like new."];

export class MyListings extends React.Component {

  constructor(props) {
    super(props);

    this.state = {page: 'Interested', listing_ids: [], saved: [], interested: [], posted: []};
    this.handleInterestedClick = this.handleInterestedClick.bind(this);
    this.handleSavedClick = this.handleSavedClick.bind(this);
    this.handlePostedClick = this.handlePostedClick.bind(this);
    this.getListings = this.getListings.bind(this);

    this.firebaseRef = fire.database().ref();
    this.firebaseRef.on('value', dataSnapshot => {
      let interested = [];
      let saved = [];
      let posted = [];
      var nextconversationid = dataSnapshot.child("Constants/Next_Conversation_ID").val();
      dataSnapshot.child("Listing").forEach(childSnapshot => {
        let item = childSnapshot.val();
        item['Next_Conversation_ID'] = nextconversationid;
        if(item['Is_Saved']) {
          saved.push(item);
        }
        else if(checkInterest(this.state.user.uid, item['Listing_ID'])) {
          interested.push(item);
        }
        else if(item['Seller_ID'] === this.state.user.uid) {
          posted.push(item);
        }
      });
      this.setState({saved});
      this.setState({interested});
      this.setState({posted});
    });
  }

  // If the component gets mounted successfully, authenticate the user
  componentDidMount(){
    fire.auth().onAuthStateChanged((user) => {
      // If the user is detected, save it to the current state
      if(user) {
        this.setState({user});
        //localStorage.setItem('user',user.uid);
      }
      // Otherwise set the current user to null
      else {
        this.setState({user: null});
        //localStorage.removeItem('user');
      }
    });
  }

  getListings() {
    const currPage = this.state.page;
    const userID = this.state.user.uid;
    var target_ids;

    this.firebaseRef.on("value", dataSnapshot => {
      if (currPage === 'Interested') {
        target_ids = dataSnapshot.child("Users/" + userID + "/Interest_Listings").val();
        console.log(target_ids);
      }
      else if (currPage === 'Saved') {
        target_ids = dataSnapshot.child("Users/" + userID + "/Saved_Listings").val();
      }
      else {
        target_ids = dataSnapshot.child("Users/" + userID + "/Posted_Listings").val();
      }
      this.setState({listing_ids: target_ids.split(',')});
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
    if (this.state.page === 'Interested') {
      listings = this.state.interested.map(item =>
        <div className="listing" key={item['Listing_ID']}>
          <Listing title={item['Listing_Title']} image={item['Listing_Pic']} price={item['Listing_Price']} desc={item['Listing_Description']} id={item['Listing_ID']} saved={item['Is_Saved']}
                  isMyListing={item['Seller_ID'] === this.state.user.uid} postdate={item['Listing_Post_Date']} sellername={item['Seller_Name']} sellerid={item['Seller_ID']} buyerid={this.state.user.uid}
                  rating={item['Seller_Average_Review']} isInterested={checkInterest(this.state.user.uid, item['Listing_ID'])} viewer={this.state.user} conversationID={item['Next_Conversation_ID']}/>
                  </div>
                );
    }
    else if (this.state.page === 'Saved') {
      listings = this.state.saved.map(item =>
        <div className="listing" key={item['Listing_ID']}>
          <Listing title={item['Listing_Title']} image={item['Listing_Pic']} price={item['Listing_Price']} desc={item['Listing_Description']} id={item['Listing_ID']} saved={item['Is_Saved']}
                  isMyListing={item['Seller_ID'] === this.state.user.uid} postdate={item['Listing_Post_Date']} sellername={item['Seller_Name']} sellerid={item['Seller_ID']} buyerid={this.state.user.uid}
                  rating={item['Seller_Average_Review']} isInterested={checkInterest(this.state.user.uid, item['Listing_ID'])} viewer={this.state.user} conversationID={item['Next_Conversation_ID']}/>
                  </div>
                );
    }
    else if (this.state.page === 'Posted') {
      listings = this.state.posted.map(item =>
        <div className="listing" key={item['Listing_ID']}>
          <Listing title={item['Listing_Title']} image={item['Listing_Pic']} price={item['Listing_Price']} desc={item['Listing_Description']} id={item['Listing_ID']} saved={item['Is_Saved']}
                  isMyListing={item['Seller_ID'] === this.state.user.uid} postdate={item['Listing_Post_Date']} sellername={item['Seller_Name']} sellerid={item['Seller_ID']} buyerid={this.state.user.uid}
                  rating={item['Seller_Average_Review']} isInterested={checkInterest(this.state.user.uid, item['Listing_ID'])} viewer={this.state.user} conversationID={item['Next_Conversation_ID']}/>
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
