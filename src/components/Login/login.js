import React from 'react'
import './login.css'

export class Login extends React.Component {
  render () {
    return (
      <div class="center">
        <form className="login-form">
        <h1><a href="/login" >Triton Market</a></h1>
        <div class="content-box">
          <h3 class="basic-title">Log in</h3>

          <label for="email"><strong>UCSD Email:</strong></label> <br /> 
          <input type="email" class="basic-input" name="email" id="email" required /> <br />

          <label for="password"><strong>Password:</strong></label>
          <a id="login-forgot-pass" href="/forgot_password">Forgot password?</a><br />
          <input type="password" class="basic-input" name="password" id="password" required /> <br />

          <br />

          <button type="submit" class="basic-button" id="login-button" >Log in</button> <br />

          <a href="/register">Register account</a> <br />

        </div>
        </form>
      </div>
    );
  }
}
