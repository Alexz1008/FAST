import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './profile.css'
import './edit_profile'
import fire from '../Fire/fire'

class ViewProfile extends Component {
      constructor(props) {
        super(props);
        this.state = {loaded: false};
      }

    componentWillUnmount() {
      this.firebaseRef.off();
    }

    // If the component gets mounted successfully, authenticate the user
    componentDidMount(){
      fire.auth().onAuthStateChanged((user) => {
        // If the user is detected, save it to the current state
        if(user) {
          this.setState({user});
          this.state = {
            name: '',
            rating: '',
            image: [],
            tel: '',
            email: '',
            zipcode: '',
            city: ''
          };
          this.firebaseRef = fire.database().ref();
          this.firebaseRef.on('value', dataSnapshot => {
            let name = dataSnapshot.child("Users/" + user.uid + "/Name").val();
            let rating = dataSnapshot.child("Users/" + user.uid + "/Average_review").val();
            let image = dataSnapshot.child("Users/" + user.uid + "/User_Pic").val();
            let tel = dataSnapshot.child("Users/" + user.uid + "/Phone").val();
            let email = dataSnapshot.child("Users/" + user.uid + "/UCSD_Email").val();
            let zipcode = dataSnapshot.child("Users/" + user.uid + "/Zip").val();
            let city = dataSnapshot.child("Users/" + user.uid + "/City").val();

            this.setState({name});
            this.setState({rating});
            this.setState({image});
            this.setState({tel});
            this.setState({email});
            this.setState({zipcode});
            this.setState({city});
          });
        }
        // Otherwise set the current user to null
        else {
          this.setState({user: null});
          //localStorage.removeItem('user');
        }
        this.setState({loaded: true});
      });
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    render(){
        return(
              <div>
              {this.state.loaded ?
                <form className="profile-form">
                  <div className="profile-name">{this.state.name}</div>
                  <br />
                  <img className="profile-img" src={this.state.image} alt="did not load" />
                  <br />
                  <hr/>
                  Overall Rating: {this.state.rating}
                  <br />
                  Tel: {this.state.tel}
                  <br />
                  UCSD Email: {this.state.email}
                  <br />
                  Zipcode: {this.state.zipcode}
                  <br />
                  City: {this.state.city}
                  <br />
                  <button className="profile-button" ><Link to='/edit_profile'>edit profile</Link></button>
                </form>
              :
              console.log("None")}
            </div>
        );
    }
}

export default ViewProfile;
