// Login.js handles the user login portion of the website

// Import the required functionality for login
import React from 'react'
import './login.css'
import fire from '../Fire/fire'
import {withRouter} from 'react-router-dom'

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
        // Push them on to the homepage if the login is successful
        this.props.history.push("/home");
      }
      else if(!verified) {
        alert("Your email has not been verified yet. Please verify to have access to Triton Market!")
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
          <h1><a href="/" >Triton Market</a></h1>
          <div className="content-box">
            <h3 className="basic-title">Log in</h3>

            <label htmlFor="email"><strong>UCSD Email:</strong></label> <br />
            <input value={this.state.email} onChange={this.handleChange} type="email" className="basic-input" name="email" id="email" required /> <br />

            <label htmlFor="password"><strong>Password:</strong></label>
            <a id="login-forgot-pass" href="/forgot_password">Forgot password?</a><br />
            <input value={this.state.password} onChange={this.handleChange} type="password" className="basic-input" name="password" id="password" required /> <br />

            <br />

            <button onClick={this.login} type="submit" className="basic-button" id="login-button" >Log in</button> <br />

            <a href="/register">Register account</a> <br />

          </div>
          </form>
        </div>
      </div>
    );
  }
}

// Export the login page to redirect the user
export default withRouter(Login);
