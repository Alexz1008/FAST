import React from 'react'
//by default, using styles from ./login.css


const Home = () => (
  <div className="forgot-password-form" class="center">
    <h1><a href="/login" >Triton Market</a></h1>
    <div class="content-box">
      <h3 id="forgot-title">Forgot password</h3>

      <label for="email"><strong>UCSD Email:</strong></label> <br /> 
      <input type="email" class="forgot-input" name="email" id="email" /> <br />

      <br />

      <button type="submit" id="forgot-button">Reset Password</button>

    </div>
  </div>
)

export default Home
