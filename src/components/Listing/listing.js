import React from 'react'
import './listing.css'

export class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddClickSaved = this.handleAddClickSaved.bind(this);
    this.handleRemoveClickSaved = this.handleRemoveClickSaved.bind(this);
    this.handleAddClickConfirm = this.handleAddClickConfirm.bind(this);
    this.handleRemoveClickConfirm = this.handleRemoveClickConfirm.bind(this);
    this.handleAddInterestClick = this.handleAddInterestClick.bind(this);
    this.handleRemoveInterestClick = this.handleRemoveInterestClick.bind(this);
    this.state = {title: this.props.title, image: this.props.image, price: this.props.price, desc: this.props.desc, id: this.props.id,
                  isInterested: this.props.isInterested, saved: this.props.saved, confirmed: this.props.confirmed, isMyListing: this.props.isMyListing,
                  isLog: this.props.isLog, reviewed: this.props.reviewed}
  }

  handleAddClickSaved() {
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
  handleAddInterestClick() {
    this.setState({isInterested: true});
  }
  handleRemoveInterestClick() {
    this.setState({isInterested: false});
    this.setState({confirmed: false});
  }
  handleDeleteListingClick() {
    console.log("delete listing");
  }
  handleEditListingClick() {
    console.log("delete listing");
  }
  handleReviewClick() {
    console.log("review");
  }
  handleDeleteReviewClick() {
    console.log("review");
  }
  render() {
    const isInterested = this.state.isInterested;
    const isMyListing= this.state.isMyListing;
    const isLog = this.state.isLog;
    const reviewed = this.state.reviewed;
    return (
	  <div className={isMyListing ? 'listing-container-self' : 'listing-container'}>
      <div className="listing-upper">
        <div className="listing-title"><b>{this.state.title}</b></div>
        <img className="listing-picture" src={this.state.image} alt="did not load" />
        <div className="listing-header">
          <div className="listing-header-item">
            Rating: 3.4
          </div>
          <div className="listing-header-item">
            ${this.state.price}
          </div>
          <div className="listing-header-item">
            Posted: 11-6-17
          </div>
        </div>
        <div className="listing-desc">{this.state.desc}<br />{this.props.location}</div>
        <br />
        <center>
        </center>
      </div>
      <div className="listing-lower">
        <div>
          {isLog ?
              <div className="listing-log">
                {
                  isMyListing ?
                  console.log("invalid interested listing")
                  :
                  <button className='listing-button-unselected' id="writeReview" onClick={this.handleReviewClick}>
                    {this.state.reviewed ? 'Edit Review' : 'Write Review'}
                  </button>
                }
                {
                  reviewed ?
                  <button className='listing-button-unselected' id="deleteReview" onClick={this.handleDeleteReviewClick}>
                    Delete Review
                  </button>
                  :
                  console.log("no review")}
              </div>
            :
            <div className="listing-regular">
              <div>
                  {isMyListing ?
                    console.log("invalid interest listing")
                  : 
                  <button className={this.state.saved ? 'listing-button-selected' : 'listing-button-unselected'} id="saveButton" onClick={this.state.saved ? this.handleRemoveClickSaved : this.handleAddClickSaved}>
                    {this.state.saved ? 'Saved' : 'Save'}
                  </button>}
              </div>
              <div>
                  {isMyListing ?
                    console.log("invalid interest listing")
                  : 
                  <button className={isInterested ? 'listing-button-selected' : 'listing-button-unselected'} id="interestedListing" onClick={this.state.isInterested ? this.handleRemoveInterestClick : this.handleAddInterestClick}>
                    {isInterested ? 'Interested' : 'Show Interest'}
                  </button>}
              </div>
              <div>
                {isMyListing ?
                    <button className='listing-button-unselected' id="editListing" onClick={this.handleEditListingClick()}>
                      Edit
                    </button>
                    : console.log("invalid edit listing")}
              </div>
              <div>
                  {isMyListing ?
                    <button className='listing-button-unselected' id="deleteListing" onClick={this.handleDeleteListingClick()}>
                      Delete
                    </button>
                  : console.log("invalid delete listing")}
              </div>
              <div>
                {isInterested ?
                  <button className={this.state.confirmed ? 'listing-button-selected' : 'listing-button-unselected'} id="confirmTransaction" onClick={this.state.confirmed ? this.handleRemoveClickConfirm : this.handleAddClickConfirm}>
                    {this.state.confirmed ? 'Cancel Transaction' : 'Confirm Transaction'}
                  </button>
                  : console.log("invalid interested listing")}
              </div>
            </div>
          }
        </div>
      </div>
	  </div>
    );
  }
}

export default Listing
