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
    const { history } = this.props;
    fire.auth().onAuthStateChanged((user) => {
      // If the user is detected, save it to the current state
      if(user) {
        this.setState({user, loaded: false});
        this.firebaseRef = fire.database().ref();
        this.firebaseRef.on('value', dataSnapshot => {
          let items = [];
          let completedTransactions = dataSnapshot.child("Users/" + this.state.user.uid + "/Completed_Transactions").val().split(",");
          var i;
          for (i = 0; i < completedTransactions.length; i++) {
            if(completedTransactions[i] !== "") {
              let item = dataSnapshot.child("Listing/" + completedTransactions[i]).val()
              if(item['Seller_Average_Review'] !== dataSnapshot.child("Users/" + item['Seller_ID'] + "/Average_Review").val()) {
                item['Seller_Average_Review'] = dataSnapshot.child("Users/" + item['Seller_ID'] + "/Average_Review").val();
                fire.database().ref().child("Listing/" + item['Listing_ID'] + "/Seller_Average_Review").set(item['Seller_Average_Review']);
              }
              let User_Is_Seller = dataSnapshot.child("Listing/" + completedTransactions[i] + "/Seller_ID").val() === user.uid;
              User_Is_Seller ? item['reviewed'] = dataSnapshot.child("Listing/" + completedTransactions[i] + "/Buyer_Reviewed").val() :
                              item['reviewed'] = dataSnapshot.child("Listing/" + completedTransactions[i] + "/Seller_Reviewed").val();
              items.push(item);
            }
          }
          this.setState({items, loaded: true});
        });
      }
      // Otherwise set the current user to null
      else {
        this.firebaseRef = fire.database().ref();
        this.setState({user: null});
        history.push("/");
      }
    });
  }
  
  render () {
    if(this.state.loaded) {
      var listings = this.state.items.map(item =>
        <div className="listing" key={item['Listing_ID']}>
          <Listing id={item['Listing_ID']} title={item['Listing_Title']} image={item['Listing_Pic'] ? item['Listing_Pic'][item['Listing_Pic'].length-1] : null} price={item['Listing_Price']} desc={item['Listing_Description']} isLog={true}
          reviewed={item['reviewed']} sellername={item['Seller_Name']} sellerid={item['Seller_ID']} rating={item['Seller_Average_Review']} transactiondate={item['Transaction_Date']} buyerreviewid={item['Buyer_Review_ID']} sellerreviewid={item['Seller_Review_ID']}
          buyerid={item['Buyer_ID']} isMyListing={item['Seller_ID'] === this.state.user.uid}/>
        </div>);
    }
    return (
      <div>
        <Header />
        <div className="content">
          {this.state.loaded ? listings.length ? listings.reverse() : <div className = "content-text"> You have no completed transactions.</div> : <div className = "history-loading"><center><img src={LoadingImg} alt="Loading..."></img></center></div>}
        </div>
      </div>
    );
  }
}
