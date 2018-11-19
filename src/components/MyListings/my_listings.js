import React from 'react'
import Header from '../Header/header'
import './my_listings.css'
import { Listing } from '../Listing/listing'
const listingid = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const listingInterestedBool = [true, false, true, true, true, false, true, false, false, true];
const listingSavedBool = [true, false, true, false, false, false, true, false, false];
const listingMyBool = [true, true, true, true, true, true, true, true, true, true, true];
const listingtitles = ["Buy this Banana", "Buy this house", "empty"];
const images = ['https://i5.walmartimages.ca/images/Large/580/6_r/875806_R.jpg',
                'https://pmcvariety.files.wordpress.com/2018/07/bradybunchhouse_sc11.jpg?w=1000&h=563&crop=1', 'https://i5.walmartimages.ca/images/Large/580/6_r/875806_R.jpg',
                'https://pmcvariety.files.wordpress.com/2018/07/bradybunchhouse_sc11.jpg?w=1000&h=563&crop=1','https://i5.walmartimages.ca/images/Large/580/6_r/875806_R.jpg',
                'https://pmcvariety.files.wordpress.com/2018/07/bradybunchhouse_sc11.jpg?w=1000&h=563&crop=1','https://i5.walmartimages.ca/images/Large/580/6_r/875806_R.jpg',
                'https://pmcvariety.files.wordpress.com/2018/07/bradybunchhouse_sc11.jpg?w=1000&h=563&crop=1','https://i5.walmartimages.ca/images/Large/580/6_r/875806_R.jpg',
                'https://pmcvariety.files.wordpress.com/2018/07/bradybunchhouse_sc11.jpg?w=1000&h=563&crop=1','https://i5.walmartimages.ca/images/Large/580/6_r/875806_R.jpg',
                'https://pmcvariety.files.wordpress.com/2018/07/bradybunchhouse_sc11.jpg?w=1000&h=563&crop=1','https://i5.walmartimages.ca/images/Large/580/6_r/875806_R.jpg',
                'https://pmcvariety.files.wordpress.com/2018/07/bradybunchhouse_sc11.jpg?w=1000&h=563&crop=1','https://i5.walmartimages.ca/images/Large/580/6_r/875806_R.jpg',
                'https://pmcvariety.files.wordpress.com/2018/07/bradybunchhouse_sc11.jpg?w=1000&h=563&crop=1','https://i5.walmartimages.ca/images/Large/580/6_r/875806_R.jpg',
                'https://pmcvariety.files.wordpress.com/2018/07/bradybunchhouse_sc11.jpg?w=1000&h=563&crop=1','https://i5.walmartimages.ca/images/Large/580/6_r/875806_R.jpg',
                'https://pmcvariety.files.wordpress.com/2018/07/bradybunchhouse_sc11.jpg?w=1000&h=563&crop=1','https://i5.walmartimages.ca/images/Large/580/6_r/875806_R.jpg',
                'https://pmcvariety.files.wordpress.com/2018/07/bradybunchhouse_sc11.jpg?w=1000&h=563&crop=1'];
const listingprice = [50, 1200, 20, 30, 40, 50, 40, 854, 234]
const location = ["La Jolla", "Del Mar", "Minnesota"];
const listingdescriptions = ["this banana is so cheap you'd have to be stupid not to buy it",
"unbelievably expensive single in the living room for $1200 a month","this banana is so cheap you'd have to be stupid not to buy it",
"unbelievably expensive single in the living room for $1200 a month","this banana is so cheap you'd have to be stupid not to buy it",
"unbelievably expensive single in the living room for $1200 a month","this banana is so cheap you'd have to be stupid not to buy it",
"unbelievably expensive single in the living room for $1200 a month","this banana is so cheap you'd have to be stupid not to buy it",
"unbelievably expensive single in the living room for $1200 a month",
"empty"];

const getInterestedListings = listingid.map((id) =>
  <div className="listing">
      <Listing title={listingtitles[id]} image={images[id]} price={listingprice[id]} desc={listingdescriptions[id]} location={location[id]} isInterested= {true}/>
  </div>
);
const getSavedListings = listingid.map((id) =>
  <div className="listing">
    <Listing title={listingtitles[id]} image={images[id]} price={listingprice[id]} desc={listingdescriptions[id]} location={location[id]} saved={true} />
  </div>
);
const getMyListings = listingid.map((id) =>
  <div className="listing">
    <Listing title={listingtitles[id]} image={images[id]} price={listingprice[id]} desc={listingdescriptions[id]} location={location[id]} isMyListing={true}/>
          </div>
);

const MyListings = () => (
  <div>
    <Header />
    <div className="content">
      <div className="content-sidebar">
        <div className="sidebar">
          <button onclick= "changeDisplay(2)" className="sidebar-button">
            <div className="sidebar-text">Interested Listings</div>
            
          </button> 
          <button onclick="changeDisplay(getSavedListings)" className="sidebar-button">
            <div className="sidebar-text">Saved Listings</div>
          </button>
          <button onclick="changeDisplay(getMyListings)" className="sidebar-button">
            <div className="sidebar-text">My Posted Listings</div>
          </button>
        </div>
      </div>
      <div className="content-listings">
        
        {getInterestedListings}
        {getSavedListings}
        {getMyListings}
      </div>
    </div>
  </div>
)

export default MyListings
