import React from 'react'
import Header from '../Header/header'
import Sidebar from '../Sidebar/sidebar'
import fire from '../Fire/fire'
import './home.css'
import { Listing } from '../Listing/listing'
import { checkInterest } from '../Utilities/utilities'

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };

    this.firebaseRef = fire.database().ref("Listing");
    this.firebaseRef.on('value', dataSnapshot => {
      let items = [];
      dataSnapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        items.push(item);
      });
      this.setState({items});
    });
    
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }

  // If the component gets mounted successfully, authenticate the user
  componentDidMount(){
    this.authListener();
  }

  // Create a method to authenticate the user with our existing database
  authListener() {
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
                  rating={item['Seller_Average_Review']} isInterested={checkInterest(this.state.user.uid, item['Listing_ID'])} />
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
            {listings.length ? listings : <div className = "content-text"> The Marketplace currently has no listings. Come back later or add one yourself.</div>}
          </div>
        </div>
      </div>
    );
  }
}
