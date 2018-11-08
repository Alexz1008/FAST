import React from 'react'
import Header from '../Header/header'
import Sidebar from '../Sidebar/sidebar'
import './home.css'

var i;
var listings = [];
const numbers = [1, 2, 3, 4, 5];

const getListings = numbers.map((number) =>
  <div className="listings">{number}</div>
);

const Home = () => (
  <div>
    <Header />
    <div className="content">
      <Sidebar />
      {getListings}
    </div>
  </div>
)

export default Home
