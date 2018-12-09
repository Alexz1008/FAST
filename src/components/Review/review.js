import React from 'react'
import './review.css'
//by default, using styles from ./login.css

export class Review extends React.Component {
  
  render() {
    return(
      <div className="reviews-review-container">
        <div className="reviews-review-title">
          <center><b>{this.props.reviewtitle}</b></center>
        </div>
        <div className="reviews-review-attributes">
          <div className="reviews-review-attribute">
            Reviewed by: {this.props.seller}
          </div>
          <div className="reviews-review-attribute">
            Date: {this.props.transactiondate}
          </div>
          <div className="reviews-review-attribute">
            Score: {this.props.reviewrating}
          </div>
        </div>
        <div className="reviews-review-header">
          <b>{this.props.reviewheader}</b>
        </div>
        <div className="reviews-review-text">
        {this.props.reviewcontent}
        </div>
      </div>
    );
  }
}