import React from 'react'
import './listing.css'
import { Link } from 'react-router-dom'

export class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.state = {title: this.props.title, image: this.props.image, price: this.props.price, desc: this.props.desc, id: this.props.id, saved: this.props.saved}
  }

  handleAddClick() {
    console.log(this.props);
    this.setState({saved: true});
  }

  handleRemoveClick() {
    this.setState({saved: false});
  }

  render() {
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
          <button id="saveButton" onClick={this.state.saved ? this.handleRemoveClick : this.handleAddClick}>
            {this.state.saved ? 'Remove From Saved Listings' : 'Add to Saved Listings'}
          </button>
        </center>
      </div>
	  <div className = "listing-button">
		        <button type="submit"><b>Confirm Transaction</b></button>
      </div>
	  </div>
    );
  }
}

export default Listing
