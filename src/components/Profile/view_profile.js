import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './profile.css'
import './edit_profile'
import fire from '../Fire/fire'

class ViewProfile extends Component {
      constructor(props) {
      super(props);
      //this.state = {name: 'Gary', rating: '3.5',image: 'https://jacobsschool.ucsd.edu/faculty/faculty_bios/photos/300.jpg', tel: '858-534-4725', email: 'gillespie@ucsd.edu', zipcode: '92000', city: 'San Diego'};
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
        let name = dataSnapshot.child("Users/" + this.state.user.uid + "/Name").val();
        let rating = dataSnapshot.child("Users/" + this.state.user.uid + "/Average_review").val();
        // TBD this.state.image =
        let tel = dataSnapshot.child("Users/" + this.state.user.uid + "/Phone").val();
        let email = dataSnapshot.child("Users/" + this.state.user.uid + "/UCSD_Email").val();
        let zipcode = dataSnapshot.child("Users/" + this.state.user.uid + "/Zip").val();
        let city = dataSnapshot.child("Users/" + this.state.user.uid + "/City").val();

        this.setState({name});
        this.setState({rating});
        this.setState({tel});
        this.setState({email});
        this.setState({zipcode});
        this.setState({city});
      });
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
          //localStorage.setItem('user',user.uid);
        }
        // Otherwise set the current user to null
        else {
          this.setState({user: null});
          //localStorage.removeItem('user');
        }
      });
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    render(){
        return(
            <div>
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
            </div>
        );
    }
}

export default ViewProfile;
