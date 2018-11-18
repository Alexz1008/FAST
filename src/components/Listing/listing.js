import React from 'react'
import './listing.css'
import { Link } from 'react-router-dom'

export class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddClickSaved = this.handleAddClickSaved.bind(this);
    this.handleRemoveClickSaved = this.handleRemoveClickSaved.bind(this);
    this.handleAddClickConfirm = this.handleAddClickConfirm.bind(this);
    this.handleRemoveClickConfirm = this.handleRemoveClickConfirm.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.state = {title: this.props.title, image: this.props.image, price: this.props.price, desc: this.props.desc, id: this.props.id, isInterested: this.props.isInterested, saved: this.props.saved, confirmed: this.props.confirmed, isMyListing: this.props.isMyListing}
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

  handleEditClick() {
    console.log("edit listing");
  }

  handleDeleteTagClick() {
    console.log("delete tag(s)");
  }

  render() {
    const isInterested = this.state.isInterested;
    const isMyListing= this.state.isMyListing;
    const isConfirmed = this.state.confirmed;
    return (
	  <div>
      <div>
        <div className="listing-title"><b>{this.state.title}</b></div>
        <img className="listing-picture" src={this.state.image} alt="did not load" />
        <center>${this.state.price}</center><br />
        {this.state.desc}<br />
        {this.props.location}<br />
        <br />
        <center>
          <button id="saveButton" onClick={this.state.saved ? this.handleRemoveClickSaved : this.handleAddClickSaved}>
            {this.state .saved ? 'Remove From Saved Listings' : 'Add to Saved Listings'}
          </button>
          <div>
              {isMyListing ?
                <button id="editListing" onClick={this.handleEditClick()}>
                    Edit Listing
                </button>
              : console.log("invalid edit listing") }
          </div>
          <div>
            {isMyListing ?
              <button id="deleteTag" onClick={this.handleDeleteTagClick()}>
                Delete Tag(s)
              </button>
            : console.log("invalid delete tag")}
          </div>
          <div>
            {isInterested ?
              <button id="confirmTransaction" onClick={this.state.confirmed ? this.handleRemoveClickConfirm : this.handleAddClickConfirm}>
                {this.state.confirmed ? 'Cancel Transaction' : 'Confirm Transaction'}
               </button>
            : <br/ > }
          </div>
        </center>
      </div>
	  </div>
    );
  }
}

export default Listing
