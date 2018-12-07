import React from 'react'
import Header from '../Header/header'
import ImageUploader from 'react-images-upload';
import Tag from '../Listing/tag'
import fire from '../Fire/fire'

export class EditListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false};
    this.handleChange = this.handleChange.bind(this);
    this.loadEditListing = this.loadEditListing.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
  }
  
  componentDidMount(){
    this.loadEditListing(this.props);
  }
  componentWillReceiveProps(props) {
    this.loadEditListing(props);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }
  
  loadEditListing(props) {
    const { history } = this.props;
    this.setState({loaded: false});
    var Listing_ID = props.location.search.length >= 4 ? props.location.search.substring(4) : "";
    this.setState({id: Listing_ID})
    fire.auth().onAuthStateChanged((user) => {
      if(user) {
        
        // Load in the listing iff it exists and was created by the user
        fire.database().ref().once("value", snapshot => {
          if(!(snapshot.child("Listing/" + Listing_ID).exists()) || Listing_ID === "") {
            history.push("/home");
            alert("Listing not found!");
          }
          else if (snapshot.child("Users/" + user.uid + "/Posted_Listings").val().split(",").indexOf("" + Listing_ID) === -1) {
            history.push("/home");
            alert("You can only edit active listings made by you!");
          }
          else {
            // Confirmed the listing exists and is the user's, now just load it in
            document.getElementById("listing-title").value = snapshot.child("Listing/" + Listing_ID + "/Listing_Title").val();
            document.getElementById("listing-price").value = snapshot.child("Listing/" + Listing_ID + "/Listing_Price").val();
            document.getElementById("listing-content").value = snapshot.child("Listing/" + Listing_ID + "/Listing_Description").val();
            //TODO: Load in tags too
            this.setState({loaded: true});
          }
        });
      }
      else {
        this.setState({user: null});
        history.push("/");
        alert("You must log in!");
      }
    });
  }
  
  handleSaveChanges() {
    var Listing_ID = this.state.id;
    const { history } = this.props;
    fire.database().ref().child("Listing/" + Listing_ID + "/Listing_Title").set(this.state.title);
    fire.database().ref().child("Listing/" + Listing_ID + "/Listing_Price").set(this.state.price);
    fire.database().ref().child("Listing/" + Listing_ID + "/Listing_Description").set(this.state.content);
    history.push("/home");
  }
  
  render() {
    return (
      <div className="center">
          <Header />
          <form action="/home" className="listing-form" autoComplete="off">
              <div className="content-box">
                  <h3 id="edit-listing-title" className="basic-title">Edit Listing</h3>

                  <label htmlFor="listing-title"><strong>Title:</strong></label> <br />
                  <input type="text" onChange={this.handleChange} className="basic-input" name="title" id="listing-title" defaultValue="Loading..." required/><br />

                  <label htmlFor="listing-price"><strong>Price:</strong></label> <br />
                  <input type="text" onChange={this.handleChange} className="basic-input" name="price" id="listing-price" defaultValue="Loading..."/>

                  <ImageUploader
                      withIcon={false}
                      buttonText='Upload Picture'
                      // onChange={e => this.setState({picture: e.target.picture})}
                      imgExtension={['.jpg', '.gif', '.png', '.gif']}
                      maxFileSize={5242880}
                  />

                  <label htmlFor="listing-content"><strong>Describe your listing:</strong></label> <br />
                  <textarea onChange={this.handleChange} name="content" id="listing-content" defaultValue="Loading..."/> <br />

                  <label htmlFor="listing-tag"><strong>Add Tags:</strong></label> <br />
                  <Tag /> <br />

                  <br />

                  <button disabled={!this.state.loaded} onClick={this.handleSaveChanges} className="basic-button" id="create-listing-button">Save Changes</button>
              </div>
          </form>

      </div>
    );
  }
}
