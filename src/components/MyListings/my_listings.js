import React from 'react'
import Header from '../Header/header'
import './my_listings.css'
import { Listing } from '../Listing/listing'
import firebase from 'firebase';
const listingid = [5];
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

const getInterestedListings = listingid.map((id) =>
  <div className="listing">
    <Listing title={listingtitles[id]} image={images[id]} price={listingprice[id]} desc={listingdescriptions[id]} isInterested={true} db={firebase}/>
          </div>
);
export class MyListings extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {page: 'Interested'}
    this.handleInterestedClick = this.handleInterestedClick.bind(this);
    this.handleSavedClick = this.handleSavedClick.bind(this);
    this.handlePostedClick = this.handlePostedClick.bind(this);
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
            {getInterestedListings}
          </div>
        </div>
      </div>
    );
  }
}

export default MyListings
