import React from 'react'
import './login.css'
import fire from '../Fire/fire'
import {withRouter} from 'react-router-dom'

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: ''
    };

    //this.firebaseRef = this.props.db.database().ref("users");
  }

  login(e) {
    var success = true;
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=> {}).catch((error)=> {
      success = false;
      window.alert(error);
      console.log(error);
      this.props.history.push("/login");
    });
    if(success) {
      this.props.history.push("/home");
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  render () {
    return (
      <div className="container">
        <div className="center">
          <form className="login-form">
          <h1><a href="/login" >Triton Market</a></h1>
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

export default withRouter(Login);
