import React from 'react'
import Header from '../Header/header'
import './create_listing.css'
import ImageUploader from 'react-images-upload';
import Tag from '../Listing/tag'
import fire from '../Fire/fire'
import { addToUserList } from '../Utilities/utilities'

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
    this.state = {
      image: [],
      tags: "",
      valid_image: false
    };
  }

  // If the component gets mounted successfully, authenticate the user
  componentDidMount(){
    const { history } = this.props;
    fire.auth().onAuthStateChanged((user) => {
      // If the user is detected, save it to the current state
      if(user) {
        this.setState({user});
        //localStorage.setItem('user',user.uid);
      }
      // Otherwise set the current user to null
      else {
          this.setState({user: null});
          history.push("/");
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
    const Buyer_ID = "";
    const Is_Transaction_Log = false;
    const Seller_Confirmed = false;
    const Listing_Tag = this.state.tags;
    const Buyer_Reviewed = false;
    const Seller_Reviewed = false;

    var Seller_Name;
    var Seller_Average_Review;
    var Listing_ID = 1;
    var idExists = true;
    let listDB = this.listingsDB;
    let constDB = this.constantsDB;
    e.preventDefault();

    //Ensure all fields are filled; if not, can't create listing
    if(!this.fieldsFilled()){
      return;
    }
    //Ensure that profile picture is added
    if(! this.imageAdded()){
      return;
    }

    // Save the new listing to the database after making sure the id doesn't exist yet
    const { history } = this.props;
    fire.database().ref().once("value").then(function(snapshot) {
      Seller_Name = snapshot.child("Users/" + Seller_ID + "/Name").val();
      Seller_Average_Review = snapshot.child("Users/" + Seller_ID + "/Average_Review").val();
      Listing_ID = snapshot.child("Constants/Next_Listing_ID").val();
      idExists = snapshot.child("Listing/" + Listing_ID).exists();
      while(idExists) {
        Listing_ID += 1;
        idExists = snapshot.child("Listing/" + Listing_ID).exists();
      }
      listDB.child(Listing_ID).set({Listing_Title, Listing_Pic, Listing_Price, Listing_Description, Listing_Post_Date, Listing_ID, Seller_ID, Buyer_ID,
                                    Seller_Name, Seller_Average_Review, Is_Transaction_Log, Seller_Confirmed, Listing_Tag, Buyer_Reviewed, Seller_Reviewed,
                                    });

      // Increment the unique listing ID and move on
      constDB.child("Next_Listing_ID").set(Listing_ID + 1);
      history.push("/home");

      addToUserList(Seller_ID, Listing_ID, "Posted_Listings");
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  // update tags when tags are checked
  tagCallback = (tagList) => {
    var separator = ",";
    var tags = tagList.join(separator);
    this.setState({tags: tags});
  }

  onDrop(file, picture) {
    this.setState({
      valid_image: (! this.state.valid_image),
      image: this.state.image.concat(picture)
    });

  }

  getPostDate() {
    var d = new Date();
    var currentDate = (d.getMonth() + 1) + "/" + d.getDate();
    return currentDate;
  }

  //Check if the user has added a picture
  imageAdded(){
    if (!this.state.valid_image){
      alert("Please add a picture.");
      return false;
    }
    return true;
  }


  fieldsFilled(){
    const Listing_Title = this.state.title;
    const Listing_Pic = this.state.image;
    const Listing_Price = this.state.price;
    const Listing_Description = this.state.desc;
    //Ensure that user has entered some title, alert otherwise
    if(Listing_Title === undefined || Listing_Title.length < 1){
      alert("Please enter a title.");
      return false;
    }
     //Ensure that user has entered a listing price, alert otherwise
    if(Listing_Price === undefined || Listing_Price.length < 1){
      alert("Please enter a price.");
      return false;
    }
    //Ensure that user has entered some description code, alert otherwise
    if(Listing_Description === undefined || Listing_Description.length < 1){
      alert("Please enter a description.");
      return false;
    }
    //Ensure that user has uploaded a picture
    if(Listing_Pic === undefined || Listing_Pic === null || Listing_Pic === '[]'){
      alert("Please add a picture.");
      return false;
    }
    //All fields filled
    return true;
  }

  render () {
    return(
      <div className="center">
      <Header />
      <form className="listing-form" autoComplete="off">
        <div className="content-box">
          <h3 id="create-listing-title" className="basic-title">CREATE LISTING</h3>

          <input type="text" className="basic-input" placeholder= "Title" maxlength="26" name="title" id="listing-title"
	    onChange={this.handleChange} required/> <br />

          <input type="text" className="basic-input" placeholder="Price" maxLength="7" name="price" id="listing-price"
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

          <textarea name="desc" id="listing-content" onChange={this.handleChange} maxlength="175" placeholder="Describe your listing..." /> <br />

          <label htmlFor="tag"><strong>Add Tags:</strong></label> <br />
          <Tag callbackFunction={this.tagCallback} tags={this.state.tags}/> <br />

          <br />

          <button type="submit" className="basic-button" disabled={!this.fieldsFilled} id="create-listing-button" onClick={this.createListing.bind(this)}>Create listing</button> <br />

        </div>
        </form>
      </div>
    );
  }
}
