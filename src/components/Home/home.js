import React from 'react'
import Header from '../Header/header'
import Sidebar from '../Sidebar/sidebar'
import fire from '../Fire/fire'
import './home.css'
import { Listing } from '../Listing/listing'
import LoadingImg from './circle-loading-gif.gif'

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      loaded: false
    };
    this.firebaseRef = fire.database().ref();
    this.firebaseRef.on('value', dataSnapshot => {
      let items = [];
      let interestedlistings = dataSnapshot.child("Users/" + this.state.user.uid + "/Interest_Listings").val().split(",");
      let savedlistings = dataSnapshot.child("Users/" + this.state.user.uid + "/Saved_Listings").val().split(",");
      var nextconversationid = dataSnapshot.child("Constants/Next_Conversation_ID").val()
      dataSnapshot.child("Listing").forEach(childSnapshot => {
        let item = childSnapshot.val();
        item['Next_Conversation_ID'] = nextconversationid;

        console.log(savedlistings, "" + item['Listing_ID'], savedlistings.indexOf("" + item['Listing_ID']));
        // Check if this listing was marked as interested or not
        item['isInterested'] = (interestedlistings.indexOf("" + item['Listing_ID']) !== -1);
        item['isSaved'] = (savedlistings.indexOf("" + item['Listing_ID']) !== -1);
        items.push(item);
      });
      this.setState({items});
      this.setState({loaded:true});
    });




  }

  componentWillUnmount() {
    this.firebaseRef.off();
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

  render() {
    const listings = this.state.items.map(item =>
      <div className="listing" key={item['Listing_ID']}>
        <Listing title={item['Listing_Title']} image={item['Listing_Pic']} price={item['Listing_Price']} desc={item['Listing_Description']} id={item['Listing_ID']} saved={item['Is_Saved']}
                  isMyListing={item['Seller_ID'] === this.state.user.uid} postdate={item['Listing_Post_Date']} sellername={item['Seller_Name']} sellerid={item['Seller_ID']} buyerid={this.state.user.uid}
                  rating={item['Seller_Average_Review']} isInterested={item['isInterested']} isSaved={item['isSaved']} viewer={this.state.user} conversationID={item['Next_Conversation_ID']}/>
      </div>
    );
    return (
      <div>
        <Header />
        <div className="content">
          <div className="content-sidebar">
            <Sidebar />
          </div>
          <div className="content-listings">
            {this.state.loaded ? listings.length ? listings : <div className = "content-text"> The Marketplace currently has no listings. Come back later or add one yourself.</div> : <div className = "loading-circle"><img src= {LoadingImg}></img></div>}
          </div>
        </div>
      </div>
    );
  }
}
