import React from 'react'
import Header from '../Header/header'
import Sidebar from '../Sidebar/sidebar'
import './my_listings.css'
import { Listing } from '../Listing/listing'
const listingid = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
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

const getListings = listingid.map((id) =>
  <div className="listing">
    <Listing title={listingtitles[id]} image={images[id]} price={listingprice[id]} desc={listingdescriptions[id]} location={location[id]} />
  </div>
);

const MyListings = () => (
  <div>
    <Header />
    <div className="content">
		<h1>Interested Listings </h1>
      <div className="content-listings">
		<br/>
        {getListings}
      </div>
    </div>
	    <div className="content">
		<h1>Saved Listings </h1>
      <div className="content-listings">
		<br/>
        {getListings}
      </div>
    </div>
	    <div className="content">
		<h1>My Posted Listings </h1>
      <div className="content-listings">
		<br/>
        {getListings}
      </div>
    </div>
  </div>
)

export default MyListings
