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
      title: 'test',
      image: 'test2',
      price: '1',
      desc: 'test3',
      tag: 'test4'
    };

    this.firebaseRef = this.props.db.database().ref("Listing");
  }
    
  createListing(e) {
    const Listing_Title = this.state.title;
    const Listing_Pics = this.state.image; 
    const Listing_Price = this.state.price;
    const Listing_Description = this.state.desc;
    const Listing_Tag = this.state.tag;
    e.preventDefault();
    this.firebaseRef.child(Listing_Title).set({Listing_Title, Listing_Pics, Listing_Price, Listing_Description, Listing_Tag});
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  render () {

    return(
      <div className="center">
      <form className="listing-form" autoComplete="off">
      <Header />
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
