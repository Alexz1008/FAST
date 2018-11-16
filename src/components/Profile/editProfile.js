import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import './profile.css'

class EditProfile extends Component {
      constructor(props) {
      super(props);
      this.state = {name: 'Gary', rating: '3.5',image: 'https://jacobsschool.ucsd.edu/faculty/faculty_bios/photos/300.jpg', tel: '858-534-4725', email: 'gillespie@ucsd.edu', zipcode: '92000', city: 'San Diego'};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }


    render(){
        return(
            <div>
                
                <form className="profile-form">

                <div className="profile-name">{this.state.name}</div>
                <hr/>
                <label>  Overall Rating: {this.state.rating} </label>
                  <br />
                  <img className="profile-picture" src={this.state.image} alt="did not load" />
                  <br />

                  <label>Tel:</label>
                  <input onChange= {e => this.setState({tel: e.target.value})} value={this.state.tel}/>
                  <br />
                  <label>UCSD Email:</label>
                  <input onChange= {e => this.setState({email: e.target.value})} value={this.state.email}/>
                  <br />
                  <label>Zipcode:</label>
                  <input onChange= {e => this.setState({zipcode: e.target.value})} value={this.state.zipcode}/>
                  <br />
                  <label>City:</label>
                  <input onChange= {e => this.setState({city: e.target.value})} value={this.state.city}/>
                  <br />
                  <button className="profile-button" >Save Changes</button>
                </form>
            </div>
        );
    }
}

export default EditProfile;