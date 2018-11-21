import React from 'react'
//by default, using styles from ./login.css


export class ForgotPassword extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="center">
          <form className="forgot-password-form">
          <h1><a href="/login" >Triton Market</a></h1>
          <div className="content-box">
            <h3 className="basic-title">Forgot password</h3>

            <label htmlFor="email"><strong>UCSD Email:</strong></label> <br /> 
            <input type="email" className="basic-input" name="email" id="email" required /> <br />

            <br />

            <button type="submit" className="basic-button" id="forgot-button">Reset Password</button>

          </div>
          </form>
        </div>
      </div>
    );
  }
}