import React from 'react'
//by default, using styles from ./login.css


const Forgot_Password = () => (
  <div class="center">
    <form className="forgot-password-form">
    <h1><a href="/login" >Triton Market</a></h1>
    <div class="content-box">
      <h3 class="basic-title">Forgot password</h3>

      <label for="email"><strong>UCSD Email:</strong></label> <br /> 
      <input type="email" class="basic-input" name="email" id="email" required /> <br />

      <br />

      <button type="submit" class="basic-button" id="forgot-button">Reset Password</button>

    </div>
    </form>
  </div>
)

export default Forgot_Password;
