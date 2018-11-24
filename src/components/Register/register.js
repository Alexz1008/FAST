import React from 'react'
//by default, using styles from ./login.css

export class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.firebaseRef = this.props.db.database().ref("users");
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }

  pushToFirebase(event) {
    const {email, password} = this.state;
    event.preventDefault();
    this.firebaseRef.child(email).set({email, password});
    this.setState({email: '', password: ''});
    this.firebaseRef.child(email).set({email: this.state.email, password: this.state.password});
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
            <input type="email" className="basic-input" name="email" id="email" onChange= {e => this.setState({email: e.target.value})} required/> <br />

            <label htmlFor="password"><strong>Password:</strong></label><br />
            <input type="password" className="basic-input" name="password" id="password" onChange= {e => this.setState({password: e.target.value})} required/> <br />

            <label htmlFor="repassword"><strong>Re-enter password:</strong></label><br />
            <input type="password" className="basic-input" name="password" id="repassword" required/><br />
            <br /><br />
            <button className="basic-button" type="submit" id="register-button" onClick={this.pushToFirebase.bind(this)}>Register</button>
          </div>
          </form>
        </div>
      </div>
    );
  }
}
