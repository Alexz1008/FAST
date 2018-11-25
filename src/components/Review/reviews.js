import React from 'react'
import { Review } from './review'
import './review.css'
//by default, using styles from ./login.css

export class Reviews extends React.Component {
  render() {
    return(
      <div className="reviews-container">
        <Review />
        <Review />
      </div>
    );
  }
}