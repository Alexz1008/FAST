import React from 'react'
import './register.css';


const Home = () => (
  <div className="register-form" class="center">
    <div class="left">
      <h3>Register Account</h3>

      <label for="email">UCSD Email:</label><br />
      <input type="text" name="email" id="email" /> <br />

      <label for="password">Password:</label><br />
      <input type="text" name="password" id="password" /> <br />

      <label for="reppassword">Repeat Password:</label><br />
      <input type="text" name="password" id="reppassword" /><br />
      <br /><br />
      <button>Register</button>
    </div>
  </div>
)

export default Home
