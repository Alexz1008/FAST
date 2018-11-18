import React from 'react'
import Header from '../Header/header'
import './transaction_history.css'

import { Listing } from '../Listing/listing'
const listingid = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const titles = ["Buy this Banana", "Buy this house", "empty"];
const images = ['https://i5.walmartimages.ca/images/Large/580/6_r/875806_R.jpg',
                'https://pmcvariety.files.wordpress.com/2018/07/bradybunchhouse_sc11.jpg?w=1000&h=563&crop=1'];
const prices = [50, 1200, 20, 30, 40, 50, 40, 854, 234]
const descs = ["this banana is so cheap you'd have to be stupid not to buy it",
"unbelievably expensive single in the living room for $1200 a month",
"empty"];

var review = false;
const getListings = listingid.map((id) =>
  <div className="listing">
    <Listing title={titles[id]} image={images[id]} price={prices[id]} desc={descs[id]} />
    <div className="transaction_history-button">
      <button id="modifyReview" onClick={review = true}> 
        {review ? 'Write Review' : 'Edit Review'} 
      </button> 
    </div>
  </div>
);

const Profile = () => (
  <div>
    <Header />
    <div className="content">
      {getListings}
    </div>
  </div> 
);
export default Profile
