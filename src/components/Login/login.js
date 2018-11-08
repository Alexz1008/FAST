import React from 'react'

const Home = () => (
  <div className="login-form">
    Email:<br />
    <input type="text" name="email" />
    <br />
    <a href="/register">First time user?</a><br />
    Last name:<br />
    <input type="text" name="password" /><br />
    <a href="/forgot_password">Forgot Password?</a>
    <br /><br />
    <input type="submit" value="Submit" />
    <a href="/home">To skip this, click here</a>
  </div>
)

export default Home
