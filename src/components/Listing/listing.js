import React from 'react'
import './listing.css'

export class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddClickSaved = this.handleAddClickSaved.bind(this);
    this.handleRemoveClickSaved = this.handleRemoveClickSaved.bind(this);
    this.handleAddClickConfirm = this.handleAddClickConfirm.bind(this);
    this.handleRemoveClickConfirm = this.handleRemoveClickConfirm.bind(this);
    this.state = {title: this.props.title, image: this.props.image, price: this.props.price, desc: this.props.desc, id: this.props.id,
                  isInterested: this.props.isInterested, saved: this.props.saved, confirmed: this.props.confirmed, isMyListing: this.props.isMyListing,
                  }
  }

  handleAddClickSaved() {
    console.log(this.props);
    this.setState({saved: true});
  }

  handleRemoveClickSaved() {
    this.setState({saved: false});
  }
  handleAddClickConfirm() {
    console.log(this.props);
    this.setState({confirmed: true});
  }

  handleRemoveClickConfirm() {
    this.setState({confirmed: false});
  }

  handleDeleteTagClick() {
    console.log("delete tag(s)");
  }

  handleDeleteListingClick() {
    console.log("delete listing");
  }
  handleInterestClick() {
    console.log("delete listing");
  }
  render() {
    const isInterested = this.state.isInterested;
    const isMyListing= this.state.isMyListing;
    const isConfirmed = this.state.confirmed;
    return (
	  <div className="listing-container">
      <div className="listing-upper">
        <div className="listing-title"><b>{this.state.title}</b></div>
        <img className="listing-picture" src={this.state.image} alt="did not load" />
        <center>${this.state.price}</center><br />
        <div className="listing-desc">{this.state.desc}</div>
        <div className="listing-desc">{this.props.location}</div>
        <br />
        <center>
        </center>
      </div>
      <div className="listing-lower">
        <button className="listing-button" id="saveButton" onClick={this.state.saved ? this.handleRemoveClickSaved : this.handleAddClickSaved}>
          {this.state.saved ? 'Saved' : 'Save'}
        </button>
        <div>
            {isMyListing ?
              console.log("invalid interest listing")
            : 
            <button className="listing-button" id="interestedListing" onclick={this.handleInterestClick()}>
              {isInterested ? 'Interested' : 'Show Interest'}
            </button>}
        </div>
        <div>
            {isMyListing ?
              <button className="listing-button" id="deleteListing" onclick={this.handleDeleteListingClick()}>
                Delete
              </button>
            : console.log("invalid delete listing")}
        </div>
        <div>
          {isMyListing ?
              <button className="listing-button" id="editListing" onclick={this.handleEditListingClick()}>
                Edit
              </button>
              : console.log("invalid edit listing")}
        </div>
        <div>
          {isInterested ?
            <button className="listing-button" id="confirmTransaction" onClick={this.state.confirmed ? this.handleRemoveClickConfirm : this.handleAddClickConfirm}>
              {this.state.confirmed ? 'Cancel Transaction' : 'Confirm Transaction'}
            </button>
            : console.log("invalid interested listing")}
        </div>
      </div>
	  </div>
    );
  }
}

export default Listing
