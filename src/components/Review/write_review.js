import React from 'react'
import Header from '../Header/header'
import './review.css'
//by default, using styles from ./login.css

export class WriteReview extends React.Component {
  render() {
    return(
      <div class="center">
      <form className="listing-form" autocomplete="off">
      <Header />
        <div class="content-box">
          <h3 id="create-review-title" class="basic-title">Write review for Gary Gillespie</h3>
    
          <label for="review-title"><strong>Title:</strong></label> <br /> 
          <input id="review-title" type="text" class="review-input" name="review-title" required/> <br />

          <label for="review-rating"><strong>Rating:</strong></label> <br /> 
          <input id="review-rating" type="number" min="1" max="5" class="review-input" name="review-title" required/> <br /><br />
    
          <label for="listing-content"><strong>Review:</strong></label> <br /> 
          <textarea id="listing-content" /> <br />
    
    
          <br />
    
          <button type="submit" class="basic-button" id="create-review-button">Post review</button> <br />
    
        </div>
        </form>
      </div>
    );
  }
}