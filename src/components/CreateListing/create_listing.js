import React from 'react'
import Header from '../Header/header'
import './create_listing.css'
import ImageUploader from 'react-images-upload';
//by default, also using styles from ./login.css

const Create_Listing = () => (
  <div class="center">
  <form className="listing-form" autocomplete="off">
  <Header />
    <div class="content-box">
      <h3 id="create-listing-title" class="basic-title">Create listing</h3>

      <label for="listing-title"><strong>Title:</strong></label> <br /> 
      <input type="text" class="basic-input" name="listing-title" id="listing-title" required/> <br />

      <label for="listing-price"><strong>Price:</strong></label> <br />
      <input type="text" class="basic-input" name="listing-price" id="listing-price" />

      <ImageUploader
        withIcon={false}
        buttonText='Upload Picture'
        // onChange={e => this.setState({picture: e.target.picture})}
        imgExtension={['.jpg', '.gif', '.png', '.gif']}
        maxFileSize={5242880}
      />

      <label for="listing-content"><strong>Describe your listing:</strong></label> <br /> 
      <textarea id="listing-content" /> <br />


      <br />

      <button type="submit" class="basic-button" id="create-listing-button">Create listing</button> <br />

    </div>
    </form>
  </div>
)

export default Create_Listing;
