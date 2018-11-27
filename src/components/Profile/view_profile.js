import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './profile.css'
import './edit_profile'

class ViewProfile extends Component {
      constructor(props) {
      super(props);
      this.state = {name: 'Gary', rating: '3.5',image: 'https://jacobsschool.ucsd.edu/faculty/faculty_bios/photos/300.jpg', tel: '858-534-4725', email: 'gillespie@ucsd.edu', zipcode: '92000', city: 'San Diego'};
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
