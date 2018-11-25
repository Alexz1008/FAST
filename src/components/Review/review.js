import React from 'react'
import './review.css'
//by default, using styles from ./login.css

export class Review extends React.Component {
  render() {
    return(
      <div className="reviews-review-container">
        <div className="reviews-review-title">
          <center><b>Singular Banana</b></center>
        </div>
        <div className="reviews-review-attributes">
          <div className="reviews-review-attribute">
            Posted by: Alex Zhou
          </div>
          <div className="reviews-review-attribute">
            Date: 11-25-18
          </div>
          <div className="reviews-review-attribute">
            Score: 4
          </div>
        </div>
        <div className="reviews-review-header">
          <b>Excellent purchase</b>
        </div>
        <div className="reviews-review-text">
          This was an excellent purchase for an excellent item and I think the service was gillexcellent.
        </div>
      </div>
    );
  }
}