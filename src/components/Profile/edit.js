import React, {Component} from 'react';
import './profile.css'
import ImageUploader from 'react-images-upload';
import fire from '../Fire/fire'
import firebase from 'firebase'
import LoadingImg from '../Home/circle-loading-gif.gif'
import userImage from './userImage.png'

class Edit extends Component {
      constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.updateUserProfile = this.updateUserProfile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // Setup the firebase ref for the users database
        this.usersDB = fire.database().ref("Users");
        this.state = {
          loaded: false,
        };
      }

    componentWillUnmount() {
      this.firebaseRef.off();
    }

    // If the component gets mounted successfully, authenticate the user
    componentDidMount(){
      const { history } = this.props;
      fire.auth().onAuthStateChanged((user) => {
        // If the user is detected, save it to the current state
        if(user) {
          this.setState({user})
          this.getProfile();
        }
        // Otherwise set the current user to null
        else {
          console.log('no user detected!');
          history.push("/");
        }
      });
    }
    //get the info of the current user and set the state for display
    getProfile(){
      var user = firebase.auth().currentUser;
      this.setState({
        name: '',
        rating: '',
        image: [],
        tel: '',
        zipcode: '',
        city: '',
      });
      this.firebaseRef = fire.database().ref();
      this.firebaseRef.on('value', dataSnapshot => {
        let name = dataSnapshot.child("Users/" + user.uid + "/Name").val();
        let rating = dataSnapshot.child("Users/" + user.uid + "/Average_review").val();
        let image = dataSnapshot.child("Users/" + user.uid + "/User_Pic").val();
        let tel = dataSnapshot.child("Users/" + user.uid + "/Phone").val();
        let zipcode = dataSnapshot.child("Users/" + user.uid + "/Zip").val();
        let city = dataSnapshot.child("Users/" + user.uid + "/City").val();
        this.setState({name});
        this.setState({rating});
        this.setState({image});
        this.setState({tel});
        this.setState({zipcode});
        this.setState({city});
        this.setState({loaded: true});
      });
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }
    //check the state and update the profile
    updateUserProfile() {
      const user = firebase.auth().currentUser;
      const User_Pic = this.state.image;
      const Name = this.state.name;
      const Phone = this.state.tel;
      const Zip = this.state.zipcode;
      const City = this.state.city;
      var userID = user.uid;

      this.usersDB.child(userID).update({Name, User_Pic, Phone, Zip, City});
    }
    // upload the image
    onDrop(file, picture) {
      //when there was a image, concat the new one 
      if (this.state.image){
        this.setState({image: this.state.image.concat(picture)});        
      }
      else{
        this.setState({image:picture});
      }
    }

    render(){
        return(
            <div>
            {this.state.loaded ?
                <form action="/profile" className="profile-form">
                  <input type="hidden" value={this.state.user.uid} name="uid" />
                  {this.state.image ? 
                    <img className="profile-img" src = {this.state.image[this.state.image.length-1]} alt="Profile" />
                    : <img className="profile-img" src = {userImage} alt="Default Profile" />
                  }
                  <ImageUploader
                    withIcon={false}
                    withPreview ={false}
                    buttonText='Upload Picture'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    singleImage={true}
                  />
                  <input onChange= {e => this.setState({name: e.target.value})} placeholder = "Name" value={this.state.name}/>
                  <br />
                  <input onChange= {e => this.setState({tel: e.target.value})} placeholder = "Telephone Number" value={this.state.tel}/>
                  <br />
                  <input onChange= {e => this.setState({zipcode: e.target.value})} placeholder = "Zip Code" value={this.state.zipcode}/>
                  <br />
                  <input onChange= {e => this.setState({city: e.target.value})} placeholder = "City" value={this.state.city}/>
                  <br />
                  <button className="profile-button" onClick={this.updateUserProfile}>Save Changes</button>
                </form>
                :<div><img className="loading-circle" src={LoadingImg} alt="Loading..."></img></div>}
            </div>
        );
    }
}

export default Edit;
