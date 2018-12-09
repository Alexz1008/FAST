import React, {Component} from 'react';
import './profile.css'
import './edit_profile'
import userImage from './userImage.png'

class ViewProfile extends Component {

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
          Average Rating: {this.props.averagereview === 0 ? "N/A" : this.props.averagereview}

          <hr/>

          <br />
          Tel: {this.props.tel}
          <br />
          UCSD Email: {this.props.email}
          <br />
          Zipcode: {this.props.zipcode}
          <br />
          City: {this.props.city}
          <br />
          {this.props.isUser ? <a className="profile-button" href='/edit_profile'>edit profile</a>: null}
        </form>
      </div>
    );
  }
}

export default ViewProfile;