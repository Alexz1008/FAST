import React, {Component} from 'react'
//by default, using styles from ./login.css

class Register extends Component {

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
      <div class="center">
      <form className="register-form">
        <h1><a href="/login" class="site-title">Triton Market</a></h1>
        <div class="content-box">
          <h3 class="basic-title">Register account</h3>

          <label for="email"><strong>UCSD Email:</strong></label><br />
          <input type="email" class="basic-input" name="email" id="email" onChange= {e => this.setState({email: e.target.value})} required/> <br />

          <label for="password"><strong>Password:</strong></label><br />
          <input type="password" class="basic-input" name="password" id="password" onChange= {e => this.setState({password: e.target.value})} required/> <br />

          <label for="repassword"><strong>Re-enter password:</strong></label><br />
          <input type="password" class="basic-input" name="password" id="repassword" required/><br />
          <br /><br />
          <button className="register-form" class="basic-button" type="submit" id="register-button" onClick={this.pushToFirebase.bind(this)}>Register</button>
        </div>
        </form>
      </div>
    );
  }
}


/* const Register = () => (

  <div class="center">
  <form className="register-form">
    <h1><a href="/login" class="site-title">Triton Market</a></h1>
    <div class="content-box">
      <h3 class="basic-title">Register account</h3>

      <label for="email"><strong>UCSD Email:</strong></label><br />
      <input type="email" class="basic-input" name="email" id="email" required/> <br />

      <label for="password"><strong>Password:</strong></label><br />
      <input type="password" class="basic-input" name="password" id="password" required/> <br />

      <label for="repassword"><strong>Re-enter password:</strong></label><br />
      <input type="password" class="basic-input" name="password" id="repassword" required/><br />
      <br /><br />
      <button className="register-form" class="basic-button" type="submit" id="register-button">Register</button>
    </div>
    </form>
  </div>
)
*/

export default Register
