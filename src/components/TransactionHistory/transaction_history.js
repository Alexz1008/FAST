import React from 'react'
import Header from '../Header/header'
import './transaction_history.css'
import fire from '../Fire/fire';
import { Listing } from '../Listing/listing'
import LoadingImg from './circle-loading-gif.gif'

export class TransactionHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      loaded: false
    };
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
        this.firebaseRef = fire.database().ref();
        this.firebaseRef.on('value', dataSnapshot => {
          let items = [];
          let completedTransactions = dataSnapshot.child("Users/" + this.state.user.uid + "/Completed_Transactions").val().split(",");
          var i;
          for (i = 0; i < completedTransactions.length; i++) {
            if(completedTransactions[i] !== "") {
              let item = dataSnapshot.child("Listing/" + completedTransactions[i]).val()
              let User_Is_Seller = dataSnapshot.child("Listing/" + completedTransactions[i] + "/Seller_ID").val() === user.uid;
              User_Is_Seller ? item['reviewed'] = dataSnapshot.child("Listing/" + completedTransactions[i] + "/Buyer_Reviewed").val() :
                              item['reviewed'] = dataSnapshot.child("Listing/" + completedTransactions[i] + "/Seller_Reviewed").val();
              items.push(item);
            }
          }
          this.setState({items});
          this.setState({loaded:true});
        });
      }
      // Otherwise set the current user to null
      else {
        this.setState({user: null});
      }
    });
  }
  
  render () {
    const listings = this.state.items.map(item =>
      <div className="listing" key={item['Listing_ID']}>
        <Listing id={item['Listing_ID']} title={item['Listing_Title']} image={item['Listing_Pic']} price={item['Listing_Price']} desc={item['Listing_Description']} isLog={true}
        reviewed={item['reviewed']}/>
      </div>
    );
    return (
      <div>
        <Header />
        <div className="content">
          {this.state.loaded ? listings.length ? listings : <div className = "content-text"> You have no completed transactions.</div> : <div className = "history-loading"><center><img src={LoadingImg} alt="Loading..."></img></center></div>}
        </div>
      </div>
    )
  }
}
