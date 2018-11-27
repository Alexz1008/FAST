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
    //this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: ''
    };

    this.firebaseRef = fire.database().ref("users");
  }

  createListing(e) {
    e.preventDefault();
    fire.database().ref("users").child('Test1').set({name: 'Test1', title: 'TestTitle1'});
    console.log("Did something");
  }
  
  render () {
    return(
      <div className="center">
      <Header />
      <form className="listing-form" autoComplete="off">
        <div className="content-box">
          <h3 id="create-listing-title" className="basic-title">Create listing</h3>

          <label htmlFor="listing-title"><strong>Title:</strong></label> <br /> 
          <input type="text" className="basic-input" name="listing-title" id="listing-title" required/> <br />

          <label htmlFor="listing-price"><strong>Price:</strong></label> <br />
          <input type="text" className="basic-input" name="listing-price" id="listing-price" />

          <ImageUploader
            withIcon={false}
            buttonText='Upload Picture'
            // onChange={e => this.setState({picture: e.target.picture})}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
          />

          <label htmlFor="listing-content"><strong>Describe your listing:</strong></label> <br /> 
          <textarea id="listing-content" /> <br />

          <label htmlFor="listing-tag"><strong>Add Tags:</strong></label> <br />
          <Tag /> <br />

          <br />

          <button type="submit" className="basic-button" id="create-listing-button" onClick={this.createListing}>Create listing</button> <br />

        </div>
        </form>
      </div>
    );
  }
}
