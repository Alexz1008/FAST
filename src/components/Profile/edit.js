import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import { Link , Redirect } from 'react-router-dom'
import './profile.css'
import ImageUploader from 'react-images-upload';
class Edit extends Component {
      constructor(props) {
      super(props);
      this.state = {name: 'Gary', rating: '3.5',picture: 'https://jacobsschool.ucsd.edu/faculty/faculty_bios/photos/300.jpg', tel: '858-534-4725', email: 'gillespie@ucsd.edu', zipcode: '92000', city: 'San Diego'};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      alert('A change has been made: ' + this.state.value);
      event.preventDefault();
      
    }


    render(){
        return(
            <div>
                <form className="profile-form"  >
                <img className="profile-img" src={this.state.picture} alt="did not load" />

                <ImageUploader
                  withIcon={false}
                  buttonText='CHANGE PICTURE'
                  // onChange={e => this.setState({picture: e.target.picture})}
                  imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
                />
                  <label>Name:</label>
                  <input onChange= {e => this.setState({name: e.target.value})} value={this.state.name}/>
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
                  <button className="profile-button" onClick={this.handleSubmit}><Link to='/profile'>Save Changes</Link></button>
                </form>
            </div>
        );
    }
}

export default Edit;
