import React from 'react'
//by default, using styles from ./login.css
import fire from '../Fire/fire'

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: '',
      repeat: ''
    };

    //this.firebaseRef = this.props.db.database().ref("users");
  }

  register(e) {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error)=> {
      console.log(error);
    });
  }

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

            <label htmlFor="repassword"><strong>Re-enter password:</strong></label><br />
            <input value={this.state.repeat} onChange={this.handleChange} type="password" className="basic-input" name="password" id="repassword" required/><br />
            <br /><br />
            <button onClick={this.register} className="basic-button" type="submit" id="register-button">Register</button>
          </div>
          </form>
        </div>
      </div>
    );
  }
}
