import React from 'react'
import './listing.css'

export class Listing extends React.Component {
  render() {
    return (
      <div>
        <div className="listing-title"><b>{this.props.title}</b></div>
        <img className="listing-picture" src={this.props.image} alt="did not load" />
        <center>${this.props.price}</center><br />
        {this.props.desc}<br />
		{this.props.location}
      </div>
    );
  }
}