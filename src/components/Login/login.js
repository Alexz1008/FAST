import React from 'react'
import './login.css'

export class Login extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="center">
          <form className="login-form">
          <h1><a href="/login" >Triton Market</a></h1>
          <div className="content-box">
            <h3 className="basic-title">Log in</h3>

            <label htmlFor="email"><strong>UCSD Email:</strong></label> <br /> 
            <input type="email" className="basic-input" name="email" id="email" required /> <br />

            <label htmlFor="password"><strong>Password:</strong></label>
            <a id="login-forgot-pass" href="/forgot_password">Forgot password?</a><br />
            <input type="password" className="basic-input" name="password" id="password" required /> <br />

            <br />

            <button type="submit" className="basic-button" id="login-button" >Log in</button> <br />

            <a href="/register">Register account</a> <br />

          </div>
          </form>
        </div>
      </div>
    );
  }
}
