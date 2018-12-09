// Login.js handles the user login portion of the website

// Import the required functionality for login
import React from 'react'
import './login.css'
import fire from '../Fire/fire'
import {withRouter} from 'react-router-dom'
import Logo from './TM2.png'

export class Login extends React.Component {
  constructor(props) {
    super(props);
    // Bind the proper login and handle methods to the one in the current state
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // Populate the state with email and password for authentication with firebase
    this.state = {
      email: '',
      password: ''
    };
  }

  // Setup a login method to sign into our firebase users database
  login(e) {
    e.preventDefault();
    // Try authenticating the email and password combo with firebase
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=> {
      // Check to see if their email is verified
      var user = fire.auth().currentUser;
      var verified = user.emailVerified;
      if(verified)
      {
        // Push them on to the homepage if they are verified is successful
        this.props.history.push("/home");
      }
      else if(!verified) {
        // If they are not verified, send another verification email in case they lost it or never got one
        user.sendEmailVerification().then((u) => {
          // Email Sent
          alert("Your email has not been verified yet. We just resent you a verification email in case yours got lost in the mail. Please verify to have access to Triton Market!");
        })
        .catch((error)=> {
          // Log the error if verification sending was unsuccessful
          console.log(error);
        });
        // Push the user back to login since they are not verified
        this.props.history.push("/login");
      }
    }).catch((error)=> {
      // If there is any error, report it to the user and prevent going to home
      window.alert(error);
      console.log(error);
      console.log(this.props);
      // Reload the login page to force them to enter proper credentials again
      this.props.history.push("/login");
    });
  }

  // Setup a handleChange method to map the form to the proper values
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  render () {
    return (
      // Render a form on the front-end to allow users to login with their credentials

      <div className="container">
        <div className="center">
          <form className="login-form">
          <div className="content-box">
            <img src = {Logo} width = "200" className = "center" title = "Triton Market" alt="Logo"></img>
            <h3 className="basic-title">LOG IN</h3><br /><br /> <br />

            <label htmlFor="email"><strong></strong></label> <br />
            <input value={this.state.email} onChange={this.handleChange} placeholder="UCSD Email" type="email" className="basic-input" name="email" id="email" required /> <br />
             <br />
            <label htmlFor="password"><strong></strong></label>
            <input value={this.state.password} onChange={this.handleChange} placeholder = "Password" type="password" className="basic-input" name="password" id="password" required /> <br />

            <button onClick={this.login} type="submit" className="basic-button" id="login-button" >Login</button> <br /> <br /> <br />
              <a id ="create-account" href="/register">Register account</a>
              <a id="login-forgot-pass" href="/forgot_password">Forgot password?</a><br />
          </div>
          </form>
        </div>
      </div>
    );
  }
}

// Export the login page to redirect the user
export default withRouter(Login);
