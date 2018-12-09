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

    this.setTag = this.setTag.bind(this);

    this.state = {
      items: [],
      iclickers: [],
      food: [],
      furniture: [],
      housing: [],
      textbooks: [],
      loaded: false,
      currTag: "",
    };
  }

  componentWillUnmount() {
    if(this.firebaseRef)
      this.firebaseRef.off();
  }

  // If the component gets mounted successfully, authenticate the user
  componentDidMount(){
    const { history } = this.props;
    fire.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({user});
        this.firebaseRef = fire.database().ref();
        this.firebaseRef.on('value', dataSnapshot => {
          // If the constants database does not exist, initialize it
          if(!dataSnapshot.child("Constants").exists()) {
            const Next_Conversation_ID = 1;
            const Next_Listing_ID = 1;
            const Next_Message_ID = 1;
            const Next_Review_ID = 1;
            this.firebaseRef.child("Constants").set({Next_Conversation_ID, Next_Listing_ID, Next_Message_ID, Next_Review_ID});
          }
          let items = [];
          let iclickers = [];
          let food = [];
          let furniture = [];
          let housing = [];
	        let textbooks = [];
          let separator = ",";
          let interestedlistings = dataSnapshot.child("Users/" + user.uid + "/Interest_Listings").val();
          let savedlistings = dataSnapshot.child("Users/" + user.uid + "/Saved_Listings").val();
          // only split when use have interestedlistings/ savedlistings
          if (interestedlistings && interestedlistings.length > 1){
            interestedlistings = interestedlistings.split(",");
          }
          if (savedlistings && savedlistings.length > 1){
            savedlistings = savedlistings.split(",");
          }
          var nextconversationid = dataSnapshot.child("Constants/Next_Conversation_ID").val()
          dataSnapshot.child("Listing").forEach(childSnapshot => {
            // Make sure to only push items that are not transaction logs
            let item = childSnapshot.val();
            if(item['Is_Transaction_Log'] === false) {
              item['Next_Conversation_ID'] = nextconversationid;
              // Update the rating of the listing if the user's rating has changed recently
              if(item['Seller_Average_Review'] !== dataSnapshot.child("Users/" + item['Seller_ID'] + "/Average_Review").val()) {
                item['Seller_Average_Review'] = dataSnapshot.child("Users/" + item['Seller_ID'] + "/Average_Review").val();
                fire.database().ref().child("Listing/" + item['Listing_ID'] + "/Seller_Average_Review").set(item['Seller_Average_Review']);
              }

              // Check if this listing was marked as interested or not
              item['isInterested'] = (interestedlistings) ? (interestedlistings.indexOf("" + item['Listing_ID']) !== -1) : false;
              item['isSaved'] = (savedlistings) ? (savedlistings.indexOf("" + item['Listing_ID']) !== -1) : false;
              items.push(item);

	      // get the tags of this listing
              let tags = item['Listing_Tag'].split(separator);

	      // check whether listing has each tag
	      if(tags.indexOf("i-Clickers") !== -1) {
		iclickers.push(item);
	      }
	      if (tags.indexOf("Food") !== -1) {
		food.push(item);	
	      }
	      if (tags.indexOf("Furniture") !== -1) {
		furniture.push(item);
	      }
	      if (tags.indexOf("Housing") !== -1) {
		housing.push(item);
	      }
	      if (tags.indexOf("Textbooks") !== -1) {
		textbooks.push(item);
	      }
            }
          });
          this.setState({items, iclickers, food, furniture, housing, textbooks, loaded: true});
        });
      }
      // Otherwise set the current user to null
      else {
        this.setState({user: null});
        history.push("/");
        //localStorage.removeItem('user');
      }
    });
  }

  // sets or removes the current tag filter
  setTag(tag) {
    if(tag !== this.state.currTag) {
      this.setState({currTag: tag}, () => {
      });
    } else {
      this.setState({currTag: ""}, () => {
      });
    }
  }

  render() {
    var listings;	  
    var subList;
    var tag = this.state.currTag;

    var search = window.location.search			// get querystring from url
    var searchIndex = search.indexOf("?search=");	// make sure there is search query

    if(searchIndex != -1) {
      search = search.substring(searchIndex + 8);	// get search query
      search = search.split("+");			// replace + with space
      search = search.join(" ");
      search = decodeURIComponent(search);		// decode any special characters
      search = search.toLowerCase();			// convert to lowercase
    } else {
      search = "";
    }


    // get proper sublist of listings
    if (tag === "i-Clickers") {
      subList = this.state.iclickers;
    } else if (tag === "Food") {
      subList = this.state.food;
    } else if (tag === "Furniture") {
      subList = this.state.furniture;
    } else if (tag === "Housing") {
      subList = this.state.housing;
    } else if (tag === "Textbooks") {
      subList = this.state.textbooks;
    } else {
      subList = this.state.items;
    }

    if(this.state.loaded) {
      listings = subList.map(item =>
        (item['Listing_Title'].toLowerCase().includes(search) || item['Listing_Description'].toLowerCase().includes(search)) &&
          <div className="listing" key={item['Listing_ID']}>
            <Listing title={item['Listing_Title']} image={item['Listing_Pic'] ? item['Listing_Pic'][item['Listing_Pic'].length-1] : null} price={item['Listing_Price']} desc={item['Listing_Description']} id={item['Listing_ID']} saved={item['Is_Saved']}
                    isMyListing={item['Seller_ID'] === this.state.user.uid} postdate={item['Listing_Post_Date']} sellername={item['Seller_Name']} sellerid={item['Seller_ID']} buyerid={this.state.user.uid}
                    rating={item['Seller_Average_Review']} isInterested={item['isInterested']} isSaved={item['isSaved']} viewer={this.state.user} conversationID={item['Next_Conversation_ID']}/>
          </div>
      );
    }
    return (
      <div>
        <Header />
        <div className="content">
          <div className="content-sidebar">
          <Sidebar callbackFunction={this.setTag} currTag ={this.state.currTag}/>
          </div>
          <div className="content-listings">
            {this.state.loaded ? listings.length ? listings.reverse() : <div className = "content-text"> The Marketplace currently has no listings, or has no listings for the currently selected tag. Come back later or add one yourself.</div> : <div className="loading-circle"><img src={LoadingImg} alt="Loading..."></img></div>}
          </div>
        </div>
      </div>
    );
  }
}
