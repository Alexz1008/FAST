import React from 'react'
//by default, using styles from ./login.css


const Register = () => (
  
  <div class="center">
  <form className="register-form">
    <h1><a href="/login" class="site-title">Triton Market</a></h1>
    <div class="content-box">
      <h3 class="basic-title">Register account</h3>

      <label for="email"><strong>UCSD Email:</strong></label><br />
      <input type="email" class="basic-input" name="email" id="email" required/> <br />

      <label for="password"><strong>Password:</strong></label><br />
      <input type="password" class="basic-input" name="password" id="password" required/> <br />

      <label for="repassword"><strong>Re-enter password:</strong></label><br />
      <input type="password" class="basic-input" name="password" id="repassword" required/><br />
      <br /><br />
      <button className="register-form" class="basic-button" type="submit" id="register-button">Register</button>
    </div>
    </form>
  </div>
)

export default Register
