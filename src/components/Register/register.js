import React from 'react'
//by default, using styles from ./login.css
import fire from '../Fire/fire'
import {withRouter} from 'react-router-dom'

export class Register extends React.Component {
  constructor(props) {
    super(props);
    // Bind the proper register and handle methods to the one in the current state
    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: '',
      repass: ''
    };

    //this.firebaseRef = this.props.db.database().ref("users");
  }

  // Setup a register method to add a user into our firebase users database
  register(e) {
    var success = true;
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error)=> {
      // If there is any error, report it to the user and prevent going to login
      success = false;
      window.alert(error);
      console.log(error);
      this.props.history.push("/register");
    });
    if(success){
      // Push them on to the login page if the registration is successful
      this.props.history.push("/login");
    }
  }

  // Setup a handleChange method to map the form to the proper values
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  render() {
    return(
      <div className="container">
        <div className="center">
        <form className="register-form">
          <h1><a href="/login" className="site-title">Triton Market</a></h1>
          <div className="content-box">
            <h3 className="basic-title">Register account</h3>

            <label htmlFor="email"><strong>UCSD Email:</strong></label><br />
            <input value={this.state.email} onChange={this.handleChange} type="email" className="basic-input" name="email" id="email" required/> <br />

            <label htmlFor="password"><strong>Password:</strong></label><br />
            <input value={this.state.password} onChange={this.handleChange} type="password" className="basic-input" name="password" id="password" required/> <br />

            <label htmlFor="repass"><strong>Re-enter password:</strong></label><br />
            <input value={this.state.repeat} onChange={this.handleChange} type="password" className="basic-input" name="repass" id="repass" required/><br />

            <br /><br />

            <button onClick={this.register} className="basic-button" type="submit" id="register-button">Register</button>
          </div>
          </form>
        </div>
      </div>
    );
  }
}

// Export the register page to redirect the user
export default withRouter(Register);
