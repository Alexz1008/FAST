import React from 'react'
import Header from '../Header/header'
import './create_listing.css'
import ImageUploader from 'react-images-upload';
import Tag from '../Listing/tag'
import fire from '../Fire/fire'
//by default, also using styles from ./login.css

export class CreateListing extends React.Component{
  constructor(props) {
    super(props);
    this.createListing = this.createListing.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.tagCallback = this.tagCallback.bind(this);
    this.onDrop = this.onDrop.bind(this);

    // Setup the firebase ref for the constants DB and listings DB
    this.constantsDB = fire.database().ref("Constants");
    this.listingsDB = fire.database().ref("Listing");
    this.usersDB = fire.database().ref("Users");

    // Load in the next unique listing DB number, or create one if it doesn't exist yet
    this.constantsDB.on('value', dataSnapshot => {
      if(dataSnapshot.child("Next_Listing_ID").exists()) {
        let nextID = dataSnapshot.child("Next_Listing_ID").val();
        this.setState({id: nextID});
      }
      else {
        this.constantsDB.child("Next_Listing_ID").set(1);
        this.setState({id: 1});
      }
    });
    this.state = {
      image: []
    };
    console.log("Constructed, " + this.state.id);
  }

  // If the component gets mounted successfully, authenticate the user
  componentDidMount(){
    this.authListener();
  }

  // Create a method to authenticate the user with our existing database
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
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

  createListing(e) {
    const Listing_Title = this.state.title;
    const Listing_Pic = this.state.image;
    const Listing_Price = this.state.price;
    const Listing_Description = this.state.desc;
    const Listing_Post_Date = this.getPostDate();
    const Seller_ID = this.state.user.uid;

    var Seller_Name;
    var Seller_Average_Review;
    var Listing_ID = this.state.id;
    var idExists = true;
    let listDB = this.listingsDB;
    let constDB = this.constantsDB;
    e.preventDefault();
    
    // Get the username and average rating of said user
    this.usersDB.once("value").then(function(snapshot) {
      Seller_Name = snapshot.child(Seller_ID + "/Name").val();
      Seller_Average_Review = snapshot.child(Seller_ID + "/Average_Review").val();
    });

    // Save the new listing to the database after making sure the id doesn't exist yet
    this.listingsDB.once("value").then(function(snapshot) {
      idExists = snapshot.child(Listing_ID).exists();
      while(idExists) {
        Listing_ID += 1;
        idExists = snapshot.child(Listing_ID).exists();
      }
      console.log("Test here:", {Listing_Title, Listing_Pic, Listing_Price, Listing_Description, Listing_Post_Date, Listing_ID, Seller_ID,
                                    Seller_Name, Seller_Average_Review});
      listDB.child(Listing_ID).set({Listing_Title, Listing_Pic, Listing_Price, Listing_Description, Listing_Post_Date, Listing_ID, Seller_ID,
                                    Seller_Name, Seller_Average_Review});

      // Increment the unique listing ID and move on
      constDB.child("Next_Listing_ID").set(Listing_ID + 1);
    });
    this.setState({id: Listing_ID});
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  tagCallback = (tagList) => {
	  	this.setState({tag: tagList});
  }

  onDrop(file, picture) {
    this.setState({image: this.state.image.concat(picture)});
    console.log(picture);
  }

  getPostDate() {
    var d = new Date();
    var currentDate = (d.getMonth() + 1) + "/" + d.getDate();
    return currentDate;
  }

  render () {

    return(
      <div className="center">
      <Header />
      <form className="listing-form" autoComplete="off">
        <div className="content-box">
          <h3 id="create-listing-title" className="basic-title">Create listing</h3>

          <label htmlFor="listing-title"><strong>Title:</strong></label> <br />
          <input type="text" className="basic-input" name="title" id="listing-title"
	    onChange={this.handleChange} required/> <br />

          <label htmlFor="listing-price"><strong>Price:</strong></label> <br />
          <input type="text" className="basic-input" name="price" id="listing-price"
	    onChange={this.handleChange} />

          <ImageUploader
            withIcon={false}
            withPreview ={true}
            buttonText='Upload Picture'
            onChange={this.onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            singleImage={true}
          />

          <label htmlFor="listing-content"><strong>Describe your listing:</strong></label> <br />
          <textarea name="desc" id="listing-content" onChange={this.handleChange} /> <br />

          <label htmlFor="tag"><strong>Add Tags:</strong></label> <br />
          <Tag callbackFunction={this.tagCallback} /> <br />

          <br />

          <button type="submit" className="basic-button" id="create-listing-button" onClick={this.createListing.bind(this)}>Create listing</button> <br />

        </div>
        </form>
      </div>
    );
  }
}
