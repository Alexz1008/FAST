import React from 'react'
import './register.css';


const Home = () => (
  
  <div className="register-form" class="center">
    <h1><a href="/login" >Triton Market</a></h1>
    <div class="content-box">
      <h3>Register account</h3>

      <label for="email"><strong>UCSD Email:</strong></label><br />
      <input type="email" name="email" id="email" /> <br />

      <label for="password"><strong>Password:</strong></label><br />
      <input type="password" name="password" id="password" /> <br />

      <label for="repassword"><strong>Re-enter password:</strong></label><br />
      <input type="password" name="password" id="repassword" /><br />
      <br /><br />
      <button type="submit" id="register">Register</button>
    </div>
  </div>
)

export default Home
