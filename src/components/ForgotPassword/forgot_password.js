// Forgot_Password.js handles the user password forget and reset for the website

import React from 'react'
//By default, forgot_password.js uses styles from ./login.css
import fire from '../Fire/fire'
import {withRouter} from 'react-router-dom'
import Logo from '../Login/TM2.png'


export class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    // Bind the proper forgot and handle methods to the one in the current state
    this.forgot = this.forgot.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // Populate the state with email for password reset with Firebase
    this.state = {
      email: ''
    };
  }

  // Setup a forgot method to reset the user's password using Firebase
  forgot(e) {
    e.preventDefault();
    const { history } = this.props;
    // Send the user an email with a password reset link
    fire.auth().sendPasswordResetEmail(this.state.email).then((u)=> {
      // Email sent
      // Give the user an alert to check their inbox and then push them back to the login page
      alert("Password reset initiation successful! Please check your inbox to reset your password and access Triton Market!");
      history.push("/login");
    })
    .catch((error)=> {
      // If there was any error, log and alert then push back to login
      alert(error);
      history.push("/login");
    });
  }

  // Setup a handleChange method to map the form to the proper values
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  render() {
    return (
      // Render an email fied on the front-end to allow users to enter their email for the password reset link
      <div className="container">
        <div className="center">
          <form className="forgot-password-form">
          <div className="content-box">
           <img src = {Logo} width = "200" className = "center" title = "Triton Market" alt="Logo"></img>
            <h3 className="basic-title">FORGOT PASSWORD</h3>

            <input value={this.state.email} onChange={this.handleChange} type="email" className="basic-input" name="email" placeholder="UCSD Email" id="email" required /> <br />
            <br />

            <button type="submit" onClick={this.forgot} className="basic-button" id="forgot-button">Reset Password</button>
            <a class="button" className= "basic-button-cancel" id="cancel-button" href = "/login">Cancel </a>
          </div>
          </form>
        </div>
      </div>
    );
  }
}

// Export the forgot password page to redirect the user
export default withRouter(ForgotPassword);
