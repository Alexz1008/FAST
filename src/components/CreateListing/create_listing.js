import React from 'react'
import Header from '../Header/header'
import './create_listing.css'
import ImageUploader from 'react-images-upload';
import Tag from '../Listing/tag'
//by default, also using styles from ./login.css

export class CreateListing extends React.Component{
  constructor(props) {
    super(props);
    this.createListing = this.createListing.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.tagCallback = this.tagCallback.bind(this);
    this.onDrop = this.onDrop.bind(this);
    
    // Setup the firebase ref for the constants DB and listings DB
    this.constantsDB = this.props.db.database().ref("Constants");
    this.listingsDB = this.props.db.database().ref("Listing");
    
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
    
  createListing(e) {
    var listID = this.state.id;
    var idExists = true;
    const title = this.state.title;
    const image = this.state.image; 
    const price = this.state.price;
    const desc = this.state.desc;
    let listDB = this.listingsDB;
    let constDB = this.constantsDB;
    e.preventDefault();
    
    // Save the new listing to the database after making sure the id doesn't exist yet
    this.listingsDB.once("value").then(function(snapshot) {
      idExists = snapshot.child(listID).exists();
      while(idExists) {
        listID += 1;
        idExists = snapshot.child(listID).exists();
      }
      listDB.child(listID).set({title, image, price, desc, listID});
    
      // Increment the unique listing ID and move on
      constDB.child("Next_Listing_ID").set(listID + 1);
    });
    this.setState({id: listID});
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
