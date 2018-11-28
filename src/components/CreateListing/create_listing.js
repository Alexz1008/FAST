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
    this.state = {
      id: 1,
      image: 'na'
    };

    this.firebaseRef = this.props.db.database().ref("Listing");
  }
    
  createListing(e) {
    const title = this.state.title;
    const image = this.state.image; 
    const price = this.state.price;
    const desc = this.state.desc;
    e.preventDefault();
    this.firebaseRef.child(this.state.id).set({title, image, price, desc});
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value});
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
            buttonText='Upload Picture'
            // onChange={e => this.setState({picture: e.target.picture})}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
          />

          <label htmlFor="listing-content"><strong>Describe your listing:</strong></label> <br /> 
          <textarea name="desc" id="listing-content" onChange={this.handleChange} /> <br />

          <label htmlFor="tag"><strong>Add Tags:</strong></label> <br />
          <Tag /> <br />

          <br />

          <button type="submit" className="basic-button" id="create-listing-button" onClick={this.createListing.bind(this)}>Create listing</button> <br />

        </div>
        </form>
      </div>
    );
  }
}