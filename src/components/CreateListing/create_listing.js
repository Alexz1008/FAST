import React, {Component} from 'react'
import Header from '../Header/header'
import './create_listing.css'
import ImageUploader from 'react-images-upload';
import Tag from '../Listing/tag'
//by default, also using styles from ./login.css

class Create_Listing extends Component{


render () {
  return(
  <div className="center">
  <form className="listing-form" autoComplete="off">
  <Header />
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

      <button type="submit" className="basic-button" id="create-listing-button">Create listing</button> <br />

    </div>
    </form>
  </div>
  );
  }
}
export default Create_Listing;
