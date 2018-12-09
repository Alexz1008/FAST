// Register.js handles the user registration and profile creation for the website

// Import the required functionality for registration
import React from 'react'
//By default, register.js uses styles from ./login.css
import fire from '../Fire/fire'
import {withRouter} from 'react-router-dom'
import ImageUploader from 'react-images-upload'

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
      city: '',
      valid_image: false
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
    const Average_Review = 0;
    const Conversations = "";
    const Interest_Listings = "";
    const Saved_Listings = "";
    const Posted_Listings = "";
    const Completed_Transactions = "";
    const Reviews = "";
    const Sum_Of_Reviews = 0;
    var userID = u.user.uid;

    // Set the next child with the generated userID to this newly created user
    this.usersDB.child(userID).set({UCSD_Email, Name, User_Pic, Phone, Zip, City, Average_Review, Conversations, Interest_Listings, Saved_Listings, Posted_Listings, Completed_Transactions, Reviews, Sum_Of_Reviews});
  }

  // Setup a register method to add a user into our firebase users database
  register(e) {
    e.preventDefault();
    // Validate the email address to make sure it is of @ucsd.edu domain
    if(! this.emailValidation()) {
        // Send the user an alert and resend them to the registration form to prevent bots
        alert("Triton Market is for users with emails of the domain @ucsd.edu only! Please register using a valid @ucsd.edu email address and try again.");
        return;
    }
    //Validate the password to ensure sufficient length and matching of confirmed and original passwords
    if(! this.passwordValidation()){
        //passwordValidation() alerts users of any problem with entered passwords
        return;
    }
    //Ensure that profile picture is added
    if(! this.imageAdded()){
        return;
    }
    //Ensure that remaining user fields are filled
    if(! this.fieldsFilled()){
        return;
    }


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
        // Log the error if verification sending was unsuccessful

        console.log(error);
      });
      // Push the user back to login after finishing up registration
      history.push("/");
    })
    .catch((error)=> {
      // If there is any error, report it to the user and take them back to register
      console.log(error);
      //prevents user from entering email for account that already exists
      alert(error);
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

  //Check if the entered password is valid, alerting the user if not
  passwordValidation(){
    let current_password = this.state.password;
    let current_repass = this.state.repass;
    //Check if password is at least 8 chars; if not, alert user and fail validation
    if(current_password === null || current_password.length < 8){
      alert("Password must have at least 8 characters.");
      return false;
    }
    //Check if confirm password matches original password; if not, alert user and fail validation
    if(current_password !== current_repass){
      alert("Confirm password must match password.");
      return false;
    }
    return true;
  }

  //Check if the user has added a profile picture
  imageAdded(){
    if (!this.state.valid_image){
      alert("Please add a profile picture.");
      return false;
    }
    return true;
  }

  //Check if the remaining fields have something filled in
  fieldsFilled(){
    let current_name = this.state.name;
    let current_tel = this.state.tel;
    let current_zip = this.state.zipcode;
    let current_city = this.state.city;
    //Ensure that user has entered some name, alert otherwise
    if(current_name === null || current_name.length < 1){
      alert("Please enter your name.");
      return false;
    }
     //Ensure that user has entered some phone number, alert otherwise
    if(current_tel === null || current_tel.length < 1){
      alert("Please enter your phone number.");
      return false;
    }
    //Ensure that user has entered some ZIP code, alert otherwise
    if(current_zip === null || current_zip.length < 1){
      alert("Please enter your ZIP Code.");
      return false;
    }
    //Ensure that user has entered some city, alert otherwise
    if(current_city === null || current_city.length < 1){
      alert("Please enter your city.");
      return false;
    }
    //All fields filled
    return true;
  }

  // Setup a handleChange method to map the form to the proper values
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  // Setup an onDrop method to handle when upload their profile picture
  onDrop(file, picture) {
    let box = document.getElementById('reg-content-box');
    //grow and shrink register content box based on whether picture preview is present
    box.style.height = (!this.state.valid_image ? '750px' : '600px');
    this.setState({
      valid_image: (! this.state.valid_image),
      image: this.state.image.concat(picture)
    });
  }

  render() {
    return(
      // Render a form on the front-end to allow users to register and create their own profiles
      <div className="container" id="container">
        <div className="center">
        <form className="register-form">
          <div className="content-box" id="reg-content-box">
            <h3 className="basic-title">REGISTER ACCOUNT</h3>

            <input value={this.state.email} onChange={this.handleChange} type="email" className="basic-input" name="email" id="email" placeholder="UCSD email" required/> <br />
            <input value={this.state.password} onChange={this.handleChange} type="password" className="basic-input" name="password" id="password" placeholder="Password" required/> <br />
            <input value={this.state.repeat} onChange={this.handleChange} type="password" className="basic-input" name="repass" id="repass" placeholder="Confirm password" required/><br />

            <ImageUploader
              withIcon={false}
              withPreview ={true}
              buttonText='Upload Profile Picture'
              onChange={this.onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
              singleImage={true}
            />

            <input className="basic-input" onChange= {e => this.setState({name: e.target.value})} type="text" placeholder="Name" value={this.state.name} required/>
            <br />
            <input className="basic-input" onChange= {e => this.setState({tel: e.target.value})} type="text" placeholder="Phone number" value={this.state.tel} required/>
            <br />
            <input className="basic-input" onChange= {e => this.setState({zipcode: e.target.value})} type="text" placeholder="ZIP Code" value={this.state.zipcode} required/>
            <br />
            <input className="basic-input" onChange= {e => this.setState({city: e.target.value})} type="text" placeholder="City" value={this.state.city} required/> < br/>
            
            <button onClick={this.register} className="basic-button" type="submit" id="register-button">Register</button>
            <a className= "basic-button-cancel" id="cancel-button" href = "/login">Cancel </a>
          </div>
        </form>
        </div>
      </div>
    );
  }
}

// Export the register page to redirect the user
export default withRouter(Register);
