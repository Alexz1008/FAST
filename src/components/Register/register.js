import React from 'react'
//by default, using styles from ./login.css


const Home = () => (
  
  <div className="register-form" class="center">
    <h1><a href="/login" class="site-title">Triton Market</a></h1>
    <div class="content-box">
      <h3 id="register-title">Register account</h3>

      <label for="email"><strong>UCSD Email:</strong></label><br />
      <input type="email" class="register-input" name="email" id="email" /> <br />

      <label for="password"><strong>Password:</strong></label><br />
      <input type="password" class="register-input" name="password" id="password" /> <br />

      <label for="repassword"><strong>Re-enter password:</strong></label><br />
      <input type="password" class="register-input" name="password" id="repassword" /><br />
      <br /><br />
      <button className="register-form" type="submit" id="register-button">Register</button>
    </div>
  </div>
)

export default Home
