import React from 'react'
import './forgot_password.css'

const Home = () => (
  <div className="forgot-password-form" class="center">
    <h1><a href="/login" >Triton Market</a></h1>
    <div class="content-box">
      <h3>Forgot password</h3>

      <label for="email"><strong>UCSD Email:</strong></label> <br /> 
      <input type="email" name="email" id="email" /> <br />

      <br />

      <button type="submit" id="forgot-password">Reset Password</button>

    </div>
  </div>
)

export default Home
