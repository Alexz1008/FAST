// Register.js handles the user registration and profile creation for the website

// Import the required functionality for registration
import React from 'react'
//By default, register.js uses styles from ./login.css
import fire from '../Fire/fire'
import {withRouter} from 'react-router-dom'
import ImageUploader from 'react-images-upload'
import { Link } from 'react-router-dom'

export class Register extends React.Component {
  constructor(props) {
    super(props);
    // Bind the proper register and handle methods to the one in the current state
    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDrop = this.onDrop.bind(this);

    // Setup the firebase ref for the users database
    this.usersDB = fire.database().ref("Users");

    // Populate the state with fields requried for registration and profile creation
    this.state = {
      email: '',
      password: '',
      repass: '',
      image: [],
      name: '',
      tel: '',
      zipcode: '',
      city: ''
    };
  }

  /* Setup a method to create users with their corresponding fields and values
     which will then be pushed out to firebase */
  createUser(u) {
    const UCSD_Email = this.state.email;
    const User_Pic = this.state.image;
    const Name = this.state.name;
    const Phone = this.state.tel;
    const Zip = this.state.zipcode;
    const City = this.state.city;
    const Average_Review = "N/A";
    const Conversations = "";
    const Interest_Listings = "";
    const Saved_Listings = "";
    const My_Listings = "";
    const Completed_Transactions = "";
    var userID = u.user.uid;

    this.usersDB.child(userID).set({UCSD_Email, Name, User_Pic, Phone, Zip, City, Average_Review, Conversations, Interest_Listings, Saved_Listings, My_Listings, Completed_Transactions});
  }

  // Setup a register method to add a user into our firebase users database
  register(e) {
    e.preventDefault();
    if(! this.emailValidation()) return;
    const { history } = this.props;
    // Try registration of the user with the provided email and passwords
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=> {
      // If successful then create the user and push it to the firebase
      this.createUser(u);

      // Now send the user a verification email
      var user = fire.auth().currentUser;
      user.sendEmailVerification().then((u) => {
        // Email Sent
        alert("Registration successful! Please check your inbox for a verification email to enable access Triton Market!");
      })
      .catch((error)=> {
        console.log(error);
      });

      history.push("/login");
    })
    .catch((error)=> {
      // If there is any error, report it to the user and take them back to register
      console.log(error);
      history.push("/register");
    });
  }

  //Check if the entered email is a valid ucsd email
  emailValidation(){
    let current_email = this.state.email;
    let at_index = current_email.lastIndexOf('@');
    if(at_index > -1 && current_email.slice(at_index + 1) === 'ucsd.edu'){
      return true;
    }
    else return false;
  }

  // Setup a handleChange method to map the form to the proper values
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  // Setup an onDrop method to handle when users drag and drop a file in as their profile picture
  onDrop(file, picture) {
    this.setState({image: this.state.image.concat(picture)});
    document.getElementById('container').style.backgroundImage = "url('https://anotherangle.eu/wp-content/uploads/2017/03/Geisel-Library-South-2048.jpg')";
  }

  render() {
    return(
      // Render a form on the front-end to allow users to register and create their own profiles
      <div className="container" id="container">
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

            <ImageUploader
              withIcon={false}
              withPreview ={true}
              buttonText='Upload Profile Picture'
              onChange={this.onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
              singleImage={true}
            />
            <label><strong>Name:</strong></label>
            <input className="basic-input" onChange= {e => this.setState({name: e.target.value})} type="text" value={this.state.name}/>
            <br />

            <label><strong>Phone Number:</strong></label>
            <input className="basic-input" onChange= {e => this.setState({tel: e.target.value})} type="text" value={this.state.tel}/>
            <br />
            <label><strong>Zipcode:</strong></label>
            <input className="basic-input" onChange= {e => this.setState({zipcode: e.target.value})} type="text" value={this.state.zipcode}/>
            <br />
            <label><strong>City:</strong></label>
            <input className="basic-input" onChange= {e => this.setState({city: e.target.value})} type="text" value={this.state.city}/>
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
