import React, {Component} from 'react';
import './profile.css'
import './edit_profile'
import userImage from './userImage.png'

class ViewProfile extends Component {
  constructor(props) {
    super(props);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render(){
    return(
      <div>
        <form className="profile-form">
          <div className="profile-name">{this.props.name}</div>
          <br />
          {this.props.image ? 
            <img className="profile-img" src={this.props.image[this.props.image.length-1]} alt="Profile" />
            : <img className="profile-img" src={userImage} alt="Default Profile"/>
          }
          <br />
          <hr/>
          Overall Rating: {this.props.rating}
          <br />
          Tel: {this.props.tel}
          <br />
          UCSD Email: {this.props.email}
          <br />
          Zipcode: {this.props.zipcode}
          <br />
          City: {this.props.city}
          <br />
          Average Review Score: {this.props.averagereview}
          <br />
          {this.props.isUser ? <a className="profile-button" href='/edit_profile'>edit profile</a>: null}
        </form>
      </div>
    );
  }
}

export default ViewProfile;
